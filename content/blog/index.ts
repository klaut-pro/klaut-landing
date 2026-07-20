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
    title: "Der Flickenteppich skaliert nicht",
    teaser:
      "Ein Vault hier, eine DB dort, Search als Einzellösung. Unter Last bricht die Governance zuerst.",
    deck: "Ein Vault hier, eine DB dort, Search als Einzellösung. Für den Prototyp reicht das. Für einen Schwarm in Produktion reicht es nie.",
    date: "2026-07-20",
    dateLabel: "20. Juli 2026",
    readingMinutes: 6,
    nextSlug: "non-human-identity",
    blocks: [
      {
        type: "p",
        text: "Teams, die autonome Agenten betreiben, sammeln Tools wie Souvenirs. Secrets in einem Vault-Produkt. Dateien in einem Object Store. Mail über einen Provider, der nie für Non-Human Identities gedacht war. Search daneben. Am Anfang fühlt sich das schnell an.",
      },
      {
        type: "p",
        text: "Dann steigt die Last. Mehr Agenten, mehr Credentials, mehr Runs. Die erste Frage ist nicht mehr „Welches Modell?“. Die erste Frage ist: Wer darf was, und lässt sich das noch erklären?",
      },
      {
        type: "pull",
        text: "Governance bricht immer vor der Compute-Grenze.",
      },
      {
        type: "h2",
        text: "Was unter Last zuerst stirbt",
      },
      {
        type: "p",
        text: "Statische Keys in Env-Dateien. Manuelle Secrets-Rotation. Keine gemeinsame Identity zwischen Mail und Storage. Logs, die nicht zusammenpassen. Jedes Tool hat seine eigene Wahrheit. Operatoren verlieren den Überblick, bevor die Agenten „fertig“ sind.",
      },
      {
        type: "p",
        text: "Das ist kein Feature-Problem. Es ist ein Schicht-Problem. Agenten brauchen dieselben Grundlagen wie Teams: Identity, Persistenz, Suche, Kommunikation. Nur ohne menschliche Passwort-Rituale.",
      },
      {
        type: "h2",
        text: "Die Workspace-Lesart",
      },
      {
        type: "p",
        text: "klaut.pro behandelt die Service-Schicht wie einen Workspace für Agenten. Mail, Secrets, Books, Search, Database, Storage und Literature als Module unter einer Identity. Agenten bekommen durable Infrastruktur. Operatoren bekommen Audit und Lifecycle.",
      },
      {
        type: "p",
        text: "Du kaufst damit keine Magie. Du kaufst die Voraussetzung, dass Workflows reproduzierbar bleiben, wenn der Schwarm wächst.",
      },
      {
        type: "note",
        label: "Praktisch:",
        text: "Wenn fünf Agenten fünf Secrets-Stores brauchen, hast du keine Plattform. Du hast Schulden, die sich verzinsen.",
      },
      {
        type: "h2",
        text: "Was wir als Nächstes bauen",
      },
      {
        type: "p",
        text: "Early access öffnet die Schicht schrittweise. Wer Agent-Infrastruktur in Produktion plant, sollte früher in der Waitlist stehen als später im Incident-Channel.",
      },
    ],
  },
  {
    slug: "non-human-identity",
    title: "Non-Human Identities sind first-class",
    teaser:
      "Ein Agent ist kein User mit Passwort-Reset. Lifecycle, Scope und Audit gehören in die Plattform.",
    deck: "Ein Agent ist kein Mensch mit Passwort-Reset. Credentials brauchen Rotation, Scope und Audit, sobald mehr als ein Run läuft.",
    date: "2026-07-20",
    dateLabel: "20. Juli 2026",
    readingMinutes: 5,
    prevSlug: "agent-workspace",
    blocks: [
      {
        type: "p",
        text: "Die meisten Stacks behandeln Agenten wie temporäre Scripts. Ein Key, eine Env, ein Hoffnungswert. Das hält für Demos. In Produktion entstehen daraus stille Leaks, verwaiste Tokens und Incidents ohne klare Besitzverhältnisse.",
      },
      {
        type: "p",
        text: "Non-Human Identities verdienen dieselbe Sorgfalt wie Service Accounts, nur mit höherer Kadenz. Agenten starten, stoppen, skalieren. Credentials müssen mitkommen, ohne in Chat-Logs zu landen.",
      },
      {
        type: "pull",
        text: "Lifecycle ist das Feature. Das Token ist nur der Träger.",
      },
      {
        type: "h2",
        text: "Was „first-class“ konkret heißt",
      },
      {
        type: "p",
        text: "Dynamische Ausstellung statt ewig gültiger Keys. Scope, der an den Job gebunden ist. Audit, der Run und Identity verbindet. Isolation zwischen Tenants, auch wenn zehn Agenten parallel arbeiten.",
      },
      {
        type: "p",
        text: "Secrets als Plattform-Modul heißt: Agenten beziehen Tokens, Operatoren sehen Lifecycle, und Mail oder Database hängen an derselben Identity-Schicht. Eine Wahrheit, kein Abgleich über drei Tools.",
      },
      {
        type: "h2",
        text: "Warum Env-Dateien scheitern",
      },
      {
        type: "p",
        text: "Env-Dateien sind Snapshots. Agenten sind Prozesse. Sobald Rotation oder Widerruf nötig wird, bist du in manueller Arbeit. Manuelle Arbeit skaliert linear. Schwärme skalieren exponentiell.",
      },
      {
        type: "note",
        label: "Operator-Check:",
        text: "Kannst du in unter einer Minute sagen, welches Credential welcher Agent gestern um 14:12 genutzt hat? Wenn nicht, fehlt die Schicht.",
      },
      {
        type: "h2",
        text: "Die klaut.pro-Lesart",
      },
      {
        type: "p",
        text: "Wir bauen die Service-Schicht so, dass Non-Human Identities von Anfang an mitgedacht sind. Secrets, Mail, Storage und der Rest teilen dieselbe Identity. Early access öffnet genau diese Grundlage.",
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
