import { Reveal } from "@/components/motion/Reveal";

export function Problem() {
  return (
    <section className="problem" id="problem">
      <div className="wrap">
        <Reveal>
          <h2 className="section-title">Too many tools means too many bills.</h2>
        </Reveal>
        <Reveal delayMs={100}>
          <p className="section-lede">
            Each tool brings its own server, API key, and invoice. It is hard to
            see who called what. It is hard to pay for it in one place.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
