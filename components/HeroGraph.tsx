"use client";

import { useEffect, useRef } from "react";
import { mountMcpHeroGraph } from "@/lib/mcpHeroGraph";

export function HeroGraph() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let dispose: (() => void) | undefined;
    try {
      dispose = mountMcpHeroGraph(el);
    } catch {
      // WebGL unavailable: veil + CSS gradients remain
    }
    return () => {
      dispose?.();
    };
  }, []);

  return (
    <div className="hero-art" ref={ref} aria-hidden="true">
      <div className="hero-veil" />
    </div>
  );
}
