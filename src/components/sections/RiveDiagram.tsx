"use client";

// XGL msg 7182-7185 (2026-09-07) · Rive runtime wrapper for the drawer's
// Concept diagram tab. Renders a .riv file with autoplay + hover-to-play
// interaction. State machines defined in the .riv file drive the object-
// by-object build-up ; runtime picks up whatever XGL wires in Rive editor
// without needing code changes here.
//
// Client-only : useRive touches the DOM canvas. Loaded via next/dynamic
// on the caller side so the Rive runtime (~200 KB) isn't shipped on
// pages that don't animate.

import { useRive, Fit, Layout, Alignment } from "@rive-app/react-canvas";

type Props = {
  src: string;
  /** Optional state machine name from the .riv file. When undefined,
   *  Rive falls back to autoplaying the file's default animation. */
  stateMachine?: string;
  /** Fit strategy for the canvas ; contain keeps the aspect ratio and
   *  never crops — right choice for a diagram. */
  fit?: keyof typeof Fit;
  className?: string;
};

export default function RiveDiagram({
  src,
  stateMachine,
  fit = "Contain",
  className,
}: Props) {
  const { RiveComponent } = useRive({
    src,
    autoplay: true,
    stateMachines: stateMachine,
    layout: new Layout({
      fit: Fit[fit],
      alignment: Alignment.Center,
    }),
  });

  return (
    <div
      className={
        className ??
        "aspect-[16/10] w-full overflow-hidden rounded-lg border border-white/15 bg-black/40 shadow-2xl"
      }
    >
      <RiveComponent />
    </div>
  );
}
