import { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Genera puntos distribuidos en una silueta de jamón (elipsoide deformado).
 * El jamón es más ancho en el centro (caña) y se estrecha hacia ambos extremos (punta y pata).
 *
 * @param numPoints - Cantidad de puntos a generar
 * @returns Array de Vector3 posicionados en forma de jamón
 */
export function useHamGeometry(numPoints: number) {
  return useMemo(() => {
    const points: THREE.Vector3[] = [];

    // Parámetros de la forma del jamón
    const length = 6;      // Longitud total del jamón (eje Y)
    const maxRadius = 1.6; // Radio máximo en el centro (caña)
    const minRadius = 0.5; // Radio mínimo en los extremos

    for (let i = 0; i < numPoints; i++) {
      // Posición longitudinal normalizada (-1 a 1, centro en 0)
      const t = (Math.random() * 2 - 1);

      // Radio en esta posición: forma de "hueso de jamón"
      // Más ancho en el centro, estrecho en extremos con curva suave
      const normalizedT = Math.abs(t);
      const radiusFactor = Math.pow(1 - Math.pow(normalizedT, 1.8), 0.7);
      const radius = minRadius + (maxRadius - minRadius) * radiusFactor;

      // Ángulo azimutal aleatorio
      const theta = Math.random() * Math.PI * 2;

      // Ángulo polar (distribución más densa ecuatorial para forma realista)
      const phi = Math.acos(2 * Math.random() - 1);
      // Sesgar hacia el ecuador para que no sea una esfera perfecta
      const phiBiased = phi * 0.6 + Math.PI * 0.2;

      // Coordenadas esféricas → cartesianas
      const x = radius * Math.sin(phiBiased) * Math.cos(theta);
      const y = t * (length / 2) + (Math.random() - 0.5) * 0.3;
      const z = radius * Math.sin(phiBiased) * Math.sin(theta) * 0.7; // Aplanado en Z

      // Añadir algo de ruido orgánico
      const noise = 0.15;
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
 * Genera puntos adicionales en la superficie del jamón para crear
 * una red más densa de líneas externas (la "corteza").
 */
export function useHamSurfacePoints(count: number) {
  return useMemo(() => {
    const points: THREE.Vector3[] = [];
    const length = 6;
    const maxRadius = 1.7;
    const minRadius = 0.55;

    for (let i = 0; i < count; i++) {
      const t = (i / count) * 2 - 1; // Distribución uniforme en longitud
      const normalizedT = Math.abs(t);
      const radiusFactor = Math.pow(1 - Math.pow(normalizedT, 1.8), 0.7);
      const radius = minRadius + (maxRadius - minRadius) * radiusFactor;

      // Múltiples puntos alrededor de cada sección longitudinal
      const rings = 8;
      for (let r = 0; r < rings; r++) {
        const theta = (r / rings) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
        const x = radius * Math.cos(theta);
        const z = radius * Math.sin(theta) * 0.7;
        const y = t * (length / 2) + (Math.random() - 0.5) * 0.2;
        points.push(new THREE.Vector3(x, y, z));
      }
    }

    return points;
  }, [count]);
}
