import { Reveal } from "@/components/motion/Reveal";

const steps = [
  {
    n: "01",
    title: "Connect",
    body: "Point your agent at the klaut MCP URL.",
  },
  {
    n: "02",
    title: "Manage",
    body: "Turn tools on, set key limits, and choose who can call them.",
  },
  {
    n: "03",
    title: "Meter",
    body: "Each call uses tokens from one balance. You can set a cap.",
  },
];

export function HowItWorks() {
  return (
    <section className="how" id="how">
      <div className="wrap">
        <Reveal>
          <h2 className="section-title">How it works</h2>
        </Reveal>
        <Reveal delayMs={80}>
          <p className="section-lede">Three steps from agent to tools and billing.</p>
        </Reveal>
        <ol className="steps">
          {steps.map((step, i) => (
            <Reveal as="li" key={step.n} delayMs={i * 100}>
              <span className="n">{step.n}</span>
              <div>
                <strong>{step.title}</strong>
                <span>{step.body}</span>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
