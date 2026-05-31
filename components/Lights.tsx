"use client";

import { Environment, Lightformer } from "@react-three/drei";
import { useHairStore } from "@/store/useHairStore";

export function Lights() {
  const lightIntensity = useHairStore((state) => state.lightIntensity);

  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight
        castShadow
        color="#fff3e7"
        intensity={1.5 * lightIntensity}
        position={[3.5, 4.2, 3.2]}
        shadow-mapSize={[1024, 1024]}
      />
      <spotLight
        angle={0.45}
        color="#ffffff"
        intensity={2.4 * lightIntensity}
        penumbra={0.82}
        position={[-3.4, 4.5, 2.8]}
      />
      <pointLight color="#f7d7bd" intensity={0.9 * lightIntensity} position={[0, 1.6, -2.6]} />
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={4.5 * lightIntensity} position={[0, 3.6, 4]} scale={[4, 2, 1]} />
        <Lightformer form="rect" intensity={2.2 * lightIntensity} position={[-3, 2.2, 1]} scale={[1.2, 2.8, 1]} />
        <Lightformer form="ring" intensity={1.25 * lightIntensity} position={[2.2, 1.8, -2]} scale={[2, 2, 1]} />
      </Environment>
    </>
  );
}
