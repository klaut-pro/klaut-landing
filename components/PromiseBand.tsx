import { Reveal } from "@/components/motion/Reveal";

export function PromiseBand() {
  return (
    <section className="promise" id="promise">
      <div className="wrap">
        <Reveal>
          <p className="promise-line">One login. One tool list. One token balance.</p>
        </Reveal>
        <Reveal delayMs={100}>
          <p className="support">
            Your agents call klaut over MCP for shared tools and billing.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
