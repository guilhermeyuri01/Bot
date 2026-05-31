"use client";

import { Detailed, useGLTF } from "@react-three/drei";
import { memo, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useHairStore } from "@/store/useHairStore";

export const AvatarRig = memo(function AvatarRig() {
  const group = useRef<THREE.Group>(null);
  const quality = useHairStore((state) => state.quality);

  useGLTF.preload("/models/avatar/female-realistic.draco.glb");

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.position.y = Math.sin(clock.elapsedTime * 1.15) * 0.01;
  });

  return (
    <group ref={group} position={[0, -1.18, 0]}>
      <Detailed distances={quality === "low" ? [0, 3.2, 5.8] : [0, 4.2, 7]}>
        <RealisticAvatarFallback highDetail />
        <RealisticAvatarFallback />
        <RealisticAvatarFallback lowDetail />
      </Detailed>
    </group>
  );
});

function RealisticAvatarFallback({ highDetail = false, lowDetail = false }: { highDetail?: boolean; lowDetail?: boolean }) {
  const skinMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#d2a088",
        roughness: 0.5,
        sheen: highDetail ? 0.28 : 0.12,
        clearcoat: 0.04,
        transmission: 0,
        emissive: "#3a160f",
        emissiveIntensity: highDetail ? 0.018 : 0.008,
      }),
    [highDetail],
  );
  const segments = lowDetail ? 24 : highDetail ? 64 : 40;

  return (
    <group>
      <mesh castShadow receiveShadow frustumCulled material={skinMaterial} position={[0, 0.5, 0]} scale={[0.62, 0.8, 0.48]}>
        <capsuleGeometry args={[0.46, 1.05, lowDetail ? 8 : 12, segments]} />
      </mesh>
      <mesh castShadow receiveShadow frustumCulled material={skinMaterial} position={[0, 1.66, 0]} scale={[0.7, 0.86, 0.66]}>
        <sphereGeometry args={[0.48, segments, segments]} />
      </mesh>
      {!lowDetail && <FaceDetails highDetail={highDetail} />}
    </group>
  );
}

const FaceDetails = memo(function FaceDetails({ highDetail }: { highDetail: boolean }) {
  const lashes = useMemo(() => new THREE.MeshBasicMaterial({ color: "#130d0c" }), []);
  return (
    <group>
      {[-0.16, 0.16].map((x) => (
        <group key={x} position={[x, 1.69, 0.43]}>
          <mesh castShadow frustumCulled scale={[1, 0.7, 0.5]}>
            <sphereGeometry args={[0.037, highDetail ? 24 : 16, highDetail ? 16 : 12]} />
            <meshPhysicalMaterial color="#f5f0e8" roughness={0.08} clearcoat={1} />
          </mesh>
          <mesh position={[0, 0, 0.028]} scale={[1, 0.72, 0.48]}>
            <sphereGeometry args={[0.017, 16, 12]} />
            <meshStandardMaterial color="#3b241a" roughness={0.18} />
          </mesh>
          <mesh material={lashes} position={[0, 0.035, 0.03]} rotation={[0, 0, x > 0 ? -0.18 : 0.18]} scale={[0.07, 0.006, 0.006]}>
            <boxGeometry args={[1, 1, 1]} />
          </mesh>
          <mesh material={lashes} position={[0, 0.092, 0.015]} rotation={[0, 0, x > 0 ? -0.08 : 0.08]} scale={[0.1, 0.012, 0.012]}>
            <boxGeometry args={[1, 1, 1]} />
          </mesh>
        </group>
      ))}
      <mesh castShadow position={[0, 1.54, 0.48]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 0.38, 0.22]}>
        <torusGeometry args={[0.12, 0.01, 8, 32, Math.PI]} />
        <meshStandardMaterial color="#8d4842" roughness={0.35} />
      </mesh>
    </group>
  );
});
