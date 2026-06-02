type AnimationVars = Record<string, unknown>;

type Context = { revert: () => void };

const cleanups = new Set<() => void>();

function applyVars(element: HTMLElement, vars: AnimationVars) {
  if (typeof vars.autoAlpha === "number") element.style.opacity = String(vars.autoAlpha);
  if (typeof vars.y === "number") element.style.transform = `translate3d(0, ${vars.y}px, 0)`;
}

const gsap = {
  registerPlugin: (...plugins: unknown[]) => { void plugins; },
  context(callback: () => void): Context {
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
  fromTo(element: HTMLElement, fromVars: AnimationVars, toVars: AnimationVars) {
    applyVars(element, fromVars);
    element.style.transition = `opacity ${toVars.duration ?? 1}s cubic-bezier(.16,1,.3,1), transform ${toVars.duration ?? 1}s cubic-bezier(.16,1,.3,1)`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          applyVars(element, toVars);
          observer.disconnect();
        }
      },
      { threshold: 0.16 },
    );

    observer.observe(element);
    cleanups.add(() => observer.disconnect());
  },
  to(selector: string, vars: AnimationVars) {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));
    const yPercent = typeof vars.yPercent === "number" ? vars.yPercent : 0;
    const update = () => {
      elements.forEach((element) => {
        element.style.transform = `translate3d(0, ${(window.scrollY * yPercent) / 100}px, 0)`;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    cleanups.add(() => window.removeEventListener("scroll", update));
  },
};

export default gsap;
