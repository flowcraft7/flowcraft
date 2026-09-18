"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type FormEvent,
} from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Plus,
  Check,
  Menu,
  X,
  Globe,
  MessageSquare,
  Workflow,
  Play,
  Sparkles,
  Monitor,
  Smartphone,
  ChevronDown,
  RotateCcw,
  AudioLines,
  CheckCheck,
} from "lucide-react";
import { websites, agents, stories } from "@/lib/catalog";
import ChatAgentDemo from "@/components/ChatAgentDemo";
import "./studio.css";
import ConversionHero from "./ConversionHero";
import CinematicHero from "./CinematicHero";
import "./palette.css";

type Website = (typeof websites)[number];
type Story = (typeof stories)[number];
const money = (n: number) => `$${n.toLocaleString("en-US")}`;
function Mark() {
  return (
    <Image
      className="brand-mark"
      src="/flowcraft-logo.png"
      alt=""
      aria-hidden="true"
      width={668}
      height={701}
    />
  );
}
function Label({ children }: { children: ReactNode }) {
  return (
    <span className="eyebrow">
      <span />
      {children}
    </span>
  );
}
function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -35px 0px" }}
      transition={{ duration: 0.65 }}
    >
      {children}
    </motion.div>
  );
}
function Shell({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState(false);
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <div className={`studio${pathname === "/" ? " cinematic-home" : ""}`}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <motion.div className="reading-progress" style={{ scaleX: progress }} />
      <header className="site-header">
        <Link href="/" aria-label="Flowcraft home" className="brand">
          <Mark />
          flowcraft
        </Link>
        <nav
          aria-label="Main navigation"
          className={menu ? "main-nav open" : "main-nav"}
        >
          {[
            ["/websites", "Websites"],
            ["/agents", "AI Agents"],
            ["/solutions", "Solutions"],
            ["/case-studies", "Our work"],
            ["/pricing", "Pricing"],
            ["/about", "About"],
          ].map(([href, text]) => (
            <Link
              key={href}
              aria-current={
                pathname === href || pathname.startsWith(`${href}/`)
                  ? "page"
                  : undefined
              }
              onClick={() => setMenu(false)}
              href={href}
            >
              {text}
            </Link>
          ))}
        </nav>
        <Link className="button small dark header-cta" href="/contact">
          Let’s talk <ArrowUpRight size={15} />
        </Link>
        <button
          className="menu-toggle icon-button"
          aria-label={menu ? "Close menu" : "Open menu"}
          aria-expanded={menu}
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </button>
      </header>
      <main id="main">{children}</main>
      <footer className="site-footer">
        <div className="footer-top">
          <Link href="/" className="brand">
            <Mark />
            flowcraft
          </Link>
          <p>
            A little less busywork.
            <br />A lot more possibility.
          </p>
          <div>
            <Link href="/websites">
              Explore websites <ArrowUpRight size={14} />
            </Link>
            <Link href="/agents">
              Discover AI agents <ArrowUpRight size={14} />
            </Link>
            <Link href="/contact">
              Start a conversation <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
        <nav className="footer-page-links" aria-label="Explore Flowcraft">
          {[
            ["/solutions", "Solutions"],
            ["/case-studies", "Our work"],
            ["/pricing", "Pricing"],
            ["/demos", "Demo studio"],
            ["/process", "Our process"],
            ["/about", "About Flowcraft"],
            ["/faq", "FAQs"],
          ].map(([href, label]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Flowcraft</span>
          <span>Thoughtfully built. Human supported.</span>
          <a href="#main">Back to top ↑</a>
        </div>
        <div className="footer-word" aria-hidden="true">
          good things flow.
        </div>
      </footer>
    </div>
  );
}

function Solutions() {
  return (
    <section id="solutions" className="section-width section-space">
      <Reveal className="section-heading">
        <div>
          <Label>LESS FRICTION. MORE FORWARD.</Label>
          <h2>
            Big possibilities.
            <br />
            Clear starting points.
          </h2>
        </div>
        <p>
          Whether you’re opening your doors or ready for what’s next, there’s a
          way forward that fits.
        </p>
      </Reveal>
      <div className="solution-grid">
        {[
          {
            icon: Globe,
            title: "A website that feels like you.",
            desc: "Choose a starting point. We’ll make it yours, down to the last detail.",
            href: "/websites",
            link: "Explore the collection",
            num: "01",
          },
          {
            icon: Sparkles,
            title: "An extra pair of hands. Reimagined.",
            desc: "Give everyday questions and repetitive tasks a helpful new home.",
            href: "/agents",
            link: "Find your AI agent",
            num: "02",
          },
          {
            icon: Workflow,
            title: "Something a little more you?",
            desc: "Bring us the tricky problem. We’ll build the website or system around it.",
            href: "/contact",
            link: "Let’s build it together",
            num: "03",
          },
        ].map((s) => (
          <Reveal key={s.num} className="solution-card">
            <div className="solution-top">
              <s.icon size={24} strokeWidth={1.4} />
              <span>{s.num}</span>
            </div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <Link href={s.href}>
              {s.link}
              <ArrowUpRight size={18} />
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Preview({
  product,
  full = false,
  onAction,
}: {
  product: Website;
  full?: boolean;
  onAction?: () => void;
}) {
  return (
    <div
      className={`site-preview ${product.theme} ${full ? "full-preview" : ""}`}
    >
      <div className="preview-nav">
        <b>{product.mark}</b>
        <span>
          Our story &nbsp; Services &nbsp; <ArrowUpRight size={12} />
        </span>
      </div>
      <div className="preview-hero">
        <div className="preview-copy">
          <small>{product.eyebrow}</small>
          <h3>{product.headline}</h3>
          <p>{product.description}</p>
          {full ? (
            <button onClick={onAction} className="preview-cta">
              {product.action} <ArrowUpRight size={12} />
            </button>
          ) : (
            <span className="preview-cta">
              {product.action} <ArrowUpRight size={12} />
            </span>
          )}
        </div>
        <div className="preview-art" aria-hidden="true">
          <div className="art-circle" />
          <div className="art-vase" />
          <div className="art-stem stem-one" />
          <div className="art-stem stem-two" />
          <span className="art-caption">
            {product.theme === "haven"
              ? "care comes naturally"
              : product.theme === "forma"
                ? "a fresh perspective"
                : product.theme === "gather"
                  ? "a seat for everyone"
                  : "built with intention"}
          </span>
        </div>
      </div>
      <div className="preview-strip">
        <span>THOUGHTFULLY PERSONAL.</span>
        <span>A LITTLE EXTRA CARE. ↗</span>
      </div>
    </div>
  );
}
function WebsiteCard({ product }: { product: Website }) {
  return (
    <article className="website-card">
      <Link
        href={`/websites/${product.slug}`}
        className="preview-link"
        aria-label={`Preview ${product.name}`}
      >
        <Preview product={product} />
        <span className="preview-hover">
          Explore this website <ArrowUpRight size={17} />
        </span>
      </Link>
      <div className="website-card-info">
        <div>
          <span className="mono muted">{product.type}</span>
          <h3>
            <Link href={`/websites/${product.slug}`}>{product.name}</Link>
          </h3>
        </div>
        <div className="website-card-price">
          <small>Customized from</small>
          <strong>
            {money(product.price)} <ArrowUpRight size={17} />
          </strong>
        </div>
      </div>
    </article>
  );
}
function Collection({ store = false }: { store?: boolean }) {
  const [filter, setFilter] = useState("All websites");
  const rail = useRef<HTMLDivElement>(null);
  const filtered = websites.filter(
    (p) => filter === "All websites" || p.category === filter,
  );
  return (
    <section
      id="websites"
      className={`collection-section ${store ? "store-collection" : ""}`}
    >
      <div className="section-width">
        <Reveal className="section-heading">
          <div>
            <Label>THE WEBSITE COLLECTION</Label>
            <h2>
              A head start.
              <br />
              <span className="serif">Never a compromise.</span>
            </h2>
          </div>
          <div>
            <p>
              Distinctive by design. Customized for you.
              <br />
              Find the one that feels like your business.
            </p>
            {!store && (
              <Link className="inline-link" href="/websites">
                View all websites <ArrowUpRight size={17} />
              </Link>
            )}
          </div>
        </Reveal>
        <div className="collection-controls">
          <div className="filter-row" aria-label="Filter websites">
            {[
              "All websites",
              "Healthcare",
              "Beauty",
              "Services",
              "Hospitality",
            ].map((f) => (
              <button
                className={filter === f ? "selected" : ""}
                key={f}
                aria-pressed={filter === f}
                onClick={() => {
                  setFilter(f);
                  rail.current?.scrollTo({ left: 0 });
                }}
              >
                {f}
              </button>
            ))}
          </div>
          {!store && (
            <div className="rail-arrows">
              <button
                className="icon-button"
                aria-label="Previous websites"
                onClick={() =>
                  rail.current?.scrollBy({
                    left: -(rail.current.clientWidth * 0.65),
                    behavior: "smooth",
                  })
                }
              >
                <ArrowLeft size={18} />
              </button>
              <button
                className="icon-button"
                aria-label="Next websites"
                onClick={() =>
                  rail.current?.scrollBy({
                    left: rail.current.clientWidth * 0.65,
                    behavior: "smooth",
                  })
                }
              >
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
        <div
          ref={rail}
          className={store ? "website-grid" : "website-rail"}
          tabIndex={0}
          aria-label="Website collection"
        >
          {filtered.map((p) => (
            <WebsiteCard key={p.slug} product={p} />
          ))}
        </div>
        <div className="collection-caption">
          <span>
            <Check size={14} /> Responsive by default
          </span>
          <span>
            <Check size={14} /> Your brand, beautifully applied
          </span>
          <span>
            <Check size={14} /> Setup by our team
          </span>
        </div>
      </div>
    </section>
  );
}

const scenarios = {
  chat: [
    {
      question: "What services do you offer?",
      reply:
        "At Haven, our sample services include check-ups, cleaning, and cosmetic consultations. What would you like to explore?",
      result: "Visitor guided to the right service",
    },
    {
      question: "Can I request an appointment?",
      reply:
        "Of course. You can share your preferred day in the appointment form. The team will check availability and confirm with you.",
      result: "Visitor directed to an appointment request",
    },
    {
      question: "Can I speak to a person?",
      reply:
        "Absolutely. I’ll point you to the contact form so the practice team can help you directly.",
      result: "Human handoff offered",
    },
  ],
  voice: [
    {
      question: "Are you open on Saturday?",
      reply:
        "Thanks for calling our demo practice. Our sample Saturday hours are 9 to 1. Would you like to request a visit?",
      result: "Routine opening-hours question answered",
    },
    {
      question: "I’d like to book a cleaning.",
      reply:
        "I can help you start an appointment request. The practice team will confirm the time with you before anything is booked.",
      result: "Appointment inquiry ready for staff review",
    },
    {
      question: "I need your reception team.",
      reply:
        "Of course. During opening hours, your configured handoff would connect you to the team. This is a sample conversation only.",
      result: "Escalation path demonstrated",
    },
  ],
  workflow: [
    {
      question: "Run a new lead through the workflow",
      reply:
        "A sample inquiry arrives → the request is categorized → a task is created for the team → a confirmation is prepared.",
      result: "Four connected steps, one organized inquiry",
    },
    {
      question: "What if information is missing?",
      reply:
        "The workflow flags the missing information and prepares a follow-up for review. It waits for the required details before continuing.",
      result: "Incomplete inquiry held for review",
    },
    {
      question: "Show a human approval step",
      reply:
        "The suggested reply enters an approval queue. A team member checks it before the workflow sends anything.",
      result: "Human review remains in control",
    },
  ],
};
type AgentTab = keyof typeof scenarios;
function Playground() {
  const [tab, setTab] = useState<AgentTab>("chat");
  const [scenario, setScenario] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timeout.current) clearTimeout(timeout.current);
      if (typeof speechSynthesis !== "undefined") speechSynthesis.cancel();
    },
    [],
  );
  function reset(next: AgentTab) {
    if (timeout.current) clearTimeout(timeout.current);
    setTab(next);
    setScenario(null);
    setLoading(false);
    setSpeechError("");
    if (typeof speechSynthesis !== "undefined") speechSynthesis.cancel();
  }
  function run(i: number) {
    if (timeout.current) clearTimeout(timeout.current);
    setScenario(i);
    setLoading(true);
    timeout.current = setTimeout(() => setLoading(false), 700);
  }
  const sample = scenario === null ? null : scenarios[tab][scenario];
  const [speechError, setSpeechError] = useState("");
  function speak() {
    if (!sample) return;
    if (!("speechSynthesis" in window)) {
      setSpeechError(
        "Audio is unavailable in this browser. The full response is shown above.",
      );
      return;
    }
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(sample.reply);
    utterance.onerror = () =>
      setSpeechError("Audio could not play. You can read the response above.");
    speechSynthesis.speak(utterance);
  }
  return (
    <section id="playground" className="playground-section">
      <div className="section-width playground-grid">
        <Reveal className="playground-copy">
          <Label>SMALL TASKS. BIG BREATHING ROOM.</Label>
          <h2>
            Meet your new
            <br />
            <span className="serif">kind of teammate.</span>
          </h2>
          <p>
            Answer the everyday. Connect the dots. Keep things moving while you
            focus on what you do best.
          </p>
          <div className="agent-tabs" role="tablist" aria-label="Agent demo">
            {[
              { id: "chat", name: "Website assistant", Icon: MessageSquare },
              { id: "voice", name: "AI receptionist", Icon: AudioLines },
              { id: "workflow", name: "Workflow automation", Icon: Workflow },
            ].map(({ id, name, Icon }) => (
              <button
                key={id}
                id={`tab-${id}`}
                role="tab"
                aria-controls="agent-panel"
                aria-selected={tab === id}
                tabIndex={tab === id ? 0 : -1}
                className={tab === id ? "active" : ""}
                onClick={() => reset(id as AgentTab)}
                onKeyDown={(event) => {
                  const ids: AgentTab[] = ["chat", "voice", "workflow"];
                  const index = ids.indexOf(tab);
                  const target =
                    event.key === "Home"
                      ? 0
                      : event.key === "End"
                        ? 2
                        : ["ArrowRight", "ArrowDown"].includes(event.key)
                          ? (index + 1) % 3
                          : ["ArrowLeft", "ArrowUp"].includes(event.key)
                            ? (index + 2) % 3
                            : null;
                  if (target === null) return;
                  event.preventDefault();
                  reset(ids[target]);
                  document.getElementById(`tab-${ids[target]}`)?.focus();
                }}
              >
                <Icon size={19} />
                {name}
                <ArrowUpRight size={17} />
              </button>
            ))}
          </div>
          <Link href="/agents" className="inline-link light">
            Explore AI agents <ArrowUpRight size={17} />
          </Link>
        </Reveal>
        <div
          className="demo-console"
          role="tabpanel"
          id="agent-panel"
          aria-labelledby={`tab-${tab}`}
        >
          <div className="console-top">
            <span className="console-icon">
              <Sparkles size={20} />
            </span>
            <div>
              <strong>
                {tab === "workflow"
                  ? "Your connected workflow"
                  : "Haven’s helpful assistant"}
              </strong>
              <span>
                <i className="status-dot" /> Interactive sample · no live
                actions
              </span>
            </div>
            <button
              onClick={() => reset(tab)}
              className="icon-button"
              aria-label="Reset demo"
            >
              <RotateCcw size={16} />
            </button>
          </div>
          <div className="demo-conversation" aria-live="polite">
            <span className="conversation-date">
              A LITTLE PREVIEW OF WHAT’S POSSIBLE
            </span>
            <div className="bubble assistant">
              {tab === "workflow"
                ? "Let’s see how an inquiry can move through your business. Choose a scenario below."
                : "Hi there. I’m your demo assistant. Choose a question below and see how I can help."}
            </div>
            {sample && (
              <>
                <div className="bubble user">{sample.question}</div>
                <div className="bubble assistant">
                  {loading ? (
                    <span className="typing">
                      Thinking<span>...</span>
                    </span>
                  ) : (
                    sample.reply
                  )}
                </div>
                {!loading && (
                  <div className="demo-result">
                    <Check size={15} />
                    {sample.result}
                  </div>
                )}
              </>
            )}
            {sample && !loading && tab === "voice" && (
              <button className="listen-button" onClick={speak}>
                <AudioLines size={15} /> Listen to sample response
              </button>
            )}
            {speechError && <p className="fine-print">{speechError}</p>}
          </div>
          <div className="scenario-buttons">
            <span>TRY A SCENARIO</span>
            {scenarios[tab].map((s, i) => (
              <button
                disabled={loading}
                key={s.question}
                onClick={() => run(i)}
              >
                {s.question}
                <ArrowUpRight size={13} />
              </button>
            ))}
          </div>
          <div className="console-bottom">
            <span>Scripted sandbox. Real possibilities.</span>
            <Sparkles size={13} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="section-width section-space">
      <Reveal className="section-heading">
        <div>
          <Label>THE BIGGER PICTURE</Label>
          <h2>
            Good ideas.
            <br />
            Working together.
          </h2>
        </div>
        <p>
          See how a thoughtful website and useful automation can fit into a real
          business day.
        </p>
      </Reveal>
      <div className="story-grid">
        {stories.map((story, i) => (
          <Link
            className={`story-card story-${story.theme}`}
            href={`/case-studies/${story.slug}`}
            key={story.slug}
          >
            <div className="story-visual">
              <div className="story-browser">
                <Preview product={websites[i]} />
              </div>
              <div className="story-notification">
                <Check size={18} />
                <span>
                  {i === 0
                    ? "Appointment inquiry organized"
                    : "Service question answered"}
                  <small>One less interruption.</small>
                </span>
              </div>
              <span className="concept-tag">ILLUSTRATIVE CONCEPT</span>
            </div>
            <div className="story-info">
              <div>
                <span className="mono muted">{story.type} / WEBSITE + AI</span>
                <h3>{story.name}</h3>
              </div>
              <span className="circle-arrow">
                <ArrowUpRight size={20} />
              </span>
            </div>
          </Link>
        ))}
      </div>
      <p className="fine-print">
        These sample stories illustrate proposed workflows, not measured client
        outcomes.
      </p>
    </section>
  );
}
function Process() {
  return (
    <section id="process" className="process-section">
      <div className="section-width process-grid">
        <div className="process-sticky">
          <Label>FROM “WHAT IF” TO WHAT’S NEXT</Label>
          <h2>
            We make the
            <br />
            <span className="serif">next step easy.</span>
          </h2>
          <p>
            A real team. A clear process.
            <br />
            No figuring it all out on your own.
          </p>
          <a href="/contact" className="button dark">
            Start a conversation <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="process-steps">
          {[
            {
              n: "01",
              title: "Find your starting point.",
              desc: "Explore the collection, try an agent, or bring us an idea. We’ll help you choose the right fit.",
              tag: "EXPLORE & DISCOVER",
            },
            {
              n: "02",
              title: "Make it your own.",
              desc: "We agree the scope and pricing, then bring your brand, content, and business rules into the build.",
              tag: "CUSTOMIZE & CONNECT",
            },
            {
              n: "03",
              title: "Go live. Keep growing.",
              desc: "Review your setup with us, approve the launch, and choose the ongoing support your business needs.",
              tag: "LAUNCH & LOOK FORWARD",
            },
          ].map((p) => (
            <Reveal className="process-step" key={p.n}>
              <span className="step-number">{p.n}</span>
              <div>
                <span className="mono muted">{p.tag}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
function Pricing({ full = false }: { full?: boolean }) {
  return (
    <section id="pricing" className="section-width section-space">
      <div className="section-heading">
        <div>
          <Label>CLEAR STARTING POINTS</Label>
          <h2>
            A little investment.
            <br />A lot of possibility.
          </h2>
        </div>
        <p>
          Start with what you need. We’ll confirm the scope, running costs, and
          timeline before you commit.
        </p>
      </div>
      <div className="pricing-grid">
        {agents.map((a, i) => (
          <article
            className={`price-card ${i === 1 ? "featured" : ""}`}
            id={a.slug}
            key={a.slug}
          >
            <div className="price-label">
              {i === 1
                ? "FOR YOUR FRONT DESK"
                : i === 0
                  ? "FOR YOUR WEBSITE"
                  : "FOR YOUR EVERYDAY"}
            </div>
            <h3>{a.name}</h3>
            <p>{a.description}</p>
            <div className="price">
              <small>Setup from</small>
              <strong>{money(a.price)}</strong>
              <span>+ from {money(a.monthly)}/month</span>
            </div>
            <ul>
              {a.features.map((f) => (
                <li key={f}>
                  <Check size={15} />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href={`/contact?interest=${encodeURIComponent(a.name)}#cta`}
              className={`button ${i === 1 ? "dark" : "outline"}`}
            >
              Discuss this agent <ArrowUpRight size={16} />
            </a>
            {full && (
              <a className="price-demo" href="#playground">
                Try a sample scenario <Play size={12} />
              </a>
            )}
          </article>
        ))}
      </div>
      <p className="pricing-note">
        Indicative starting prices in USD. Usage allowances, phone numbers,
        third-party fees, integrations, and support are agreed in your proposal.
        No payment is taken here.
      </p>
    </section>
  );
}
const faqs = [
  [
    "Am I buying a template or a finished website?",
    "Our main offer is a finished website customized from your chosen design. We apply your branding and supplied content, configure the agreed features, and help you launch. Source-code-only requests can be scoped separately.",
  ],
  [
    "Can I try everything before I decide?",
    "You can explore all four website concepts and run the agent sample scenarios without signing up. Agent scenarios are scripted demonstrations; they do not book appointments, send messages, or connect to your business tools.",
  ],
  [
    "What’s included in the price?",
    "Website starting prices cover the listed pages, branding, supplied content, and one revision round. Extra pages, copywriting, hosting, domains, and ongoing support are quoted separately. Agent usage limits and third-party charges are confirmed in writing before setup.",
  ],
  [
    "How long does setup take?",
    "We confirm a delivery window after reviewing your content, chosen features, and integrations. You receive a clear scope and review steps before the project starts.",
  ],
  [
    "Can you work with my existing website?",
    "Yes. We can assess your existing site for improvements, add a compatible assistant, or scope a migration. Tell us what you already use in the project form.",
  ],
  [
    "Will a real person help me?",
    "Yes. Flowcraft handles scoping, setup, and handover. We also define where an agent should stop and refer a question to your team. Ongoing support options are agreed for your project.",
  ],
];
function FAQ() {
  return (
    <section className="section-width faq-section">
      <div>
        <Label>A FEW GOOD QUESTIONS</Label>
        <h2>Glad you asked.</h2>
        <p>
          Something else on your mind?
          <br />
          <a href="/contact" className="inline-link">
            Let’s talk <ArrowUpRight size={15} />
          </a>
        </p>
      </div>
      <div className="faq-list">
        {faqs.map(([q, a]) => (
          <details key={q}>
            <summary>
              {q}
              <Plus size={19} />
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
function Contact({
  initialInterest = "",
  standalone = false,
}: {
  initialInterest?: string;
  standalone?: boolean;
}) {
  const Heading = standalone ? "h1" : "h2";
  const [interest, setInterest] = useState(initialInterest);
  const [status, setStatus] = useState("idle");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus("loading");
    try {
      const response = await fetch("/api/book-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          message: `Interest: ${interest || "Let's explore"}\n${form.get("message")}`,
        }),
      });
      if (!response.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }
  return (
    <section id="cta" className="contact-section">
      <div className="section-width contact-grid">
        <div>
          <Label>LET’S MAKE SOMETHING GOOD</Label>
          <Heading>
            Your next chapter
            <br />
            looks <span className="serif">bright.</span>
          </Heading>
          <p>
            A website, an agent, or an idea you can’t stop thinking about. We’d
            love to hear it.
          </p>
          <div className="contact-note">
            <Mark />
            <span>
              Small team energy.
              <br />
              Big-picture thinking.
            </span>
          </div>
        </div>
        {status === "success" ? (
          <div className="success-panel" role="status">
            <CheckCheck size={35} />
            <h3>You’re on our list.</h3>
            <p>
              Your project inquiry has been received. We’ll follow up by email
              to discuss the next step.
            </p>
            <button
              className="button outline"
              onClick={() => setStatus("idle")}
            >
              Send another inquiry <ArrowUpRight size={16} />
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="contact-form">
            <div className="form-row">
              <label>
                Your name
                <input
                  name="name"
                  autoComplete="name"
                  required
                  placeholder="Alex Taylor"
                  maxLength={120}
                />
              </label>
              <label>
                Email address
                <input
                  name="email"
                  autoComplete="email"
                  type="email"
                  required
                  placeholder="alex@yourbusiness.com"
                  maxLength={254}
                />
              </label>
            </div>
            <label>
              I’m interested in
              <div className="select-wrap">
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                >
                  <option value="">Let’s explore the possibilities</option>
                  {[
                    "A website",
                    ...websites.map((w) => w.name),
                    ...agents.map((a) => a.name),
                    "A custom project",
                  ].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                  {interest &&
                    ![
                      "A website",
                      ...websites.map((w) => w.name),
                      ...agents.map((a) => a.name),
                      "A custom project",
                    ].includes(interest) && <option>{interest}</option>}
                </select>
                <ChevronDown size={15} />
              </div>
            </label>
            <label>
              A little about your project
              <textarea
                name="message"
                rows={3}
                maxLength={5000}
                required
                placeholder="What do you do, and what would you love to make easier?"
              />
            </label>
            <button className="button dark" disabled={status === "loading"}>
              {status === "loading"
                ? "Sending your inquiry…"
                : "Let’s start something"}
              <ArrowUpRight size={17} />
            </button>
            <p className="fine-print">
              A conversation first. No payment or commitment.
            </p>
            {status === "error" && (
              <p role="alert" className="form-error">
                We couldn’t send your inquiry. Your details are still
                here—please try again.
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
export function Home({ initialInterest = "" }: { initialInterest?: string }) {
  return (
    <Shell>
      <CinematicHero />
      <div className="principles-strip">
        <span>DESIGNED WITH INTENTION</span>
        <Plus size={13} />
        <span>BUILT AROUND YOUR BUSINESS</span>
        <Plus size={13} />
        <span>POWERED BY POSSIBILITY</span>
        <Plus size={13} />
        <span>SUPPORTED BY PEOPLE</span>
      </div>
      <Solutions />
      <Collection />
      <Playground />
      <Work />
      <Process />
      <Pricing />
      <FAQ />
      <Contact initialInterest={initialInterest} />
    </Shell>
  );
}
export function WebsiteStore() {
  return (
    <Shell>
      <section className="section-width page-intro">
        <Label>YOUR BUSINESS. BEAUTIFULLY ONLINE.</Label>
        <h1>
          Find your next
          <br />
          <span className="serif">digital home.</span>
        </h1>
        <p>
          Four distinctive starting points. Your brand, your content, and our
          team to bring it all together.
        </p>
      </section>
      <Collection store />
      <Process />
      <FAQ />
      <Contact initialInterest="A website" />
    </Shell>
  );
}
export function AgentStore() {
  return (
    <Shell>
      <section className="section-width page-intro">
        <Label>HELPFUL BY DESIGN</Label>
        <h1>
          Make room for
          <br />
          <span className="serif">your best work.</span>
        </h1>
        <p>
          Give everyday questions and repetitive tasks a capable first stop.
          Explore the demos, then let’s tailor the right setup.
        </p>
        <a href="#playground" className="button dark">
          Try the demos <Play size={15} />
        </a>
      </section>
      <Playground />
      <section className="section-width live-chat-section">
        <details className="live-chat-disclosure">
          <summary>
            <span>
              <Sparkles size={18} /> Want to ask your own question?
            </span>
            <span>
              Try the live AI chat <Plus size={17} />
            </span>
          </summary>
          <div className="live-chat-content">
            <div>
              <Label>LIVE AI · FICTIONAL SALON</Label>
              <h3>A conversation of your own.</h3>
              <p>
                Meet Bella’s Salon assistant, powered by our live chat
                integration. Ask about a salon visit and explore a natural
                conversation.
              </p>
              <p className="fine-print">
                Messages are processed by our AI provider. Use sample questions
                without personal details. No bookings are made. Availability
                depends on the live service.
              </p>
            </div>
            <ChatAgentDemo />
          </div>
        </details>
      </section>
      <Pricing full />
      <Process />
      <FAQ />
      <Contact />
    </Shell>
  );
}

export function WebsiteProduct({ product }: { product: Website }) {
  const [device, setDevice] = useState("desktop");
  const [sent, setSent] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <Shell>
      <div className="section-width product-page">
        <Link href="/websites" className="inline-link">
          <ArrowLeft size={15} /> Back to the collection
        </Link>
        <div className="product-header">
          <div>
            <Label>{product.type.toUpperCase()}</Label>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
          </div>
          <div className="device-toggle" aria-label="Preview size">
            <button
              aria-pressed={device === "desktop"}
              onClick={() => setDevice("desktop")}
            >
              <Monitor size={17} />
              Desktop
            </button>
            <button
              aria-pressed={device === "mobile"}
              onClick={() => setDevice("mobile")}
            >
              <Smartphone size={17} />
              Mobile
            </button>
          </div>
        </div>
        <div className="product-layout">
          <div className="demo-frame">
            <div className="demo-frame-bar">
              <span className="status-dot" /> INTERACTIVE WEBSITE CONCEPT
              <span>
                FLOWCRAFT COLLECTION / 0
                {websites.findIndex((item) => item.slug === product.slug) + 1}
              </span>
            </div>
            <div className={`preview-device ${device}`}>
              <Preview
                product={product}
                full
                onAction={() => {
                  setSent(false);
                  dialog.current?.showModal();
                }}
              />
              <div className={`demo-below ${product.theme}`}>
                <Label>A THOUGHTFUL EXPERIENCE</Label>
                <h3>
                  It’s the little things
                  <br />
                  that make the difference.
                </h3>
                <div className="demo-features">
                  {product.features.slice(0, 3).map((f, i) => (
                    <div key={f}>
                      <span>0{i + 1}</span>
                      <h4>{f}</h4>
                      <p>
                        Carefully considered, from your first visit to your next
                        step.
                      </p>
                    </div>
                  ))}
                </div>
                <button
                  className="button dark"
                  onClick={() => {
                    setSent(false);
                    dialog.current?.showModal();
                  }}
                >
                  {product.action}
                  <ArrowUpRight size={16} />
                </button>
                <p className="fine-print">
                  Fictional business · Sample content · No real bookings
                </p>
              </div>
            </div>
          </div>
          <aside className="product-aside">
            <Label>MAKE IT YOURS</Label>
            <h3>
              A considered start.
              <br />A personal finish.
            </h3>
            <div className="product-price">
              <small>Customized website from</small>
              <strong>{money(product.price)}</strong>
              <span>USD · one-time project fee</span>
            </div>
            <ul>
              {product.features.map((f) => (
                <li key={f}>
                  <Check size={16} />
                  {f}
                </li>
              ))}
            </ul>
            <a
              className="button dark"
              href={`/contact?interest=${encodeURIComponent(product.name)}#cta`}
            >
              Request this website <ArrowUpRight size={16} />
            </a>
            <p className="fine-print">
              We confirm your scope and quote before payment.
            </p>
            <details open>
              <summary>
                What’s included <Plus size={15} />
              </summary>
              <p>
                {product.pages}. Your branding and supplied content, responsive
                layout, and one revision round.
              </p>
            </details>
            <details>
              <summary>
                Hosting & ownership <Plus size={15} />
              </summary>
              <p>
                Domain, hosting, extra pages, and ongoing maintenance are quoted
                separately. Ownership and handover terms are agreed in your
                proposal.
              </p>
            </details>
            <details>
              <summary>
                Delivery & customization <Plus size={15} />
              </summary>
              <p>
                We confirm timing after reviewing your content. Additional
                features and integrations are scoped before work begins.
              </p>
            </details>
          </aside>
        </div>
      </div>
      <dialog
        ref={dialog}
        className="sample-dialog"
        aria-labelledby="sample-dialog-heading"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <button
          autoFocus
          className="icon-button dialog-close"
          aria-label="Close sample form"
          onClick={() => dialog.current?.close()}
        >
          <X size={20} />
        </button>
        <Label>INTERACTIVE SAMPLE</Label>
        <h2 id="sample-dialog-heading">
          {sent ? "That’s how it could feel." : "Let’s make a little plan."}
        </h2>
        {sent ? (
          <>
            <p role="status">
              Your sample request is complete. No information was sent or saved,
              and no appointment was booked.
            </p>
            <button
              className="button dark"
              onClick={() => dialog.current?.close()}
            >
              Back to the website <ArrowRight size={16} />
            </button>
          </>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <p>
              Try the inquiry experience with fictional details. This form is a
              demonstration only.
            </p>
            <label>
              Sample name
              <input required placeholder="Alex Example" />
            </label>
            <label>
              Preferred day
              <input type="date" required />
            </label>
            <button className="button dark">
              Try sample request <ArrowUpRight size={16} />
            </button>
          </form>
        )}
      </dialog>
      <Contact initialInterest={product.name} />
    </Shell>
  );
}
export function StoryPage({ story }: { story: Story }) {
  return (
    <Shell>
      <article className="section-width story-page">
        <Link href="/case-studies" className="inline-link">
          <ArrowLeft size={16} /> Back to our work
        </Link>
        <Label>{story.type} · ILLUSTRATIVE CONCEPT</Label>
        <h1>{story.title}</h1>
        <p className="story-disclaimer">
          A proposed use case using fictional business details. This is not a
          client testimonial or a claim of measured results.
        </p>
        <div className="story-detail-grid">
          <Preview product={websites[story.theme === "haven" ? 0 : 1]} />
          <div>
            <Label>THE CONNECTED EXPERIENCE</Label>
            {story.steps.map((step, i) => (
              <div className="story-step" key={step}>
                <span>0{i + 1}</span>
                {step}
                <Check size={15} />
              </div>
            ))}
          </div>
        </div>
        {[
          ["The everyday challenge", story.problem],
          ["A thoughtful approach", story.solution],
          ["The intended experience", story.outcome],
        ].map(([title, desc]) => (
          <section className="story-paragraph" key={title}>
            <h2>{title}</h2>
            <p>{desc}</p>
          </section>
        ))}
      </article>
      <Contact initialInterest="A custom project" />
    </Shell>
  );
}

function PageIntro({
  label,
  title,
  accent,
  description,
}: {
  label: string;
  title: string;
  accent: string;
  description: string;
}) {
  return (
    <section className="section-width page-intro">
      <Label>{label}</Label>
      <h1>
        {title}
        <br />
        <span className="serif">{accent}</span>
      </h1>
      <p>{description}</p>
    </section>
  );
}

export function SolutionsPage() {
  return (
    <Shell>
      <PageIntro
        label="BUILT AROUND THE WAY YOU WORK"
        title="Your business."
        accent="A better connected day."
        description="Find the right combination of a website, helpful AI, and connected workflows for the work in front of you."
      />
      <Solutions />
      <section className="section-width dedicated-section">
        <Label>START WITH YOUR EVERYDAY</Label>
        <div className="industry-paths">
          {[
            {
              name: "Practices & clinics",
              text: "Help visitors understand your services and send appointment inquiries for your team to confirm.",
              website: "haven-dental",
              agent: "AI Receptionist",
            },
            {
              name: "Salons & studios",
              text: "Show your personality, make your services easy to explore, and answer routine questions between appointments.",
              website: "forma-studio",
              agent: "Website Assistant",
            },
            {
              name: "Local service businesses",
              text: "Showcase your work, capture clearer quote requests, and organize follow-up for your team.",
              website: "groundwork",
              agent: "Workflow Automation",
            },
          ].map((item, index) => (
            <article key={item.name}>
              <span className="industry-number">0{index + 1}</span>
              <div>
                <h2>{item.name}</h2>
                <p>{item.text}</p>
                <div className="button-row">
                  <Link
                    className="inline-link"
                    href={`/websites/${item.website}`}
                  >
                    Explore the website <ArrowUpRight size={16} />
                  </Link>
                  <Link
                    className="inline-link"
                    href={`/contact?interest=${encodeURIComponent(item.agent)}`}
                  >
                    Discuss the setup <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Contact initialInterest="A custom project" />
    </Shell>
  );
}

export function WorkPage() {
  return (
    <Shell>
      <PageIntro
        label="WEBSITES + USEFUL AUTOMATION"
        title="See the pieces."
        accent="Picture the possibility."
        description="Explore two illustrative business workflows, then try the websites and agent scenarios behind them. Sample stories are clearly labeled until approved client stories are ready."
      />
      <Work />
      <section className="section-width page-next">
        <div>
          <Label>EXPLORE IT YOURSELF</Label>
          <h2>From a story to a demo.</h2>
        </div>
        <Link href="/demos" className="button dark">
          Enter the demo studio <ArrowUpRight size={17} />
        </Link>
      </section>
    </Shell>
  );
}

export function PricingPage() {
  return (
    <Shell>
      <PageIntro
        label="A CLEAR START, BEFORE YOU COMMIT"
        title="Good work."
        accent="Clear expectations."
        description="Explore starting prices for customized websites and AI setup. Your proposal confirms the exact scope, usage costs, and support before work begins."
      />
      <section className="section-width website-pricing-feature">
        <div>
          <Label>WEBSITE COLLECTION</Label>
          <h2>
            Your brand.
            <br />
            Your digital home.
          </h2>
          <p>
            Choose a design and we’ll apply your brand and supplied content,
            with the listed pages and one revision round.
          </p>
          <Link href="/websites" className="inline-link">
            Compare the collection <ArrowUpRight size={17} />
          </Link>
        </div>
        <div>
          <span className="price-kicker">Customized websites from</span>
          <strong>$599</strong>
          <p>USD · one-time project fee</p>
          <p className="fine-print">
            Domain, hosting, extra pages, and ongoing support quoted separately.
          </p>
        </div>
      </section>
      <Pricing />
      <FAQ />
      <Contact />
    </Shell>
  );
}

export function AboutPage() {
  return (
    <Shell>
      <section className="section-width about-intro">
        <div>
          <Label>THE PEOPLE BEHIND YOUR NEXT CHAPTER</Label>
          <h1>
            Thoughtful design.
            <br />
            <span className="serif">Practical intelligence.</span>
          </h1>
          <p>
            Flowcraft brings websites and AI automation together around one
            idea: technology should make running your business feel easier.
          </p>
          <Link href="/contact" className="button dark">
            Meet your next project partner <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="brand-showcase">
          <Image
            src="/flowcraft-logo.png"
            alt="Flowcraft logo"
            width={668}
            height={701}
            priority
          />
          <span>flowcraft</span>
          <p>DESIGN. CONNECT. MOVE FORWARD.</p>
        </div>
      </section>
      <section className="section-width about-principles">
        <Label>WHAT WE CARE ABOUT</Label>
        {[
          [
            "Make it feel like you.",
            "Your website should express your business clearly. We start with your audience, your personality, and what your visitors need to do.",
          ],
          [
            "Make it useful every day.",
            "AI earns its place by helping with a specific task. We focus on clear answers, organized inquiries, and workflows your team can understand.",
          ],
          [
            "Keep people in the picture.",
            "We define the handover, agree the scope, and make room for human review where it matters. Your team stays part of the process.",
          ],
        ].map(([title, text]) => (
          <article key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>
      <section className="section-width page-next">
        <div>
          <Label>LET’S GET TO KNOW EACH OTHER</Label>
          <h2>
            Bring the idea.
            <br />
            We’ll find the starting point.
          </h2>
        </div>
        <Link className="button dark" href="/contact">
          Start a conversation <ArrowUpRight size={17} />
        </Link>
      </section>
    </Shell>
  );
}

export function ContactPage({
  initialInterest = "",
}: {
  initialInterest?: string;
}) {
  return (
    <Shell>
      <div className="contact-page">
        <Contact
          key={initialInterest}
          initialInterest={initialInterest}
          standalone
        />
      </div>
      <section className="section-width contact-expectations">
        <Label>WHAT HAPPENS NEXT</Label>
        <div>
          <article>
            <span>01</span>
            <h2>We read your brief.</h2>
            <p>
              Tell us what you do, what you need, and what you already have.
            </p>
          </article>
          <article>
            <span>02</span>
            <h2>We explore the fit.</h2>
            <p>
              We follow up by email to discuss the right approach and any open
              questions.
            </p>
          </article>
          <article>
            <span>03</span>
            <h2>You get a clear scope.</h2>
            <p>We agree the work, price, and next steps before you commit.</p>
          </article>
        </div>
      </section>
    </Shell>
  );
}

export function ProcessPage() {
  return (
    <Shell>
      <PageIntro
        label="A CLEAR PATH FROM IDEA TO LAUNCH"
        title="One step at a time."
        accent="Together all the way."
        description="Know what happens next, what we need from you, and when you get to review the work."
      />
      <Process />
      <section className="section-width page-next">
        <div>
          <Label>MAKE A STRONG START</Label>
          <h2>
            Your brand, content,
            <br />
            and one good conversation.
          </h2>
          <p>
            Have your existing website, service details, branding, and any
            integration requirements handy. We’ll work through the rest
            together.
          </p>
        </div>
        <Link className="button dark" href="/contact">
          Tell us about your project <ArrowUpRight size={17} />
        </Link>
      </section>
    </Shell>
  );
}

export function FAQPage() {
  return (
    <Shell>
      <PageIntro
        label="THE DETAILS, UP FRONT"
        title="A little clarity."
        accent="A confident next step."
        description="Answers about websites, demos, pricing, delivery, and the people supporting your setup."
      />
      <FAQ />
      <section className="section-width page-next">
        <h2>Still curious about something?</h2>
        <Link className="button dark" href="/contact">
          Ask our team <ArrowUpRight size={17} />
        </Link>
      </section>
    </Shell>
  );
}

export function DemosPage() {
  return (
    <Shell>
      <PageIntro
        label="THE FLOWCRAFT DEMO STUDIO"
        title="Less imagining."
        accent="More exploring."
        description="Browse the website concepts and try the agent scenarios. No signup required. Sample interactions don’t make real bookings or contact anyone."
      />
      <ConversionHero demoOnly />
      <Playground />
      <Collection store />
      <section className="section-width page-next">
        <h2>Found a good fit?</h2>
        <Link className="button dark" href="/contact">
          Make it yours <ArrowUpRight size={17} />
        </Link>
      </section>
    </Shell>
  );
}
