"use client";

import { FormEvent, useState } from "react";

const WAITLIST_API = "https://waitlist.klaut.pro/v1/signup";

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
      setMessage("Bitte eine gültige Work-Email eingeben.");
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
          source: "landing",
        }),
      });
      const data = (await res.json().catch(() => null)) as {
        ok?: boolean;
        duplicate?: boolean;
      } | null;

      if (res.status === 429) {
        setStatus("err");
        setMessage("Zu viele Versuche. Bitte später erneut.");
        return;
      }
      if (!res.ok || !data?.ok) {
        setStatus("err");
        setMessage("Signup fehlgeschlagen. Bitte erneut versuchen.");
        return;
      }

      if (data.duplicate) {
        setStatus("dup");
        setMessage("Du stehst bereits auf der Liste.");
      } else {
        setStatus("ok");
        setMessage("Gesichert. Wir melden uns mit Early Access.");
      }
      setPulse(true);
      form.reset();
    } catch {
      setStatus("err");
      setMessage("Netzwerkfehler. Bitte Verbindung prüfen.");
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
          {status === "loading" ? "Wird gesichert…" : "Early access sichern"}
        </button>
      </div>
      <div className="waitlist-row">
        <label htmlFor="company" className="sr-only">
          Firma
        </label>
        <input
          id="company"
          name="company"
          type="text"
          placeholder="Firma (optional)"
          autoComplete="organization"
        />
      </div>
      <p className="trust">
        Für Teams, die Agenten in Produktion fahren. Wir melden uns mit Zugang,
        nicht mit Newsletter-Noise.
      </p>
      <p className={noteClass} role="status" aria-live="polite">
        {message}
      </p>
    </form>
  );
}
