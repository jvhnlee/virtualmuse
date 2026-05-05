import { useGLTF, Bounds, Center } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

interface InstrumentModelProps {
  modelPath: string;
}

export default function InstrumentModel({ modelPath }: InstrumentModelProps) {
  const { scene } = useGLTF(modelPath);
  const groupRef = useRef<THREE.Group>(null);

  // Optional: add a slow, ambient rotation if desired
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Bounds fit clip observe margin={1.2}>
      <Center>
        <group ref={groupRef}>
          {/* We clone the scene so we can reuse the geometry safely if needed */}
          <primitive object={scene.clone(true)} />
        </group>
      </Center>
    </Bounds>
  );
}

// Preload models for performance (optional but good practice)
// useGLTF.preload('/models/kompang.glb');
// useGLTF.preload('/models/sape.glb');
// useGLTF.preload('/models/serunai.glb');
