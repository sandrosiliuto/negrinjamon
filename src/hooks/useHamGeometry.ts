import { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Genera puntos distribuidos en una silueta de JAMÓN IBÉRICO REAL.
 * Forma anatómicamente correcta: maza ancha (parte superior), caña estrecha (centro),
 * punta afilada (parte inferior), con curvas orgánicas.
 */
export function useHamGeometry(numPoints: number) {
  return useMemo(() => {
    const points: THREE.Vector3[] = [];

    // Parámetros anatómicos del jamón ibérico
    const length = 7.5;       // Longitud total
    const mazaRadius = 2.2;   // Radio máximo en la maza (parte ancha superior)
    const cañaRadius = 1.0;   // Radio en la caña (centro)
    const puntaRadius = 0.4;  // Radio en la punta (parte inferior afilada)

    for (let i = 0; i < numPoints; i++) {
      // t va de -1 (maza/arriba) a +1 (punta/abajo)
      const t = (Math.random() * 2 - 1);

      let radius: number;
      let flattenZ = 0.65; // Aplanamiento en eje Z para forma realista

      if (t < -0.3) {
        // Zona de la MAZA (parte ancha superior) -30% a -100%
        const mazaT = (t + 0.3) / 0.7; // Normalizar a 0..1
        radius = mazaRadius * Math.pow(1 - Math.abs(mazaT), 0.5) + cañaRadius * 0.3;
        flattenZ = 0.55; // Más aplanado en la maza
      } else if (t > 0.4) {
        // Zona de la PUNTA (parte afilada inferior) +40% a +100%
        const puntaT = (t - 0.4) / 0.6; // Normalizar a 0..1
        radius = cañaRadius * (1 - puntaT) + puntaRadius * puntaT;
        radius *= Math.pow(1 - puntaT * 0.5, 0.8);
        flattenZ = 0.75;
      } else {
        // Zona de la CAÑA (centro) -30% a +40%
        const cañaT = (t + 0.3) / 0.7; // Normalizar a 0..1
        radius = cañaRadius + (mazaRadius - cañaRadius) * Math.pow(1 - cañaT, 2) * 0.4;
        flattenZ = 0.65;
      }

      // Añadir variación orgánica
      radius *= (0.92 + Math.random() * 0.16);

      // Ángulo azimutal
      const theta = Math.random() * Math.PI * 2;

      // Ángulo polar con sesgo ecuatorial
      const phi = Math.acos(2 * Math.random() - 1);
      const phiBiased = phi * 0.55 + Math.PI * 0.225;

      const x = radius * Math.sin(phiBiased) * Math.cos(theta);
      const y = t * (length / 2) + (Math.random() - 0.5) * 0.2;
      const z = radius * Math.sin(phiBiased) * Math.sin(theta) * flattenZ;

      // Ruido orgánico sutil
      const noise = 0.08;
      points.push(
        new THREE.Vector3(
          x + (Math.random() - 0.5) * noise,
          y + (Math.random() - 0.5) * noise,
          z + (Math.random() - 0.5) * noise
        )
      );
    }

    return points;
  }, [numPoints]);
}

/**
 * Genera puntos en la superficie del jamón para crear red externa densa.
 * Distribución en anillos longitudinales.
 */
export function useHamSurfacePoints(count: number) {
  return useMemo(() => {
    const points: THREE.Vector3[] = [];
    const length = 7.5;
    const mazaRadius = 2.3;
    const cañaRadius = 1.05;
    const puntaRadius = 0.45;

    for (let i = 0; i < count; i++) {
      const t = (i / count) * 2 - 1;

      let radius: number;
      let flattenZ = 0.65;

      if (t < -0.3) {
        const mazaT = (t + 0.3) / 0.7;
        radius = mazaRadius * Math.pow(1 - Math.abs(mazaT), 0.5) + cañaRadius * 0.3;
        flattenZ = 0.55;
      } else if (t > 0.4) {
        const puntaT = (t - 0.4) / 0.6;
        radius = cañaRadius * (1 - puntaT) + puntaRadius * puntaT;
        radius *= Math.pow(1 - puntaT * 0.5, 0.8);
        flattenZ = 0.75;
      } else {
        const cañaT = (t + 0.3) / 0.7;
        radius = cañaRadius + (mazaRadius - cañaRadius) * Math.pow(1 - cañaT, 2) * 0.4;
        flattenZ = 0.65;
      }

      // Múltiples puntos alrededor de cada sección
      const rings = 10;
      for (let r = 0; r < rings; r++) {
        const theta = (r / rings) * Math.PI * 2 + (Math.random() - 0.5) * 0.2;
        const rVar = radius * (0.95 + Math.random() * 0.1);
        const x = rVar * Math.cos(theta);
        const z = rVar * Math.sin(theta) * flattenZ;
        const y = t * (length / 2) + (Math.random() - 0.5) * 0.15;
        points.push(new THREE.Vector3(x, y, z));
      }
    }

    return points;
  }, [count]);
}
