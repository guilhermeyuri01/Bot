"use client";

import { useMemo } from "react";
import * as THREE from "three";
import type { HairControls } from "@/types/hair";

export function usePremiumHairMaterial(controls: HairControls, beforeMode: boolean) {
  return useMemo(() => {
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(beforeMode ? "#2b201e" : controls.color),
      roughness: THREE.MathUtils.clamp(0.78 - controls.shine * 0.42, 0.18, 0.82),
      metalness: 0.015,
      clearcoat: 0.18 + controls.reflection * 0.55,
      clearcoatRoughness: 0.12,
      sheen: 0.75 + controls.shine * 0.25,
      sheenColor: new THREE.Color("#fff2df"),
      iridescence: 0.08 * controls.reflection,
    });

    material.onBeforeCompile = (shader) => {
      shader.uniforms.uAnisotropicShine = { value: controls.shine };
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <common>",
        `#include <common>
uniform float uAnisotropicShine;
float hairStrandSpecular(vec3 normalDirection, vec3 viewDirection) {
  vec3 tangentDirection = normalize(vec3(normalDirection.y, -normalDirection.x, normalDirection.z + 0.001));
  float strandAlignment = 1.0 - abs(dot(tangentDirection, viewDirection));
  return pow(clamp(strandAlignment, 0.0, 1.0), 34.0) * uAnisotropicShine;
}`,
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <dithering_fragment>",
        `float premiumHairGlint = hairStrandSpecular(normalize(normal), normalize(vViewPosition));
 gl_FragColor.rgb += vec3(1.0, 0.84, 0.62) * premiumHairGlint * 0.18;
 #include <dithering_fragment>`,
      );
    };

    return material;
  }, [beforeMode, controls.color, controls.reflection, controls.shine]);
}
