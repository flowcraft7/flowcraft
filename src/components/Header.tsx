export default function Header() {
  return (
    <header className="border-b border-line bg-paper/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Flowcraft" width={28} height={28} />
          <span className="font-[family-name:var(--font-display)] text-lg font-semibold text-ink">Flowcraft</span>
        </div>
        <nav className="hidden items-center gap-8 sm:flex">
          <a href="#services" className="text-sm text-ink-soft hover:text-ink">Services</a>
          <a href="#proof" className="text-sm text-ink-soft hover:text-ink">Work</a>
          <a href="#process" className="text-sm text-ink-soft hover:text-ink">Process</a>
        </nav>
        <a href="https://calendly.com/farazshoukat1/30min" className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-paper transition hover:bg-signal">
          Book a call
        </a>
      </div>
    </header>
  );
}