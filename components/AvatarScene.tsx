"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float, OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { Lights } from "@/components/Lights";
import { HairStyle, useHairStore } from "@/store/useHairStore";

type AvatarSceneProps = {
  onCanvasReady?: (canvas: HTMLCanvasElement) => void;
};

function StudioAvatar() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    // Respiração leve: desloca busto/cabeça em milímetros virtuais sem quebrar a pose.
    group.current.position.y = Math.sin(clock.elapsedTime * 1.4) * 0.012;
  });

  return (
    <group ref={group} position={[0, -1.18, 0]}>
      <AvatarModelFallback />
      <group>
        <mesh castShadow receiveShadow position={[0, 0.6, 0]} scale={[0.62, 0.8, 0.48]}>
          <capsuleGeometry args={[0.46, 1.05, 12, 28]} />
          <meshPhysicalMaterial color="#c69075" roughness={0.48} metalness={0} clearcoat={0.12} transmission={0.02} />
        </mesh>
        <mesh castShadow position={[0, 1.66, 0]} scale={[0.72, 0.86, 0.68]}>
          <sphereGeometry args={[0.48, 48, 48]} />
          <meshPhysicalMaterial
            color="#d6a083"
            roughness={0.42}
            sheen={0.32}
            clearcoat={0.08}
            // Aparência inspirada em subsurface scattering sem shader pesado.
            emissive="#3a160f"
            emissiveIntensity={0.015}
          />
        </mesh>
        <mesh castShadow position={[-0.16, 1.69, 0.43]} scale={[1, 0.7, 0.5]}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshStandardMaterial color="#2b1b18" roughness={0.2} />
        </mesh>
        <mesh castShadow position={[0.16, 1.69, 0.43]} scale={[1, 0.7, 0.5]}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshStandardMaterial color="#2b1b18" roughness={0.2} />
        </mesh>
        <mesh castShadow position={[0, 1.54, 0.48]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 0.38, 0.22]}>
          <torusGeometry args={[0.12, 0.01, 8, 32, Math.PI]} />
          <meshStandardMaterial color="#7f3d3a" roughness={0.35} />
        </mesh>
      </group>
      <HairMesh />
    </group>
  );
}

function AvatarModelFallback() {
  // Mantém o caminho do GLB documentado para produção; o fallback procedural garante preview local sem assets licenciados.
  useGLTF.preload("/models/female.glb");
  return null;
}

function HairMesh() {
  const { selectedStyle, color, shine, beforeMode, styles } = useHairStore();
  const style = styles.find((item) => item.id === selectedStyle) ?? styles[0];
  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(beforeMode ? "#2b201e" : color),
        roughness: Math.max(0.18, 0.72 - shine * 0.45),
        metalness: 0.02,
        clearcoat: 0.28 + shine * 0.5,
        clearcoatRoughness: 0.16,
        sheen: 0.8,
        sheenColor: new THREE.Color("#fff1df"),
      }),
    [beforeMode, color, shine],
  );

  useGLTF.preload(style.assetPath);

  return (
    <group visible={!beforeMode}>
      <HairFallback style={style} material={material} />
    </group>
  );
}

function HairFallback({ style, material }: { style: HairStyle; material: THREE.Material }) {
  if (style.id === "curly") {
    return (
      <group position={[0, 1.72, 0]}>
        {Array.from({ length: 18 }).map((_, index) => {
          const angle = (index / 18) * Math.PI * 2;
          const radius = 0.46 + (index % 3) * 0.035;
          return (
            <mesh
              castShadow
              key={index}
              material={material}
              position={[Math.cos(angle) * radius, -0.04 - (index % 4) * 0.045, Math.sin(angle) * radius * 0.62]}
              scale={[0.12, 0.22 + (index % 3) * 0.035, 0.12]}
            >
              <sphereGeometry args={[1, 24, 24]} />
            </mesh>
          );
        })}
      </group>
    );
  }

  if (style.id === "bob") {
    return (
      <mesh castShadow material={material} position={[0, 1.63, 0.02]} scale={[0.62, 0.54, 0.56]}>
        <sphereGeometry args={[1, 48, 48, 0, Math.PI * 2, 0, Math.PI * 0.72]} />
      </mesh>
    );
  }

  if (style.id === "ponytail") {
    return (
      <group>
        <mesh castShadow material={material} position={[0, 1.78, -0.05]} scale={[0.55, 0.5, 0.5]}>
          <sphereGeometry args={[1, 48, 48, 0, Math.PI * 2, 0, Math.PI * 0.78]} />
        </mesh>
        <mesh castShadow material={material} position={[0, 1.45, -0.58]} rotation={[0.52, 0, 0]} scale={[0.18, 0.72, 0.18]}>
          <capsuleGeometry args={[1, 1.35, 12, 32]} />
        </mesh>
      </group>
    );
  }

  const isWavy = style.id === "wavy";
  return (
    <group>
      <mesh castShadow material={material} position={[0, 1.72, -0.02]} scale={[0.58, 0.58, 0.54]}>
        <sphereGeometry args={[1, 48, 48, 0, Math.PI * 2, 0, Math.PI * 0.8]} />
      </mesh>
      {[-0.28, 0.28].map((x) => (
        <mesh
          castShadow
          key={x}
          material={material}
          position={[x, 1.2, 0.04]}
          rotation={[isWavy ? 0.25 : 0.05, 0, isWavy ? x * 0.7 : x * 0.18]}
          scale={[0.19, style.length * 0.92, 0.14]}
        >
          <capsuleGeometry args={[1, 1.4, 16, 36]} />
        </mesh>
      ))}
    </group>
  );
}

function SceneContent() {
  const autoRotate = useHairStore((state) => state.autoRotate);

  return (
    <>
      <PerspectiveCamera makeDefault fov={35} position={[0, 0.85, 4.3]} />
      <Lights />
      <fog attach="fog" args={["#efe9e2", 5, 9]} />
      <Float floatIntensity={0.08} rotationIntensity={0.04} speed={1.2}>
        <StudioAvatar />
      </Float>
      <mesh receiveShadow position={[0, -1.22, -0.08]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.6, 96]} />
        <meshStandardMaterial color="#e7dfd6" roughness={0.82} metalness={0} />
      </mesh>
      <ContactShadows blur={2.8} far={3.2} opacity={0.34} position={[0, -1.18, 0]} resolution={1024} />
      <OrbitControls
        autoRotate={autoRotate}
        autoRotateSpeed={0.85}
        enableDamping
        dampingFactor={0.065}
        enablePan={false}
        maxDistance={6}
        maxPolarAngle={Math.PI * 0.63}
        minDistance={2.8}
        minPolarAngle={Math.PI * 0.22}
        target={[0, 0.42, 0]}
      />
    </>
  );
}

export function AvatarScene({ onCanvasReady }: AvatarSceneProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      gl={{ antialias: true, preserveDrawingBuffer: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.04;
        onCanvasReady?.(gl.domElement);
      }}
      className="h-full w-full"
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  );
}
