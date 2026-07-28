import { Reveal } from "@/components/motion/Reveal";

const tools = [
  { name: "Secrets", desc: "Keys and passwords with limits" },
  { name: "Mail", desc: "Send email from agents" },
  { name: "Search", desc: "Search the web or your data" },
  { name: "Database", desc: "Store agent state" },
  { name: "Storage", desc: "Keep files" },
  { name: "Literature", desc: "Research with sources" },
  { name: "Writing", desc: "Write scientific reports. Make text sound natural." },
];

export function Tools() {
  return (
    <section className="tools" id="tools">
      <div className="wrap">
        <Reveal>
          <h2 className="section-title">Tools on the wire</h2>
        </Reveal>
        <Reveal delayMs={80}>
          <p className="section-lede">
            Capabilities your agents call through one MCP API.
          </p>
        </Reveal>
        <ul className="tool-rail">
          {tools.map((tool, i) => (
            <Reveal as="li" key={tool.name} delayMs={i * 40}>
              <strong>{tool.name}</strong>
              <span>{tool.desc}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
