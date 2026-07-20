import { Atmosphere } from "@/components/motion/Atmosphere";
import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { Proof } from "@/components/Proof";
import { Modules } from "@/components/Modules";
import { BlogTeasers } from "@/components/BlogTeasers";
import { SiteFooter } from "@/components/SiteFooter";

export default function HomePage() {
  return (
    <>
      <Atmosphere />
      <SiteHeader />
      <main>
        <Hero />
        <Proof />
        <Modules />
        <BlogTeasers />
        <section className="cta" id="cta">
          <div className="wrap">
            <h2>Bau die Schicht, bevor der Schwarm wächst.</h2>
            <p className="section-lede">
              Early access öffnet schrittweise. Eine Work-Email reicht.
            </p>
            <a className="btn btn-primary" href="#waitlist">
              Zur Waitlist
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
