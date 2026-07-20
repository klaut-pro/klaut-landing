import { WaitlistForm } from "@/components/WaitlistForm";

export function Hero() {
  return (
    <section className="hero" id="waitlist">
      <div className="wrap hero-inner">
        <p className="brand-hero">klaut.pro</p>
        <h1>Gemeinsame Infrastruktur für autonome Agenten.</h1>
        <p className="lede">
          Mail, Secrets, Books, Search, Database, Storage und Literature unter
          einer Identity. Gebaut für Schwärme, die in Produktion laufen.
        </p>
        <WaitlistForm />
      </div>
    </section>
  );
}
