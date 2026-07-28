import { Reveal } from "@/components/motion/Reveal";

export function Billing() {
  return (
    <section className="billing" id="billing">
      <div className="wrap">
        <Reveal>
          <h2 className="section-title">One token bill</h2>
        </Reveal>
        <Reveal delayMs={100}>
          <p className="section-lede">
            One balance. See usage per tool. Cap spend per agent. Pricing details
            come with early access.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
