"use client";

import { motion } from "framer-motion";
import ProcessLine from "./ProcessLine";

const steps = [
  {
    number: "01",
    title: "Free Audit",
    description: "We review your current site's speed, and map out the manual workflows costing you time.",
  },
  {
    number: "02",
    title: "Rebuild & Automate",
    description: "We rebuild your site for speed and set up the automations that remove the manual work.",
  },
  {
    number: "03",
    title: "Launch & Monitor",
    description: "We launch, then keep monitoring performance so the speed gains actually stick.",
  },
];

export default function Process() {
  return (
    <section id="process" className="border-b border-line py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-ink">How it works</h2>
          <p className="mt-4 text-ink-soft">Three steps, start to finish.</p>
        </motion.div>

        <div className="relative mx-auto mt-16 max-w-4xl">
          <ProcessLine />
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.15 + 0.2, type: "spring" }}
                  className="inline-block font-[family-name:var(--font-mono)] text-sm text-automate"
                >
                  {step.number}
                </motion.span>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}