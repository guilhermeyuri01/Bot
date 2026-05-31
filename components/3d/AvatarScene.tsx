"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense, memo, useEffect } from "react";
import * as THREE from "three";
import { AvatarRig } from "@/components/3d/AvatarRig";
import { HairSystem } from "@/components/3d/HairSystem";
import { Lights } from "@/components/3d/Lights";
import { PerformanceGovernor } from "@/components/3d/PerformanceGovernor";
import { qualityProfiles } from "@/lib/quality";
import { bootstrapQuality, useHairStore } from "@/store/useHairStore";

type AvatarSceneProps = {
  onCanvasReady?: (canvas: HTMLCanvasElement) => void;
};

const SceneContent = memo(function SceneContent() {
  const autoRotate = useHairStore((state) => state.autoRotate);
  const quality = useHairStore((state) => state.quality);
  const profile = qualityProfiles[quality];

  return (
    <>
      <PerformanceGovernor />
      <PerspectiveCamera makeDefault fov={35} position={[0, 0.85, 4.3]} />
      <Lights />
      <fog attach="fog" args={["#efe9e2", 5, 9]} />
      <Suspense fallback={null}>
        <Float floatIntensity={quality === "low" ? 0.02 : 0.07} rotationIntensity={0.035} speed={1.1}>
          <group>
            <AvatarRig />
            <HairSystem />
          </group>
        </Float>
      </Suspense>
      <mesh receiveShadow={profile.enableShadows} frustumCulled position={[0, -1.22, -0.08]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.6, quality === "low" ? 48 : 96]} />
        <meshStandardMaterial color="#e7dfd6" roughness={0.82} metalness={0} />
      </mesh>
      {profile.enableShadows && (
        <ContactShadows blur={2.8} far={3.2} opacity={0.3} position={[0, -1.18, 0]} resolution={profile.contactShadowResolution} />
      )}
      <OrbitControls
        autoRotate={autoRotate}
        autoRotateSpeed={0.75}
        dampingFactor={0.065}
        enableDamping
        enablePan={false}
        enableZoom
        maxDistance={6}
        maxPolarAngle={Math.PI * 0.63}
        minDistance={2.8}
        minPolarAngle={Math.PI * 0.22}
        rotateSpeed={0.62}
        target={[0, 0.42, 0]}
        zoomSpeed={0.72}
      />
    </>
  );
});

export function AvatarScene({ onCanvasReady }: AvatarSceneProps) {
  useEffect(() => {
    bootstrapQuality();
  }, []);

  return (
    <Canvas
      className="h-full w-full"
      dpr={[0.75, 1.5]}
      gl={{ antialias: true, preserveDrawingBuffer: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.04;
        gl.outputColorSpace = THREE.SRGBColorSpace;
        onCanvasReady?.(gl.domElement);
      }}
      shadows
    >
      <SceneContent />
    </Canvas>
  );
}
