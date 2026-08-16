"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function CTA() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/book-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="cta" className="py-24">
      <div className="mx-auto max-w-xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-ink">Ready for a faster site?</h2>
          <p className="mt-4 text-ink-soft">
            Tell us a bit about your site and we&apos;ll reach out to book your free audit.
          </p>
        </motion.div>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 rounded-lg border border-signal bg-signal-dim p-6 text-center"
          >
            <p className="font-medium text-ink">Thanks — we got your message and will reach out shortly.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {[
              { key: "name", type: "text", placeholder: "Your name" },
              { key: "email", type: "email", placeholder: "Your email" },
            ].map((field, i) => (
              <motion.input
                key={field.key}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                type={field.type}
                required
                placeholder={field.placeholder}
                value={form[field.key as "name" | "email"]}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                className="w-full rounded-md border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-soft focus:border-signal focus:outline-none"
              />
            ))}
            <motion.textarea
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              required
              placeholder="What's going on with your current site?"
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-md border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-soft focus:border-signal focus:outline-none"
            />
            <motion.button
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-md bg-ink px-8 py-3 font-medium text-paper transition hover:bg-signal disabled:opacity-50"
            >
              {status === "loading" ? "Sending..." : "Book a free audit"}
            </motion.button>
            {status === "error" && (
              <p className="text-center text-sm text-automate">Something went wrong — try again or email us directly.</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}