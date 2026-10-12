"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { ArrowRight, Copy, Check } from "lucide-react";
import { PERSONAL, RESUMES } from "@/lib/constants";
import { useRole } from "@/lib/role-context";
import Seal from "@/components/shared/Seal";

type Status = "idle" | "sending" | "sent" | "failed";
type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Please add your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "That email address doesn't look right.";
  if (f.message.trim().length < 10) e.message = "A sentence or two, please (10+ characters).";
  return e;
}

const FIELD =
  "w-full border-0 border-b bg-transparent px-0 py-2 text-[17px] text-ink placeholder:text-pencil focus:outline-none focus-visible:outline-none";

export default function Contact() {
  const [fields, setFields] = useState<Fields>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);
  const role = useRole();
  const resumes = [...RESUMES].sort((a, b) => Number(b.role === role) - Number(a.role === role));

  const update = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...fields, [key]: e.target.value };
    setFields(next);
    if (touched) setErrors(validate(next));
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${PERSONAL.email}`;
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      document.getElementById(`contact-${Object.keys(errs)[0]}`)?.focus();
      return;
    }

    // Set in next.config.ts from EMAILJS_* or NEXT_PUBLIC_EMAILJS_* variables.
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey) {
      console.error("[contact] EmailJS is not configured: set EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID and EMAILJS_PUBLIC_KEY.");
      setStatus("failed");
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: fields.name,
          from_email: fields.email,
          message: fields.message,
          to_email: PERSONAL.email,
          reply_to: fields.email,
        },
        { publicKey }
      );
      setStatus("sent");
    } catch (err) {
      // EmailJS rejects with { status, text }, e.g. "The service ID not found".
      console.error("[contact] EmailJS send failed:", err);
      setStatus("failed");
    }
  };

  const reset = () => {
    setFields({ name: "", email: "", message: "" });
    setErrors({});
    setTouched(false);
    setStatus("idle");
  };

  const fieldBlock = (key: keyof Fields, label: string, input: React.ReactNode) => (
    <div>
      <label htmlFor={`contact-${key}`} className="label">
        {label}
      </label>
      {input}
      {errors[key] && (
        <p id={`contact-${key}-error`} className="mt-1 font-mono text-[12px] text-seal">
          {errors[key]}
        </p>
      )}
    </div>
  );

  const borderFor = (key: keyof Fields) =>
    errors[key] ? "border-seal" : "border-ink/40 focus:border-seal focus:border-b-2";

  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-9">
      {/* Form */}
      <div className="relative md:col-span-5">
        <p className="measure text-graphite">
          Hiring for a software, machine-learning or backend role, or have a project in mind? Write a
          few lines and I&apos;ll get back to you.
        </p>

        <form onSubmit={submit} noValidate className="relative mt-8 space-y-7" aria-describedby="form-status">
          <fieldset disabled={status === "sending" || status === "sent"} className="space-y-7 disabled:opacity-60">
            {fieldBlock(
              "name",
              "Name",
              <input
                id="contact-name"
                type="text"
                autoComplete="name"
                value={fields.name}
                onChange={update("name")}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "contact-name-error" : undefined}
                className={`${FIELD} ${borderFor("name")}`}
                placeholder="Your name"
              />
            )}
            {fieldBlock(
              "email",
              "Email",
              <input
                id="contact-email"
                type="email"
                autoComplete="email"
                value={fields.email}
                onChange={update("email")}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "contact-email-error" : undefined}
                className={`${FIELD} ${borderFor("email")}`}
                placeholder="you@company.com"
              />
            )}
            {fieldBlock(
              "message",
              "Message",
              <textarea
                id="contact-message"
                rows={5}
                value={fields.message}
                onChange={update("message")}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
                className={`${FIELD} ${borderFor("message")} resize-y`}
                placeholder="The role, the team, the problem…"
              />
            )}
          </fieldset>

          <div className="flex flex-wrap items-center gap-4">
            {status === "sent" ? (
              <button type="button" onClick={reset} className="btn btn-secondary">
                Write another
              </button>
            ) : (
              <button type="submit" disabled={status === "sending"} className="btn btn-primary">
                {status === "sending" ? "Sending…" : "Send message"}
                {status !== "sending" && <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />}
              </button>
            )}
            <p id="form-status" role="status" aria-live="polite" className="font-mono text-[12px]">
              {status === "sent" && <span className="text-verify">Received. I&apos;ll be in touch.</span>}
              {status === "failed" && (
                <span className="text-seal">
                  Couldn&apos;t send. Email me directly at{" "}
                  <a href={`mailto:${PERSONAL.email}`} className="text-link">
                    {PERSONAL.email}
                  </a>
                  .
                </span>
              )}
            </p>
          </div>

          {status === "sent" && (
            <div className="pointer-events-none absolute top-6 right-2 text-seal sm:right-8" aria-hidden="true">
              <div className="stamp-in" style={{ "--stamp-rot": "-12deg" } as React.CSSProperties}>
                <Seal id="received" word="RECEIVED" size={150} />
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Details */}
      <aside className="md:col-span-4 md:border-l md:border-rule md:pl-10" aria-label="Contact details">
        <dl className="space-y-6">
          <div>
            <dt className="label">Email</dt>
            <dd className="m-0 mt-1 flex flex-wrap items-center gap-x-3">
              <a href={`mailto:${PERSONAL.email}`} className="text-link break-all text-ink">
                {PERSONAL.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex min-h-[44px] items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.06em] text-graphite hover:text-seal"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-verify" strokeWidth={1.5} /> <span className="text-verify">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" strokeWidth={1.5} /> Copy
                  </>
                )}
              </button>
            </dd>
          </div>
          {[
            { k: "GitHub", v: `github.com/${PERSONAL.github}`, href: PERSONAL.githubUrl },
            { k: "LinkedIn", v: "linkedin.com/in/krishnaaa-here", href: PERSONAL.linkedin },
            { k: "LeetCode", v: "leetcode.com/u/Krishna_17", href: PERSONAL.leetcode },
          ].map((l) => (
            <div key={l.k}>
              <dt className="label">{l.k}</dt>
              <dd className="m-0 mt-1">
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-link break-all text-ink">
                  {l.v} ↗
                </a>
              </dd>
            </div>
          ))}
          <div>
            <dt className="label">Resume</dt>
            <dd className="m-0 mt-1">
              <ul className="space-y-1">
                {resumes.map((r) => (
                  <li key={r.role}>
                    <a href={r.href} download className="text-link text-ink">
                      {r.label} · PDF ↓
                    </a>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          <div className="border-t border-rule pt-6">
            <dt className="label flex items-center gap-2">
              <span className="status-dot h-2 w-2 rounded-full bg-verify" aria-hidden="true" />
              Open to
            </dt>
            <dd className="m-0 mt-2 text-ink">{PERSONAL.openTo.join(" · ")} roles</dd>
          </div>
        </dl>
      </aside>
    </div>
  );
}
