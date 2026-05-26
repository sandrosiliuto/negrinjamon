'use client';

import { Suspense } from 'react';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { BlendFunction, KernelSize } from 'postprocessing';
import HamLineMesh from './HamLineMesh';

interface PostProcessingProps {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  scrollRef: React.MutableRefObject<number>;
  numPoints?: number;
  withBloom?: boolean;
}

export default function PostProcessingScene({
  mouseRef,
  scrollRef,
  numPoints = 120,
  withBloom = true,
}: PostProcessingProps) {
  return (
    <>
      <ambientLight intensity={0.04} />

      <HamLineMesh
        mouseRef={mouseRef}
        scrollRef={scrollRef}
        numPoints={numPoints}
      />

      {withBloom && (
        <Suspense fallback={null}>
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={1.2}
              kernelSize={KernelSize.LARGE}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.8}
              blendFunction={BlendFunction.ADD}
            />
            <Vignette
              darkness={0.6}
              offset={0.1}
              blendFunction={BlendFunction.NORMAL}
            />
          </EffectComposer>
        </Suspense>
      )}
    </>
  );
}
