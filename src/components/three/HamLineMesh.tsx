'use client';

import { useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useHamGeometry, useHamSurfacePoints } from '@/hooks/useHamGeometry';

// ── Paleta de color Three.js ───────────────────────────────────────────────
const C_WOOD = new THREE.Color('#B08D6A');
const C_GOLD = new THREE.Color('#C9A87C');
const C_WARM = new THREE.Color('#FFB347');
const C_WINE = new THREE.Color('#8B0000');

// ── Constantes ─────────────────────────────────────────────────────────────
const MAX_SEGMENTS = 8000;
const MOUSE_RADIUS = 4.0;
const CONNECTION_DIST = 2.2;

// ── Temp objects reutilizables ─────────────────────────────────────────────
const _tmpVec = new THREE.Vector3();
const _tmpVec2 = new THREE.Vector2();
const _raycaster = new THREE.Raycaster();
const _interPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
const _mouseWorld = new THREE.Vector3();

// ── Shaders GLSL para nodos luminosos ──────────────────────────────────────
const VERT_POINTS = /* glsl */ `
  attribute float aSize;
  attribute vec3  aColor;
  varying   vec3  vColor;

  void main() {
    vColor = aColor;
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (380.0 / -mvPos.z);
    gl_Position  = projectionMatrix * mvPos;
  }
`;

const FRAG_POINTS = /* glsl */ `
  varying vec3 vColor;

  void main() {
    vec2  uv   = gl_PointCoord - 0.5;
    float r    = length(uv) * 2.0;
    float core = 1.0 - smoothstep(0.0, 0.5, r);
    float halo = 1.0 - smoothstep(0.5, 1.0, r);
    float a    = core * 0.95 + halo * 0.25;
    if (a < 0.01) discard;
    gl_FragColor = vec4(vColor * (1.0 + core * 0.6), a);
  }
`;

// ────────────────────────────────────────────────────────────────────────────
interface HamLineMeshProps {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  scrollRef: React.MutableRefObject<number>;
  numPoints?: number;
}

export default function HamLineMesh({
  mouseRef,
  scrollRef,
  numPoints = 120,
}: HamLineMeshProps) {
  const { camera } = useThree();

  // ── 1. Generar geometría del jamón ──────────────────────────────────────
  const innerPoints = useHamGeometry(Math.floor(numPoints * 0.6));
  const surfacePoints = useHamSurfacePoints(Math.floor(numPoints * 0.4 / 8));

  const nodes = useMemo(() => {
    const allPoints = [...innerPoints, ...surfacePoints];
    return allPoints.map((pos) => ({
      pos: pos.clone(),
      origPos: pos.clone(),
      vel: new THREE.Vector3(
        (Math.random() - 0.5) * 0.004,
        (Math.random() - 0.5) * 0.003,
        (Math.random() - 0.5) * 0.004,
      ),
      energy: 0,
      // 40% dorado, 60% madera
      colorType: Math.random() < 0.4 ? 1 : 0,
      baseSize: 2.0 + Math.random() * 2.5,
    }));
  }, [innerPoints, surfacePoints]);

  // ── 2. Geometría de LÍNEAS ──────────────────────────────────────────────
  const lineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(MAX_SEGMENTS * 2 * 3), 3),
    );
    geo.setAttribute(
      'color',
      new THREE.BufferAttribute(new Float32Array(MAX_SEGMENTS * 2 * 3), 3),
    );
    geo.setDrawRange(0, 0);
    return geo;
  }, []);

  const lineMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  // ── 3. Geometría de NODOS ───────────────────────────────────────────────
  const { pointGeo, pointMat } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(nodes.length * 3);
    const colors = new Float32Array(nodes.length * 3);
    const sizes = new Float32Array(nodes.length);

    nodes.forEach((n, i) => {
      positions[i * 3] = n.pos.x;
      positions[i * 3 + 1] = n.pos.y;
      positions[i * 3 + 2] = n.pos.z;

      const c = n.colorType === 1 ? C_GOLD : C_WOOD;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i] = n.baseSize;
    });

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT_POINTS,
      fragmentShader: FRAG_POINTS,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    return { pointGeo: geo, pointMat: mat };
  }, [nodes]);

  // ── 4. Cleanup ──────────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      lineGeo.dispose();
      lineMat.dispose();
      pointGeo.dispose();
      pointMat.dispose();
    };
  }, [lineGeo, lineMat, pointGeo, pointMat]);

  // ── 5. Loop de animación ────────────────────────────────────────────────
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const scroll = scrollRef.current;
    const mouse = mouseRef.current;

    // Proyectar cursor al plano z=0 en espacio mundo
    _tmpVec2.set(mouse.x, mouse.y);
    _raycaster.setFromCamera(_tmpVec2, camera);
    const hit = _raycaster.ray.intersectPlane(_interPlane, _mouseWorld);
    if (!hit) _mouseWorld.set(0, 0, 0);

    // ── Actualizar nodos ─────────────────────────────────────────────────
    const pPos = pointGeo.attributes.position.array as Float32Array;
    const pCol = pointGeo.attributes.aColor.array as Float32Array;
    const pSiz = pointGeo.attributes.aSize.array as Float32Array;

    nodes.forEach((n, i) => {
      // Deriva suave
      n.pos.add(n.vel);

      // Rebote suave hacia posición original
      n.pos.lerp(n.origPos, 0.008);

      // Energía del ratón — lerp suave
      const distMouse = n.pos.distanceTo(_mouseWorld);
      const targetEnergy = Math.max(0, 1 - distMouse / MOUSE_RADIUS);
      n.energy += (targetEnergy - n.energy) * 0.07;

      // Repulsión suave del ratón
      if (distMouse < MOUSE_RADIUS && distMouse > 0.01) {
        const force = (1 - distMouse / MOUSE_RADIUS) * 0.02;
        _tmpVec.copy(n.pos).sub(_mouseWorld).normalize().multiplyScalar(force);
        n.pos.add(_tmpVec);
      }

      // Respiración sutil
      const breath = Math.sin(time * 0.5 + i * 0.37) * 0.01;
      n.pos.y += breath;

      // Escribir posición actualizada
      pPos[i * 3] = n.pos.x;
      pPos[i * 3 + 1] = n.pos.y;
      pPos[i * 3 + 2] = n.pos.z;

      // Interpolación de color: base → warm/wine según energía
      const base = n.colorType === 1 ? C_GOLD : C_WOOD;
      const targetColor = n.energy > 0.6 ? C_WINE : C_WARM;
      const effectiveEnergy = Math.min(n.energy * 1.4, 1.0);

      pCol[i * 3] = base.r + (targetColor.r - base.r) * effectiveEnergy;
      pCol[i * 3 + 1] = base.g + (targetColor.g - base.g) * effectiveEnergy;
      pCol[i * 3 + 2] = base.b + (targetColor.b - base.b) * effectiveEnergy;

      // Tamaño crece al energizarse
      pSiz[i] = n.baseSize * (1 + n.energy * 2.2);
    });

    pointGeo.attributes.position.needsUpdate = true;
    pointGeo.attributes.aColor.needsUpdate = true;
    pointGeo.attributes.aSize.needsUpdate = true;

    // ── Construir segmentos de línea ─────────────────────────────────────
    const lPos = lineGeo.attributes.position.array as Float32Array;
    const lCol = lineGeo.attributes.color.array as Float32Array;
    let segCount = 0;

    for (let i = 0; i < nodes.length && segCount < MAX_SEGMENTS - 1; i++) {
      for (let j = i + 1; j < nodes.length && segCount < MAX_SEGMENTS - 1; j++) {
        const dist = nodes[i].pos.distanceTo(nodes[j].pos);
        if (dist >= CONNECTION_DIST) continue;

        const distAlpha = 1 - dist / CONNECTION_DIST;
        const energy = Math.max(nodes[i].energy, nodes[j].energy);
        const base = (nodes[i].colorType === 1 || nodes[j].colorType === 1)
          ? C_GOLD : C_WOOD;
        const targetColor = energy > 0.6 ? C_WINE : C_WARM;
        const effEnergy = Math.min(energy * 1.4, 1.0);

        const r = (base.r + (targetColor.r - base.r) * effEnergy) * distAlpha;
        const g = (base.g + (targetColor.g - base.g) * effEnergy) * distAlpha;
        const b = (base.b + (targetColor.b - base.b) * effEnergy) * distAlpha;

        const idx = segCount * 6;
        lPos[idx] = nodes[i].pos.x; lPos[idx + 1] = nodes[i].pos.y; lPos[idx + 2] = nodes[i].pos.z;
        lPos[idx + 3] = nodes[j].pos.x; lPos[idx + 4] = nodes[j].pos.y; lPos[idx + 5] = nodes[j].pos.z;
        lCol[idx] = r; lCol[idx + 1] = g; lCol[idx + 2] = b;
        lCol[idx + 3] = r; lCol[idx + 4] = g; lCol[idx + 5] = b;

        segCount++;
      }
    }

    lineGeo.attributes.position.needsUpdate = true;
    lineGeo.attributes.color.needsUpdate = true;
    lineGeo.setDrawRange(0, segCount * 2);

    // ── Coreografía de cámara por scroll ─────────────────────────────────
    const camX = Math.sin(scroll * Math.PI * 1.6) * 5.0 + Math.sin(time * 0.08) * 0.4;
    const camY = Math.cos(scroll * Math.PI * 1.0) * 2.8 + Math.sin(time * 0.06) * 0.3;
    const camZ = Math.max(6.0, 12 - scroll * 5.5);

    camera.position.lerp(_tmpVec.set(camX, camY, camZ), 0.022);
    camera.lookAt(0, scroll * 1.5 - 0.5, 0);
    camera.updateMatrixWorld();
  });

  return (
    <group>
      <lineSegments geometry={lineGeo} material={lineMat} />
      <points geometry={pointGeo} material={pointMat} />
    </group>
  );
}
