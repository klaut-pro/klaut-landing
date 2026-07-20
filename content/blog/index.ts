export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "pull"; text: string }
  | { type: "note"; label: string; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  teaser: string;
  deck: string;
  date: string;
  dateLabel: string;
  readingMinutes: number;
  blocks: BlogBlock[];
  nextSlug?: string;
  prevSlug?: string;
};

export const posts: BlogPost[] = [
  {
    slug: "agent-workspace",
    title: "Patchwork does not scale",
    teaser:
      "A vault here, a database there, search as a one-off. Under load, governance fails first.",
    deck: "A vault here, a database there, search as a one-off. Fine for a prototype. Never enough for a swarm in production.",
    date: "2026-07-20",
    dateLabel: "July 20, 2026",
    readingMinutes: 6,
    nextSlug: "non-human-identity",
    blocks: [
      {
        type: "p",
        text: "Teams running autonomous agents collect tools like souvenirs. Secrets in one vault product. Files in an object store. Mail through a provider never designed for non-human identities. Search beside it. At the start it feels fast.",
      },
      {
        type: "p",
        text: "Then load rises. More agents, more credentials, more runs. The first question is no longer which model. The first question is who may do what, and can you still explain it.",
      },
      {
        type: "pull",
        text: "Governance always breaks before the compute ceiling.",
      },
      {
        type: "h2",
        text: "What dies first under load",
      },
      {
        type: "p",
        text: "Static keys in env files. Manual secret rotation. No shared identity between mail and storage. Logs that do not line up. Each tool keeps its own truth. Operators lose the plot before the agents finish.",
      },
      {
        type: "p",
        text: "This is not a feature gap. It is a layer gap. Agents need the same foundations teams need: identity, persistence, search, communication. Without human password rituals.",
      },
      {
        type: "h2",
        text: "The workspace reading",
      },
      {
        type: "p",
        text: "klaut.pro treats the service layer like a workspace for agents. Mail, Secrets, Books, Search, Database, Storage, and Literature as modules under one identity. Agents get durable infrastructure. Operators get audit and lifecycle.",
      },
      {
        type: "p",
        text: "You are not buying magic. You are buying the condition that workflows stay reproducible as the swarm grows.",
      },
      {
        type: "note",
        label: "In practice:",
        text: "If five agents need five secrets stores, you do not have a platform. You have debt that compounds.",
      },
      {
        type: "h2",
        text: "What we open next",
      },
      {
        type: "p",
        text: "Early access opens the layer in stages. If you are planning agent infrastructure for production, join the waitlist before you join the incident channel.",
      },
    ],
  },
  {
    slug: "non-human-identity",
    title: "Non-human identities are first-class",
    teaser:
      "An agent is not a user with a password reset. Lifecycle, scope, and audit belong in the platform.",
    deck: "An agent is not a person with a password reset. Credentials need rotation, scope, and audit as soon as more than one run is live.",
    date: "2026-07-20",
    dateLabel: "July 20, 2026",
    readingMinutes: 5,
    prevSlug: "agent-workspace",
    blocks: [
      {
        type: "p",
        text: "Most stacks treat agents like temporary scripts. One key, one env, one hope. That holds for demos. In production it becomes silent leaks, orphaned tokens, and incidents with no clear owner.",
      },
      {
        type: "p",
        text: "Non-human identities deserve the same care as service accounts, at a higher cadence. Agents start, stop, and scale. Credentials must move with them without landing in chat logs.",
      },
      {
        type: "pull",
        text: "Lifecycle is the feature. The token is only the carrier.",
      },
      {
        type: "h2",
        text: "What first-class means in practice",
      },
      {
        type: "p",
        text: "Dynamic issuance instead of forever keys. Scope bound to the job. Audit that joins run and identity. Isolation between tenants even when ten agents work in parallel.",
      },
      {
        type: "p",
        text: "Secrets as a platform module means agents fetch tokens, operators see lifecycle, and mail or database hang off the same identity layer. One truth, no reconciliation across three tools.",
      },
      {
        type: "h2",
        text: "Why env files fail",
      },
      {
        type: "p",
        text: "Env files are snapshots. Agents are processes. The moment rotation or revocation is required, you are in manual work. Manual work scales linearly. Swarms scale exponentially.",
      },
      {
        type: "note",
        label: "Operator check:",
        text: "Can you say in under a minute which credential which agent used yesterday at 14:12? If not, the layer is missing.",
      },
      {
        type: "h2",
        text: "The klaut.pro reading",
      },
      {
        type: "p",
        text: "We build the service layer so non-human identities are assumed from day one. Secrets, Mail, Storage, and the rest share the same identity. Early access opens exactly that foundation.",
      },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug);
}
