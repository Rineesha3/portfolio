"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CircleCheck, LoaderCircle } from "lucide-react";
import { profile } from "@/data/profile";

const inputClass =
  "w-full rounded-lg bg-surface-2 px-3 py-2.5 text-sm placeholder:text-muted/70 outline-none ring-accent/60 transition focus:ring-2";

// Messages go straight to profile.email via Web3Forms (free, no backend).
// Get a key at https://web3forms.com and set NEXT_PUBLIC_WEB3FORMS_KEY in .env.local.
// Without a key the form falls back to opening the visitor's mail app.
const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

type Status = "idle" | "sending" | "sent" | "error";
type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  for (const field of ["name", "email", "message"] as const) {
    if (!String(data.get(field) ?? "").trim()) errors[field] = "Please fill this field";
  }
  const email = String(data.get("email") ?? "").trim();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email";
  }
  return errors;
}

function Required() {
  return (
    <span aria-hidden className="text-white">
      *
    </span>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-xs text-red-400">
      {message}
    </p>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  // Drop a field's error as soon as the visitor edits it
  function clearError(e: React.FormEvent<HTMLFormElement>) {
    const field = (e.target as HTMLInputElement).name as Field;
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function fieldProps(field: Field) {
    return {
      name: field,
      "aria-invalid": !!errors[field],
      "aria-describedby": errors[field] ? `${field}-error` : undefined,
      className: `${inputClass} ${errors[field] ? "ring-2 ring-red-400/70" : ""}`,
    };
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) return;
    const name = String(data.get("name"));
    const email = String(data.get("email"));
    const message = String(data.get("message"));
    const subject = `Portfolio message from ${name}`;

    if (!accessKey) {
      const body = `${message}\n\n— ${name} (${email})`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject,
          from_name: "Portfolio",
          name,
          email,
          replyto: email,
          message,
          botcheck: data.get("botcheck"),
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      onInput={clearError}
      noValidate
      className="flex flex-col gap-4 rounded-2xl bg-surface p-4"
    >
      {/* Honeypot: bots fill it, humans never see it */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} aria-hidden />
      <label className="flex flex-col gap-2 text-sm">
        <span>
          Name <Required />
        </span>
        <input {...fieldProps("name")} required placeholder="Your Name" />
        <FieldError id="name-error" message={errors.name} />
      </label>
      <label className="flex flex-col gap-2 text-sm">
        <span>
          Email <Required />
        </span>
        <input
          {...fieldProps("email")}
          type="email"
          required
          placeholder="you@email.com"
        />
        <FieldError id="email-error" message={errors.email} />
      </label>
      <label className="flex flex-col gap-2 text-sm">
        <span>
          Message <Required />
        </span>
        <textarea
          {...fieldProps("message")}
          required
          rows={5}
          placeholder="Your Message"
        />
        <FieldError id="message-error" message={errors.message} />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="flex items-center justify-center gap-2 rounded-lg bg-accent py-2.5 text-sm font-semibold transition-opacity hover:opacity-80 active:opacity-60 disabled:opacity-60"
      >
        {status === "sending" && <LoaderCircle size={16} className="animate-spin" />}
        {status === "sending" ? "Sending…" : "Send"}
      </button>

      <AnimatePresence mode="wait">
        {(status === "sent" || status === "error") && (
          <motion.p
            key={status}
            role="status"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`flex items-center gap-2 text-sm ${
              status === "sent" ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {status === "sent" ? (
              <>
                <CircleCheck size={16} /> Thanks! Your message was sent — I&rsquo;ll reply soon.
              </>
            ) : (
              <>
                Something went wrong. Please email me at{" "}
                <a href={`mailto:${profile.email}`} className="underline">
                  {profile.email}
                </a>
                .
              </>
            )}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
