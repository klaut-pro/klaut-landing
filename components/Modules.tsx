import { Reveal } from "@/components/motion/Reveal";

const MODULES = [
  { name: "Mail", desc: "Zustellung und Identity für Agent-Kommunikation" },
  { name: "Secrets", desc: "Rotation, Scope und Audit für Credentials" },
  { name: "Books", desc: "Bookkeeping entlang agentic Workflows" },
  { name: "Search", desc: "Search als Service für Agent-Queries" },
  { name: "Database", desc: "Schemas und Isolation für Agent-State" },
  { name: "Storage", desc: "Dauerhafte Artefakte über Runs hinweg" },
  { name: "Literature", desc: "Research mit nachvollziehbaren Quellen" },
] as const;

export function Modules() {
  return (
    <section className="modules" id="module">
      <div className="wrap">
        <h2>Sieben Module. Ein Workspace.</h2>
        <p className="section-lede">
          Alles, was autonome Systeme dauerhaft brauchen, unter einer
          Governance-Schicht.
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
