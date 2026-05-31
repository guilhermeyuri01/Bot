# Lumière Hair Studio

Interactive premium salon prototype built with Next.js 15, React Three Fiber, Drei, Three.js, Zustand, and TailwindCSS.

## Features

- 360° orbit controls with mouse/touch and smooth zoom.
- Modular hairstyle store prepared for GLB hair assets.
- Five ready hairstyle presets: long straight, curly, wavy, bob cut, and ponytail.
- Hair color picker, shine slider, and softbox light intensity slider.
- Before/after mode, auto-rotation toggle, and PNG canvas capture.
- Procedural fallback avatar/hair meshes so the UI can be developed before licensed cinematic GLB assets are added.

## Getting started

```bash
npm install
npm run dev
```

Add production GLB files under `public/models` using the names documented in `public/models/README.md`.
