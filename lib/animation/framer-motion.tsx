import React, { Fragment, ReactNode } from "react";

type MotionExtra = {
  initial?: Record<string, unknown>;
  animate?: Record<string, unknown>;
  exit?: Record<string, unknown>;
  transition?: Record<string, unknown>;
};

type MotionDivProps = React.HTMLAttributes<HTMLDivElement> & MotionExtra;
type MotionImgProps = React.ImgHTMLAttributes<HTMLImageElement> & MotionExtra;

function resolveStyle(animate: Record<string, unknown> | undefined, style: React.CSSProperties | undefined) {
  return {
    ...style,
    opacity: typeof animate?.opacity === "number" ? animate.opacity : style?.opacity,
    transform:
      typeof animate?.y === "number"
        ? `translateY(${animate.y}px)`
        : typeof animate?.scale === "number"
          ? `scale(${animate.scale})`
          : style?.transform,
    transition: "opacity 900ms cubic-bezier(.16,1,.3,1), transform 900ms cubic-bezier(.16,1,.3,1)",
  };
}

function stripMotionProps<T extends MotionExtra>(props: T) {
  const { initial, animate, exit, transition, ...rest } = props;
  void initial;
  void exit;
  void transition;
  return { animate, rest };
}

export function AnimatePresence({ children }: { children: ReactNode }) {
  return <Fragment>{children}</Fragment>;
}

export const motion = {
  div(props: MotionDivProps) {
    const { animate, rest } = stripMotionProps(props);
    return <div {...rest} style={resolveStyle(animate, rest.style)} />;
  },
  img(props: MotionImgProps) {
    const { animate, rest } = stripMotionProps(props);
    return (
      // eslint-disable-next-line @next/next/no-img-element -- Lightbox images are client-only animation primitives.
      <img {...rest} style={resolveStyle(animate, rest.style)} alt={rest.alt ?? ""} />
    );
  },
};
