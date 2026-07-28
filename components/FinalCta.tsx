import { Reveal } from "@/components/motion/Reveal";

export function FinalCta() {
  return (
    <section className="cta" id="cta">
      <div className="wrap">
        <Reveal>
          <h2 className="section-title">Join early access</h2>
        </Reveal>
        <Reveal delayMs={80}>
          <p className="section-lede">
            One MCP. One place to manage tools. One token bill.
          </p>
        </Reveal>
        <Reveal delayMs={120}>
          <a className="btn btn-primary" href="#waitlist-form">
            Join waitlist
          </a>
        </Reveal>
      </div>
    </section>
  );
}
