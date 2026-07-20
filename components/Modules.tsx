import { Reveal } from "@/components/motion/Reveal";

const MODULES = [
  { name: "Mail", desc: "Delivery and identity for agent communication" },
  { name: "Secrets", desc: "Rotation, scope, and audit for credentials" },
  { name: "Books", desc: "Bookkeeping along agentic workflows" },
  { name: "Search", desc: "Search as a service for agent queries" },
  { name: "Database", desc: "Schemas and isolation for agent state" },
  { name: "Storage", desc: "Durable artifacts across runs" },
  { name: "Literature", desc: "Research with traceable sources" },
] as const;

export function Modules() {
  return (
    <section className="modules" id="module">
      <div className="wrap">
        <h2>Seven modules. One workspace.</h2>
        <p className="section-lede">
          Everything autonomous systems need to persist, under one governance
          layer.
        </p>
        <ul className="module-list">
          {MODULES.map((mod, i) => (
            <Reveal key={mod.name} as="li" delayMs={i * 60}>
              <strong>{mod.name}</strong>
              <span>{mod.desc}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
