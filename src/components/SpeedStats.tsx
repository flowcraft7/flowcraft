"use client";

import { motion } from "framer-motion";
import AnimatedNumber from "./AnimatedNumber";

export default function SpeedStats() {
  return (
    <section className="border-b border-line py-16">
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-lg border border-line bg-white p-6"
        >
          <p className="font-mono text-xs uppercase tracking-wide text-ink-soft">Before</p>
          <p className="mt-3 font-[family-name:var(--font-mono)] text-3xl font-medium text-ink">
            <AnimatedNumber value={4.8} suffix="s" />
          </p>
          <p className="mt-1 text-sm text-ink-soft">Average load time</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="rounded-lg border border-signal bg-signal-dim p-6"
        >
          <p className="font-mono text-xs uppercase tracking-wide text-signal">After</p>
          <p className="mt-3 font-[family-name:var(--font-mono)] text-3xl font-medium text-ink">
            <AnimatedNumber value={0.6} suffix="s" />
          </p>
          <p className="mt-1 text-sm text-ink-soft">Average load time</p>
        </motion.div>
      </div>
    </section>
  );
}