import { Reveal } from "@/components/motion/Reveal";

export function Proof() {
  return (
    <section className="proof" id="proof">
      <div className="wrap">
        <Reveal>
          <p className="proof-line">
            If five agents need five secrets stores, you do not have a
            platform. You have debt.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
