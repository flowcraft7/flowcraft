export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row lg:px-8">
        <span className="font-[family-name:var(--font-display)] text-sm font-semibold text-ink">Flowcraft</span>
        <p className="font-mono text-xs text-ink-soft">
          © {new Date().getFullYear()} Flowcraft. Fast, automated websites.
        </p>
        <a href="https://linkedin.com/company/flowcraft7" target="_blank" rel="noopener noreferrer" className="text-sm text-ink-soft hover:text-ink">
          LinkedIn
        </a>
      </div>
    </footer>
  );
}