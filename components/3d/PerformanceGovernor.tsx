"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { downgradeQuality, qualityProfiles } from "@/lib/quality";
import { useHairStore } from "@/store/useHairStore";

export function PerformanceGovernor() {
  const quality = useHairStore((state) => state.quality);
  const setQuality = useHairStore((state) => state.setQuality);
  const setPerformance = useHairStore((state) => state.setPerformance);
  const setDpr = useThree((state) => state.setDpr);
  const gl = useThree((state) => state.gl);
  const frameTimes = useRef<number[]>([]);
  const lastReport = useRef(0);
  const lastQualityDrop = useRef(0);

  const gpuTier = useMemo(() => {
    if (typeof navigator === "undefined") return "server";
    const nav = navigator as Navigator & { deviceMemory?: number };
    return `${nav.hardwareConcurrency ?? "?"} cores / ${nav.deviceMemory ?? "?"}GB`;
  }, []);

  useEffect(() => {
    const profile = qualityProfiles[quality];
    setDpr(profile.dpr);
    gl.shadowMap.enabled = profile.enableShadows;
  }, [gl, quality, setDpr]);

  useFrame((state, delta) => {
    const now = state.clock.elapsedTime;
    frameTimes.current.push(delta);
    if (frameTimes.current.length > 50) frameTimes.current.shift();
    if (now - lastReport.current < 0.7) return;

    const averageDelta = frameTimes.current.reduce((sum, item) => sum + item, 0) / Math.max(1, frameTimes.current.length);
    const fps = Math.round(1 / averageDelta);
    const memory = getMemoryMb();
    setPerformance({ fps, memoryMb: memory, quality, gpuTier });

    if (fps < 45 && quality !== "low" && now - lastQualityDrop.current > 6) {
      lastQualityDrop.current = now;
      setQuality(downgradeQuality(quality));
    }

    lastReport.current = now;
  });

  return null;
}

function getMemoryMb() {
  const performanceMemory = (performance as Performance & { memory?: { usedJSHeapSize: number } }).memory;
  return performanceMemory ? Math.round(performanceMemory.usedJSHeapSize / 1024 / 1024) : null;
}
