import type { GraphicsQuality } from "@/types/hair";

export type QualityProfile = {
  dpr: [number, number];
  shadowMap: number;
  environmentResolution: number;
  contactShadowResolution: number;
  hairStrands: number;
  enableTransmission: boolean;
  enableShadows: boolean;
};

export const qualityProfiles: Record<GraphicsQuality, QualityProfile> = {
  ultra: {
    dpr: [1, 2],
    shadowMap: 2048,
    environmentResolution: 512,
    contactShadowResolution: 1024,
    hairStrands: 56,
    enableTransmission: true,
    enableShadows: true,
  },
  high: {
    dpr: [1, 1.5],
    shadowMap: 1024,
    environmentResolution: 256,
    contactShadowResolution: 768,
    hairStrands: 40,
    enableTransmission: true,
    enableShadows: true,
  },
  medium: {
    dpr: [0.85, 1.25],
    shadowMap: 512,
    environmentResolution: 128,
    contactShadowResolution: 512,
    hairStrands: 28,
    enableTransmission: false,
    enableShadows: true,
  },
  low: {
    dpr: [0.7, 1],
    shadowMap: 256,
    environmentResolution: 64,
    contactShadowResolution: 256,
    hairStrands: 16,
    enableTransmission: false,
    enableShadows: false,
  },
};

export function detectInitialQuality(): GraphicsQuality {
  if (typeof window === "undefined") return "high";

  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const cores = navigator.hardwareConcurrency ?? 4;
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 3);
  const isMobile = window.matchMedia("(pointer: coarse)").matches || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (memory <= 2 || cores <= 4 || (isMobile && pixelRatio > 2)) return "low";
  if (memory <= 4 || cores <= 6 || isMobile) return "medium";
  if (memory >= 12 && cores >= 10 && !isMobile) return "ultra";
  return "high";
}

export function downgradeQuality(quality: GraphicsQuality): GraphicsQuality {
  if (quality === "ultra") return "high";
  if (quality === "high") return "medium";
  return "low";
}
