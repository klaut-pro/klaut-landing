"use client";

import { FormEvent, useState } from "react";

const WAITLIST_API = "/api/waitlist";

export function WaitlistForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "dup" | "err">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const [pulse, setPulse] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setStatus("idle");
    setPulse(false);

    const form = e.currentTarget;
    const email = (form.email as HTMLInputElement).value.trim().toLowerCase();
    const company = (form.company as HTMLInputElement).value.trim();
    const honey = (form.website as HTMLInputElement).value.trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("err");
      setMessage("Enter a valid work email.");
      (form.email as HTMLInputElement).focus();
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
          source: "landing-v1",
        }),
      });
      const data = (await res.json().catch(() => null)) as {
        ok?: boolean;
        duplicate?: boolean;
      } | null;

      if (res.status === 429) {
        setStatus("err");
        setMessage("Too many attempts. Try again later.");
        return;
      }
      if (!res.ok || !data?.ok) {
        setStatus("err");
        setMessage("Signup failed. Please try again.");
        return;
      }

      if (data.duplicate) {
        setStatus("dup");
        setMessage("You are already on the list.");
      } else {
        setStatus("ok");
        setMessage("Saved. We will reach out with early access.");
      }
      setPulse(true);
      form.reset();
    } catch {
      setStatus("err");
      setMessage("Network error. Check your connection.");
    }
  }

  const noteClass =
    status === "err"
      ? "waitlist-note err"
      : status === "ok" || status === "dup"
        ? "waitlist-note ok"
        : "waitlist-note";

  return (
    <form className="waitlist" onSubmit={onSubmit} noValidate>
      <input
        className="hp"
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <div className="waitlist-row">
        <label htmlFor="email" className="sr-only">
          Work email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@company.com"
          autoComplete="email"
          inputMode="email"
        />
        <button
          className={`btn btn-primary${pulse ? " pulse" : ""}`}
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Saving…" : "Join early access"}
        </button>
      </div>
      <div className="waitlist-row">
        <label htmlFor="company" className="sr-only">
          Company
        </label>
        <input
          id="company"
          name="company"
          type="text"
          placeholder="Company (optional)"
          autoComplete="organization"
        />
      </div>
      <p className="trust">
        For teams running agents in production. We reply with access, not
        newsletter noise.
      </p>
      <p className={noteClass} role="status" aria-live="polite">
        {message}
      </p>
    </form>
  );
}
