export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="mx-auto max-w-7xl px-6 pt-32 pb-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-sm tracking-wide text-automate">
            FLOWCRAFT
          </p>
          <h1 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-ink sm:text-6xl sm:leading-[1.1]">
            Your website is losing customers
            <br />
            before they see what you sell.
          </h1>
          <p className="mt-6 text-lg leading-8 text-ink-soft">
            Flowcraft builds new business sites and rebuilds slow, outdated ones for speed —
and automates the manual work behind them with AI and workflow automation.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <a href="#cta" className="rounded-md bg-ink px-6 py-3 font-medium text-paper transition hover:bg-signal">
              Book a free audit
            </a>
            <a href="#proof" className="text-sm font-medium text-ink-soft hover:text-ink">
              See the work →
            </a>
          </div>
        </div>
        {/* Speed comparison strip */}
        <div className="mx-auto mt-20 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-line bg-white p-6">
            <p className="font-mono text-xs uppercase tracking-wide text-ink-soft">
              Before
            </p>
            <p className="mt-3 font-[family-name:var(--font-mono)] text-3xl font-medium text-ink">
              4.8s
            </p>
            <p className="mt-1 text-sm text-ink-soft">Average load time</p>
          </div>
          <div className="rounded-lg border border-signal bg-signal-dim p-6">
            <p className="font-mono text-xs uppercase tracking-wide text-signal">
              After
            </p>
            <p className="mt-3 font-[family-name:var(--font-mono)] text-3xl font-medium text-ink">
              0.6s
            </p>
            <p className="mt-1 text-sm text-ink-soft">Average load time</p>
          </div>
        </div>
      </div>
    </section>
  );
}