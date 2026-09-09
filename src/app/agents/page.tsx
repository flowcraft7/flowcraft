"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
import ChatAgentDemo from "@/components/ChatAgentDemo";
import VoiceAgentDemo from "@/components/VoiceAgentDemo";
import AutomationDemo from "@/components/AutomationDemo";

type Tier = {
  name: string;
  tagline: string;
  setupFee: string;
  monthly: string;
  popular?: boolean;
  features: string[];
};

const tiers: Tier[] = [
  {
    name: "Starter Chat Agent",
    tagline: "A smart FAQ + lead-capture chatbot for your website.",
    setupFee: "$299",
    monthly: "$49/mo",
    features: [
      "AI chatbot trained on your business info",
      "Lead capture form built in",
      "Basic analytics dashboard",
      "Email support",
    ],
  },
  {
    name: "Voice Receptionist Agent",
    tagline: "An AI phone receptionist that answers, books, and follows up.",
    setupFee: "$799",
    monthly: "$149/mo",
    popular: true,
    features: [
      "Everything in Starter",
      "AI voice agent for inbound calls",
      "Automated appointment booking",
      "CRM / calendar integration",
      "Priority support",
    ],
  },
  {
    name: "Full Automation Suite",
    tagline: "Voice + chat + backend workflow automation, fully custom.",
    setupFee: "$1,499",
    monthly: "$299/mo",
    features: [
      "Everything in Voice Receptionist",
      "Custom n8n workflow automation",
      "Multi-channel (voice, chat, WhatsApp)",
      "Monthly optimization & reporting",
      "Dedicated support line",
    ],
  },
];

export default function AgentsPage() {
  return (
    <main>
      <div className="border-b border-line py-16">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <Link href="/" className="text-sm text-ink-soft hover:text-ink">
            ← Back to Flowcraft
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold text-ink"
          >
            Buy Your Agent Now
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-ink-soft"
          >
            Pre-built AI agents, ready to deploy for your business. Pick a tier, we set it up, you go live.
          </motion.p>
        </div>
      </div>

      <section className="py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 lg:grid-cols-3 lg:px-8">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-lg border p-8 ${
                tier.popular ? "border-signal bg-signal-dim" : "border-line bg-white"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-8 rounded-full bg-signal px-3 py-1 text-xs font-medium text-white">
                  Most Popular
                </span>
              )}
              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-ink">
                {tier.name}
              </h3>
              <p className="mt-2 text-sm text-ink-soft">{tier.tagline}</p>

              <div className="mt-6">
                <span className="font-[family-name:var(--font-mono)] text-3xl font-medium text-ink">
                  {tier.setupFee}
                </span>
                <span className="text-sm text-ink-soft"> setup</span>
                <div className="mt-1 font-[family-name:var(--font-mono)] text-sm text-ink-soft">
                  + {tier.monthly}
                </div>
              </div>

              <ul className="mt-6 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-ink">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-signal" />
                    {feature}
                  </li>
                ))}
              </ul>

              {tier.name === "Starter Chat Agent" && <ChatAgentDemo />}
              {tier.name === "Voice Receptionist Agent" && <VoiceAgentDemo />}
              {tier.name === "Full Automation Suite" && <AutomationDemo />}

              <Link
                href="/#cta"
                className={`mt-6 block rounded-md px-6 py-3 text-center text-sm font-medium transition ${
                  tier.popular
                    ? "bg-ink text-paper hover:bg-signal"
                    : "border border-line text-ink hover:border-signal"
                }`}
              >
                Get Started
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl px-6 text-center text-sm text-ink-soft lg:px-8">
          Need something more custom? <Link href="/#cta" className="text-signal underline">Book a free consult</Link> and we&apos;ll scope it together.
        </p>
      </section>

      <Footer />
    </main>
  );
}