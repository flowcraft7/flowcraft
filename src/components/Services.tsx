"use client";

import { motion } from "framer-motion";
import { Gauge, Workflow, Bot } from "lucide-react";

const services = [
  {
    icon: Gauge,
    title: "Speed Rebuild",
    description: "We build new business sites from scratch, and rebuild slow, outdated ones — modern stack, fast hosting, optimized assets.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "We automate the manual, repetitive work behind your site — lead follow-up, data entry, reporting — using n8n and custom automation.",
  },
  {
    icon: Bot,
    title: "AI Features",
    description: "We add AI-powered tools where they actually help — chat assistants, smart forms, automated content workflows.",
  },
];

export default function Services() {
  return (
    <section id="services" className="border-b border-line py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-ink">What we do</h2>
          <p className="mt-4 text-ink-soft">Three ways we make your site faster and your business run smoother.</p>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-lg border border-line bg-white p-8"
            >
              <service.icon className="h-8 w-8 text-signal" strokeWidth={1.5} />
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-semibold text-ink">{service.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}