'use client';

import { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import dynamic from 'next/dynamic';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useScrollProgress } from '@/hooks/useScrollProgress';

const PostProcessingScene = dynamic(
  () => import('./PostProcessing'),
  { ssr: false }
);

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export default function HamCanvas3D() {
  const mouseRef = useMousePosition();
  const scrollRef = useScrollProgress();
  const containerRef = useRef<HTMLDivElement>(null);

  // Detectar mobile para reducir calidad
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.opacity = '1';
    }
  }, []);

  if (typeof window !== 'undefined' && !hasWebGL()) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-screen pointer-events-none"
      style={{ zIndex: 0, opacity: 0, transition: 'opacity 1s ease' }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 pointer-events-auto">
        <Canvas
          camera={{
            position: [0, 0, 12],
            fov: 50,
            near: 0.1,
            far: 100,
          }}
          dpr={[1, isMobile ? 1.5 : 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true,
          }}
          style={{ width: '100%', height: '100%' }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
        >
          <Suspense fallback={null}>
            <PostProcessingScene
              mouseRef={mouseRef}
              scrollRef={scrollRef}
              numPoints={isMobile ? 60 : 120}
              withBloom={!isMobile}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Vignette overlay para integrar el jamón con el fondo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 30% 50%, rgba(15,10,6,0.3) 0%, transparent 50%), radial-gradient(ellipse at center, transparent 0%, rgba(15,10,6,0.6) 55%, #0F0A06 100%)',
        }}
      />
    </div>
  );
}
