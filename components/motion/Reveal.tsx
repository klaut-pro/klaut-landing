"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type RevealProps = {
  children: ReactNode;
  as?: "div" | "li";
  className?: string;
  delayMs?: number;
};

export function Reveal({
  children,
  as = "div",
  className = "",
  delayMs = 0,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cls = `reveal${visible ? " in" : ""}${className ? ` ${className}` : ""}`;
  const style = delayMs ? { transitionDelay: `${delayMs}ms` } : undefined;
  const setRef = (node: HTMLElement | null) => {
    ref.current = node;
  };

  if (as === "li") {
    return (
      <li ref={setRef} className={cls} style={style}>
        {children}
      </li>
    );
  }

  return (
    <div ref={setRef} className={cls} style={style}>
      {children}
    </div>
  );
}
