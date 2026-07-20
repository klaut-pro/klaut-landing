import { Reveal } from "@/components/motion/Reveal";

export function Proof() {
  return (
    <section className="proof" id="proof">
      <div className="wrap">
        <Reveal>
          <p className="proof-line">
            Wenn fünf Agenten fünf Secrets-Stores brauchen, hast du keine
            Plattform. Du hast Schulden.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
