"use client";

import { motion } from "framer-motion";

const stages = ["New Lead", "AI Qualifies", "Books Call", "Sends Confirmation"];

export default function AutomationDemo() {
  return (
    <div className="mt-6 rounded-lg border border-automate bg-white p-4">
      <p className="font-mono text-xs uppercase tracking-wide text-automate">Workflow preview</p>
      <div className="mt-4 flex items-center justify-between">
        {stages.map((stage, i) => (
          <div key={stage} className="flex flex-1 items-center">
            <motion.div
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-line text-xs font-medium text-ink-soft"
              animate={{
                backgroundColor: ["#E1E3DE", "#7A1F1F", "#E1E3DE"],
                color: ["#4A5052", "#FFFFFF", "#4A5052"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: (stages.length - 1) * 0.6,
                delay: i * 0.6,
              }}
            >
              {i + 1}
            </motion.div>
            {i < stages.length - 1 && <div className="mx-1 h-px flex-1 bg-line" />}
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-between text-[10px] text-ink-soft">
        {stages.map((stage) => (
          <span key={stage} className="w-16 text-center">{stage}</span>
        ))}
      </div>
    </div>
  );
}