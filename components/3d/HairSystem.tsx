"use client";

import { Detailed, useGLTF } from "@react-three/drei";
import { memo, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { qualityProfiles } from "@/lib/quality";
import { useHairStore } from "@/store/useHairStore";
import type { HairStyle } from "@/types/hair";
import { usePremiumHairMaterial } from "@/components/3d/HairMaterial";

export const HairSystem = memo(function HairSystem() {
  const selectedStyle = useHairStore((state) => state.selectedStyle);
  const controls = useHairStore((state) => state.controls);
  const beforeMode = useHairStore((state) => state.beforeMode);
  const quality = useHairStore((state) => state.quality);
  const styles = useHairStore((state) => state.styles);
  const style = styles.find((item) => item.id === selectedStyle) ?? styles[0];
  const material = usePremiumHairMaterial(controls, beforeMode);

  useEffect(() => {
    const current = style.variants.find((variant) => variant.quality === quality) ?? style.variants.at(-1);
    if (current) useGLTF.preload(current.url, true);
  }, [quality, style]);

  return (
    <group visible={!beforeMode} scale={[controls.volume, controls.length, controls.volume]}>
      <Detailed distances={[0, 3.6, 5.5]}>
        <PremiumHairFallback material={material} quality={quality} style={style} detail="high" />
        <PremiumHairFallback material={material} quality={quality} style={style} detail="medium" />
        <PremiumHairFallback material={material} quality={quality} style={style} detail="low" />
      </Detailed>
    </group>
  );
});

type FallbackProps = {
  detail: "high" | "medium" | "low";
  material: THREE.Material;
  quality: keyof typeof qualityProfiles;
  style: HairStyle;
};

const strandGeometry = new THREE.CapsuleGeometry(1, 1.25, 8, 14);

function PremiumHairFallback({ detail, material, quality, style }: FallbackProps) {
  const effectiveStrands = detail === "low" ? 8 : detail === "medium" ? 16 : qualityProfiles[quality].hairStrands;

  if (style.id === "curly") {
    return <InstancedCurls count={effectiveStrands} material={material} />;
  }

  if (style.id === "bob" || style.id === "wolf") {
    return (
      <group>
        <mesh castShadow frustumCulled material={material} position={[0, 1.64, 0.02]} scale={[0.62, style.id === "wolf" ? 0.58 : 0.52, 0.56]}>
          <sphereGeometry args={[1, detail === "low" ? 24 : 48, detail === "low" ? 20 : 40, 0, Math.PI * 2, 0, Math.PI * 0.73]} />
        </mesh>
        {style.id === "wolf" && <LayerStrands count={Math.ceil(effectiveStrands * 0.45)} material={material} short />}
      </group>
    );
  }

  if (style.id === "ponytail") {
    return (
      <group>
        <mesh castShadow frustumCulled material={material} position={[0, 1.78, -0.05]} scale={[0.55, 0.5, 0.5]}>
          <sphereGeometry args={[1, detail === "low" ? 24 : 48, detail === "low" ? 18 : 36, 0, Math.PI * 2, 0, Math.PI * 0.78]} />
        </mesh>
        <mesh castShadow frustumCulled material={material} position={[0, 1.43, -0.58]} rotation={[0.52, 0, 0]} scale={[0.16, 0.7, 0.16]}>
          <capsuleGeometry args={[1, 1.35, detail === "low" ? 8 : 12, detail === "low" ? 16 : 30]} />
        </mesh>
      </group>
    );
  }

  return (
    <group>
      <mesh castShadow frustumCulled material={material} position={[0, 1.72, -0.02]} scale={[0.58, 0.58, 0.54]}>
        <sphereGeometry args={[1, detail === "low" ? 24 : 48, detail === "low" ? 20 : 40, 0, Math.PI * 2, 0, Math.PI * 0.8]} />
      </mesh>
      <LayerStrands count={style.id === "long-straight" ? 2 : Math.ceil(effectiveStrands * 0.38)} material={material} wavy={style.texture === "wavy" || style.id === "butterfly"} />
    </group>
  );
}

function InstancedCurls({ count, material }: { count: number; material: THREE.Material }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const matrix = useMemo(() => new THREE.Matrix4(), []);

  useEffect(() => {
    if (!ref.current) return;
    for (let index = 0; index < count; index += 1) {
      const angle = (index / count) * Math.PI * 2;
      const radius = 0.45 + (index % 4) * 0.035;
      const scale = 0.11 + (index % 3) * 0.018;
      matrix.compose(
        new THREE.Vector3(Math.cos(angle) * radius, 1.64 - (index % 6) * 0.055, Math.sin(angle) * radius * 0.62),
        new THREE.Quaternion().setFromEuler(new THREE.Euler(0.2, angle, 0.15 * Math.sin(angle))),
        new THREE.Vector3(scale, 0.2 + (index % 4) * 0.035, scale),
      );
      ref.current.setMatrixAt(index, matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
    ref.current.computeBoundingSphere();
  }, [count, matrix]);

  return <instancedMesh ref={ref} args={[strandGeometry, material, count]} castShadow frustumCulled />;
}

function LayerStrands({ count, material, short = false, wavy = false }: { count: number; material: THREE.Material; short?: boolean; wavy?: boolean }) {
  const xs = count <= 2 ? [-0.28, 0.28] : Array.from({ length: count }, (_, index) => -0.42 + (0.84 * index) / Math.max(1, count - 1));
  return (
    <group>
      {xs.map((x, index) => (
        <mesh
          castShadow
          frustumCulled
          key={`${x}-${index}`}
          material={material}
          position={[x, short ? 1.38 : 1.22 - (index % 3) * 0.012, 0.03 + Math.abs(x) * 0.05]}
          rotation={[wavy ? 0.24 : 0.06, 0, wavy ? x * 0.8 : x * 0.22]}
          scale={[0.1 + Math.abs(x) * 0.16, short ? 0.42 : 0.82, 0.09]}
        >
          <capsuleGeometry args={[1, 1.36, 8, 18]} />
        </mesh>
      ))}
    </group>
  );
}
