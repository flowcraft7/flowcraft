export default function CTA() {
  return (
    <section id="cta" className="py-24">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-ink">Ready for a faster site?</h2>
        <p className="mt-4 text-ink-soft">
          Book a free 15-minute audit — we'll show you exactly what's slowing your site down and what to automate.
        </p>
        <div className="mt-8">
          <a href="https://calendly.com/farazshoukat1/30min" className="inline-block rounded-md bg-ink px-8 py-3 font-medium text-paper transition hover:bg-signal">
            Book a free audit
          </a>
        </div>
      </div>
    </section>
  );
}