import { HeroGraph } from "@/components/HeroGraph";
import { WaitlistForm } from "@/components/WaitlistForm";

export function Hero() {
  return (
    <section className="hero" id="waitlist" aria-label="Hero">
      <HeroGraph />
      <div className="wrap">
        <div className="hero-copy">
          <p className="brand-hero rise rise-1">klaut.pro</p>
          <h1 className="rise rise-2">One MCP. One bill for every agent tool.</h1>
          <p className="lede rise rise-3">
            Connect your agents to one MCP endpoint. Pay for usage from one token
            balance.
          </p>
          <div className="cta-group rise rise-4">
            <a className="btn btn-primary" href="#waitlist-form">
              Join waitlist
            </a>
            <a className="btn btn-ghost" href="#how">
              How it works
            </a>
          </div>
          <div className="rise rise-5">
            <WaitlistForm />
          </div>
        </div>
      </div>
    </section>
  );
}
