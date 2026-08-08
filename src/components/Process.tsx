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
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-ink">How it works</h2>
          <p className="mt-4 text-ink-soft">Three steps, start to finish.</p>
        </div>
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-10 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number}>
              <span className="font-[family-name:var(--font-mono)] text-sm text-automate">{step.number}</span>
              <h3 className="mt-2 font-[family-name:var(--font-display)] text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}