import { useGLTF, Bounds, Center, Clone } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

interface InstrumentModelProps {
  modelPath: string;
}

export default function InstrumentModel({ modelPath }: InstrumentModelProps) {
  const { scene } = useGLTF(modelPath);
  const groupRef = useRef<THREE.Group>(null);

  return (
    <Bounds fit clip margin={1.2}>
      <Center>
        <group ref={groupRef}>
          {/* Use Clone for efficient geometry/material sharing */}
          <Clone object={scene} />
        </group>
      </Center>
    </Bounds>
  );
}

// Preload models for performance
useGLTF.preload('/models/kompang.glb');
useGLTF.preload('/models/sape.glb');
useGLTF.preload('/models/serunai.glb');
