"use client";

import { motion } from "framer-motion";

type Project = {
  title: string;
  client: string;
  description: string;
  stack: string;
};

const projects: Project[] = [
  {
    title: "Maternal & Fetal Risk Prediction System",
    client: "Doc Poly Clinic — Signed, Digitalization Phase 1",
    description: "An AI-powered clinical tool that helps flag high-risk pregnancies earlier, using patient vitals and CTG data. Phase 1 of a full digital transformation for the clinic — contract signed and underway.",
    stack: "React · FastAPI · Random Forest · XGBoost",
  },
  {
    title: "Full Stack Digitalization Platform",
    client: "Dental Clinic",
    description: "Built a full-stack digital platform for a dental clinic, including a voice assistant that lets patients book appointments by simply talking — no forms, no phone hold times.",
    stack: "Full Stack · Voice AI · Automation",
  },
  {
    title: "Job Copilot — AI Resume Tailor",
    client: "Personal Project",
    description: "A full-stack AI tool that ingests a resume and job description, rewrites bullet points to match ATS keywords, and auto-generates a tailored cover letter — all within 60 seconds.",
    stack: "FastAPI · Next.js · Groq · Supabase",
  },
  {
    title: "Multilingual AI Support Agent",
    client: "Personal Project",
    description: "An end-to-end AI customer support system that detects query language, classifies intent, and routes tickets automatically — cutting manual triage effort by an estimated 65%.",
    stack: "FastAPI · React · Groq · Supabase · n8n",
  },
  {
    title: "AI Portfolio & CV Generator",
    client: "Personal Project",
    description: "Converts a GitHub profile and LinkedIn PDF into a fully deployed live portfolio site plus a downloadable, ATS-optimized CV — in under 60 seconds.",
    stack: "FastAPI · React · Groq · Supabase · WeasyPrint",
  },
];

export default function Proof() {
  return (
    <section id="proof" className="border-b border-line py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-ink">Recent work</h2>
          <p className="mt-4 text-ink-soft">Real projects, real results.</p>
        </motion.div>
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.9, rotate: i % 2 === 0 ? -2 : 2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="rounded-lg border border-line bg-white p-8 shadow-sm"
            >
              <p className="font-mono text-xs uppercase tracking-wide text-automate">{project.client}</p>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-lg font-semibold text-ink">{project.title}</h3>
              <p className="mt-3 text-sm leading-6 text-ink-soft">{project.description}</p>
              <p className="mt-4 font-mono text-xs text-ink-soft">{project.stack}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}