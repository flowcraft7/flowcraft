type Project = {
  title: string;
  client: string;
  description: string;
  stack: string;
};

const projects: Project[] = [
  {
    title: "Maternal & Fetal Risk Prediction System",
    client: "Doc Poly Clinic — Digitalization Phase 1",
    description: "An AI-powered clinical tool that helps flag high-risk pregnancies earlier, using patient vitals and CTG data. Built as the first phase of a full digital transformation for the clinic.",
    stack: "React · FastAPI · Random Forest · XGBoost",
  },
  {
    title: "Full Stack Digitalization Platform",
    client: "Dental Clinic",
    description: "Built a full-stack digital platform for a dental clinic, including a voice assistant that lets patients book appointments by simply talking — no forms, no phone hold times.",
    stack: "Full Stack · Voice AI · Automation",
  },
];

export default function Proof() {
  return (
    <section id="proof" className="border-b border-line py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-ink">Recent work</h2>
          <p className="mt-4 text-ink-soft">Real projects, real results.</p>
        </div>
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2">
          {projects.map((project) => (
            <div key={project.title} className="rounded-lg border border-line bg-white p-8">
              <p className="font-mono text-xs uppercase tracking-wide text-automate">{project.client}</p>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-lg font-semibold text-ink">{project.title}</h3>
              <p className="mt-3 text-sm leading-6 text-ink-soft">{project.description}</p>
              <p className="mt-4 font-mono text-xs text-ink-soft">{project.stack}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}