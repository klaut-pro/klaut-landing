"use client";

import { FormEvent, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";

const WAITLIST_API = "/api/waitlist";

export function WishTool() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setStatus("idle");

    const form = e.currentTarget;
    const tool = (form.elements.namedItem("tool") as HTMLInputElement).value.trim();
    const useCase = (form.elements.namedItem("useCase") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("wishEmail") as HTMLInputElement).value
      .trim()
      .toLowerCase();
    const company = (form.elements.namedItem("wishCompany") as HTMLInputElement).value.trim();
    const honey = (form.elements.namedItem("website") as HTMLInputElement).value.trim();

    if (!tool) {
      setStatus("err");
      setMessage("Enter a tool name.");
      return;
    }
    if (!useCase) {
      setStatus("err");
      setMessage("Enter a short use case.");
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("err");
      setMessage("Enter a valid work email.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch(WAITLIST_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          company: company || undefined,
          website: honey || undefined,
          source: "tool-wish",
          tool,
          useCase,
        }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;

      if (res.status === 429) {
        setStatus("err");
        setMessage("Too many attempts. Try again later.");
        return;
      }
      if (!res.ok || !data?.ok) {
        setStatus("err");
        setMessage("Could not save your wish. Please try again.");
        return;
      }

      setStatus("ok");
      setMessage("Wish saved.");
      form.reset();
    } catch {
      setStatus("err");
      setMessage("Network error. Check your connection.");
    }
  }

  const noteClass =
    status === "err"
      ? "waitlist-note err"
      : status === "ok"
        ? "waitlist-note ok"
        : "waitlist-note";

  return (
    <section className="wish" id="wish">
      <div className="wrap">
        <Reveal>
          <h2 className="section-title">Need a tool we do not have?</h2>
        </Reveal>
        <Reveal delayMs={80}>
          <p className="section-lede">
            Tell us what you need. We read every wish, pick what to build next,
            and add it to the same MCP and the same token bill.
          </p>
        </Reveal>
        <Reveal delayMs={120}>
          <form className="waitlist wish-form" onSubmit={onSubmit} noValidate>
            <input
              className="hp"
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <div className="waitlist-row">
              <label htmlFor="tool" className="sr-only">
                Tool name
              </label>
              <input
                id="tool"
                name="tool"
                type="text"
                required
                placeholder="Tool name"
                autoComplete="off"
              />
            </div>
            <div className="waitlist-row">
              <label htmlFor="useCase" className="sr-only">
                Use case
              </label>
              <input
                id="useCase"
                name="useCase"
                type="text"
                required
                placeholder="Short use case"
                autoComplete="off"
              />
            </div>
            <div className="waitlist-row">
              <label htmlFor="wishEmail" className="sr-only">
                Work email
              </label>
              <input
                id="wishEmail"
                name="wishEmail"
                type="email"
                required
                placeholder="you@company.com"
                autoComplete="email"
                inputMode="email"
              />
              <button
                className="btn btn-primary"
                type="submit"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Sending…" : "Send wish"}
              </button>
            </div>
            <div className="waitlist-row">
              <label htmlFor="wishCompany" className="sr-only">
                Company
              </label>
              <input
                id="wishCompany"
                name="wishCompany"
                type="text"
                placeholder="Company (optional)"
                autoComplete="organization"
              />
            </div>
            <p className={noteClass} role="status" aria-live="polite">
              {message}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
