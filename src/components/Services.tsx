import { Gauge, Workflow, Bot } from "lucide-react";

const services = [
  {
    icon: Gauge,
    title: "Speed Rebuild",
    description: "Flowcraft builds new business sites and rebuilds slow, outdated ones for speed and automates the manual work behind them with AI and workflow automation.",
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
    <section className="border-b border-line py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-ink">What we do</h2>
          <p className="mt-4 text-ink-soft">Three ways we make your site faster and your business run smoother.</p>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="rounded-lg border border-line bg-white p-8">
              <service.icon className="h-8 w-8 text-signal" strokeWidth={1.5} />
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-semibold text-ink">{service.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}