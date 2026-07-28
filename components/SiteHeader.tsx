"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type SiteHeaderProps = {
  variant?: "home" | "blog";
};

export function SiteHeader({ variant = "home" }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <div className={`nav ${variant === "blog" ? "wrap-narrow" : "wrap"}`}>
        <Link className="wordmark" href="/">
          klaut.pro
        </Link>
        <nav className="nav-links" aria-label="Primary">
          {variant === "home" ? (
            <>
              <a href="#how">How it works</a>
              <a href="#tools">Tools</a>
              <a href="#wish">Wish</a>
              <a className="btn btn-primary" href="#waitlist">
                Join waitlist
              </a>
            </>
          ) : (
            <>
              <Link href="/blog">Blog</Link>
              <Link className="btn btn-primary" href="/#waitlist">
                Join waitlist
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
