import { Reveal } from "@/components/motion/Reveal";

const faqs = [
  {
    q: "What is the klaut MCP API?",
    a: "One MCP endpoint. Your agents call klaut tools through it.",
  },
  {
    q: "How do my other MCP servers fit?",
    a: "Keep your own tools. Use klaut for shared tools, login, logs, and billing.",
  },
  {
    q: "How does the token bill work?",
    a: "Calls use tokens from one balance. You see usage per tool. You can cap each agent.",
  },
  {
    q: "How do agents log in?",
    a: "Each agent gets its own login with limited keys, rotation, and logs.",
  },
  {
    q: "Can we ask for a missing tool?",
    a: "Yes. Use Wish a tool. We use wishes to plan early access.",
  },
  {
    q: "When can we get in?",
    a: "In waves. Join the waitlist with a work email.",
  },
];

export function Faq() {
  return (
    <section className="faq" id="faq">
      <div className="wrap">
        <Reveal>
          <h2 className="section-title">FAQ</h2>
        </Reveal>
        <Reveal delayMs={80}>
          <p className="section-lede">Straight answers for teams evaluating klaut.</p>
        </Reveal>
        {faqs.map((item) => (
          <Reveal key={item.q}>
            <details>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
