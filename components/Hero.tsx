import { WaitlistForm } from "@/components/WaitlistForm";

export function Hero() {
  return (
    <section className="hero" id="waitlist">
      <div className="wrap hero-inner">
        <p className="brand-hero">klaut.pro</p>
        <h1>Shared infrastructure for autonomous agents.</h1>
        <p className="lede">
          Mail, Secrets, Books, Search, Database, Storage, and Literature under
          one identity. Built for swarms that run in production.
        </p>
        <WaitlistForm />
      </div>
    </section>
  );
}
