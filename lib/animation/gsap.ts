import type { RefObject } from "react";

type AnimationVars = Record<string, unknown>;
type Context = { revert: () => void };

type TriggerOptions = {
  trigger?: Element | string | null;
  start?: string;
  end?: string;
  scrub?: number | boolean;
  once?: boolean;
};

const cleanups = new Set<() => void>();

function resolveElements(target: HTMLElement | string): HTMLElement[] {
  if (typeof target !== "string") return [target];
  return Array.from(document.querySelectorAll<HTMLElement>(target));
}

function currentTransform(element: HTMLElement) {
  return {
    x: Number(element.dataset.gsapX ?? 0),
    y: Number(element.dataset.gsapY ?? 0),
    scale: Number(element.dataset.gsapScale ?? 1),
  };
}

function writeTransform(element: HTMLElement) {
  const { x, y, scale } = currentTransform(element);
  element.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
}

function applyVars(element: HTMLElement, vars: AnimationVars) {
  if (typeof vars.autoAlpha === "number") element.style.opacity = String(vars.autoAlpha);
  if (typeof vars.opacity === "number") element.style.opacity = String(vars.opacity);
  if (typeof vars.x === "number") element.dataset.gsapX = String(vars.x);
  if (typeof vars.y === "number") element.dataset.gsapY = String(vars.y);
  if (typeof vars.scale === "number") element.dataset.gsapScale = String(vars.scale);

  if (typeof vars.x === "number" || typeof vars.y === "number" || typeof vars.scale === "number") {
    writeTransform(element);
  }
}

function observe(element: HTMLElement, toVars: AnimationVars) {
  const triggerConfig = toVars.scrollTrigger as TriggerOptions | undefined;
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        applyVars(element, toVars);
        if (triggerConfig?.once !== false) observer.disconnect();
      }
    },
    { threshold: 0.16 },
  );

  observer.observe(element);
  cleanups.add(() => observer.disconnect());
}

const gsap = {
  registerPlugin: (...plugins: unknown[]) => {
    void plugins;
  },
  context(callback: () => void, scope?: RefObject<Element | null> | Element | null): Context {
    void scope;
    callback();
    return {
      revert() {
        cleanups.forEach((cleanup) => cleanup());
        cleanups.clear();
      },
    };
  },
  utils: {
    toArray<T extends Element = Element>(selector: string): T[] {
      return Array.from(document.querySelectorAll(selector)) as T[];
    },
  },
  fromTo(target: HTMLElement | string, fromVars: AnimationVars, toVars: AnimationVars) {
    resolveElements(target).forEach((element) => {
      applyVars(element, fromVars);
      element.style.transition = [
        `opacity ${toVars.duration ?? 1}s cubic-bezier(.16,1,.3,1)`,
        `transform ${toVars.duration ?? 1}s cubic-bezier(.16,1,.3,1)`,
      ].join(", ");
      observe(element, toVars);
    });
  },
  to(target: HTMLElement | string, vars: AnimationVars) {
    const elements = resolveElements(target);
    const yPercent = typeof vars.yPercent === "number" ? vars.yPercent : 0;
    const scale = typeof vars.scale === "number" ? vars.scale : undefined;

    const update = () => {
      const scrollRange = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = window.scrollY / scrollRange;
      elements.forEach((element) => {
        element.dataset.gsapY = String((window.innerHeight * yPercent * progress) / 100);
        if (scale) element.dataset.gsapScale = String(1 + (scale - 1) * progress);
        writeTransform(element);
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    cleanups.add(() => window.removeEventListener("scroll", update));
  },
};

export default gsap;
