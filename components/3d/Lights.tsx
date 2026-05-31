"use client";

import { Environment, Lightformer } from "@react-three/drei";
import { memo } from "react";
import { qualityProfiles } from "@/lib/quality";
import { useHairStore } from "@/store/useHairStore";

export const Lights = memo(function Lights() {
  const lightIntensity = useHairStore((state) => state.lightIntensity);
  const quality = useHairStore((state) => state.quality);
  const profile = qualityProfiles[quality];

  return (
    <>
      <ambientLight color="#fff3e7" intensity={0.24 * lightIntensity} />
      <directionalLight
        castShadow={profile.enableShadows}
        color="#fff2df"
        intensity={1.65 * lightIntensity}
        name="Key Light"
        position={[3.5, 4.4, 3.25]}
        shadow-mapSize={[profile.shadowMap, profile.shadowMap]}
      />
      <spotLight
        angle={0.44}
        castShadow={quality === "ultra" || quality === "high"}
        color="#ffffff"
        intensity={1.25 * lightIntensity}
        name="Fill Light"
        penumbra={0.86}
        position={[-3.3, 3.6, 2.3]}
        shadow-mapSize={[profile.shadowMap, profile.shadowMap]}
      />
      <spotLight
        angle={0.38}
        color="#f9d9bd"
        intensity={1.8 * lightIntensity}
        name="Rim Light"
        penumbra={0.72}
        position={[2.8, 2.7, -2.8]}
      />
      <pointLight color="#ffe0bd" intensity={1.05 * lightIntensity} name="Hair Light" position={[0, 2.2, -1.7]} />
      <Environment resolution={profile.environmentResolution}>
        <Lightformer form="rect" intensity={4.8 * lightIntensity} position={[0, 3.8, 4]} scale={[4.2, 2.1, 1]} />
        <Lightformer form="rect" intensity={2.0 * lightIntensity} position={[-3, 2.2, 1]} scale={[1.2, 2.8, 1]} />
        <Lightformer form="ring" intensity={1.55 * lightIntensity} position={[2.2, 1.8, -2]} scale={[2, 2, 1]} />
      </Environment>
    </>
  );
});
