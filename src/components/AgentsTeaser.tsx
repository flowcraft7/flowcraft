"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AgentsTeaser() {
  return (
    <section className="border-b border-line py-24">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-xs uppercase tracking-wide text-automate">Pre-built & ready to deploy</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-ink">
            Don&apos;t need a custom build? Buy an agent instead.
          </h2>
          <p className="mt-4 text-ink-soft">
            Voice receptionists, chat agents, and automation suites — pick a tier, we set it up, you go live.
          </p>
          <Link
            href="/agents"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition hover:bg-signal"
          >
            Buy Your Agent Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}