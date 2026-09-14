"use client";

import { useState, useRef } from "react";
import ScrollFilm from "./ScrollFilm";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  RotateCcw,
  CornerDownRight,
  Check,
  Send,
} from "lucide-react";
import "./conversion-hero.css";

const businesses = [
  {
    label: "Dental practice",
    name: "Haven Dental",
    slug: "haven-dental",
    category: "DENTAL CARE",
    headline: "A little care.\nA healthier smile.",
    description:
      "Explore your options. Ask a question. Take the first step toward your next visit.",
    services: [
      "Routine cleaning",
      "Cosmetic consultation",
      "New patient visit",
    ],
    question: "Do you welcome new patients?",
    reply:
      "Yes. In this sample practice, new patients can request a first visit. Tell us your preferred day and the team will confirm availability.",
    action: "Request a visit",
    request: "Appointment inquiry",
    subject: "a visit",
    icon: "H",
    theme: "dental",
  },
  {
    label: "Salon & studio",
    name: "Forma Studio",
    slug: "forma-studio",
    category: "HAIR & BEAUTY",
    headline: "Your next look.\nYour kind of place.",
    description:
      "Find your service, ask about your first visit, and send the studio a request.",
    services: ["Cut & style", "Colour consultation", "First salon visit"],
    question: "Can I discuss a colour change first?",
    reply:
      "Absolutely. A consultation helps the stylist understand your starting point and the look you want. Choose a preferred day for the team to review.",
    action: "Request a consultation",
    request: "Consultation inquiry",
    subject: "a consultation",
    icon: "F",
    theme: "salon",
  },
  {
    label: "Home services",
    name: "Groundwork",
    slug: "groundwork",
    category: "HOME IMPROVEMENT",
    headline: "A better space.\nStarts with a plan.",
    description:
      "Explore the work, ask what’s possible, and request a conversation about your project.",
    services: ["Kitchen renovation", "Painting & finishing", "General repairs"],
    question: "Can I get a quote before committing?",
    reply:
      "Yes. A project discussion helps the team understand the scope before preparing a quote. Choose a preferred day to start the conversation.",
    action: "Request a project call",
    request: "Project inquiry",
    subject: "a project call",
    icon: "G",
    theme: "home",
  },
];

export default function ConversionHero() {
  const [view, setView] = useState<"film" | "demo">("film");
  const trackRef = useRef<HTMLDivElement>(null);
  const [industry, setIndustry] = useState(0);
  const [step, setStep] = useState(0);
  const [service, setService] = useState(0);
  const [day, setDay] = useState("Tuesday");
  const [period, setPeriod] = useState("Morning");
  const [complete, setComplete] = useState(false);
  const reduced = useReducedMotion();
  const business = businesses[industry];
  function reset(next = industry) {
    setIndustry(next);
    setStep(0);
    setService(0);
    setDay("Tuesday");
    setPeriod("Morning");
    setComplete(false);
  }
  function move(next: number) {
    setStep(next);
    setComplete(false);
  }
  return (
    <section className="conversion-hero" aria-labelledby="conversion-title">
      <div
        ref={trackRef}
        className={`conversion-scroll-track ${view === "film" ? "film-active" : ""}`}
      >
        <div
          className={`conversion-layout ${view === "film" ? "background-scene" : "demo-scene"}`}
        >
          {view === "film" && <ScrollFilm track={trackRef} />}
          <div className="conversion-copy">
            <div className="conversion-kicker">
              <span />
              WEBSITES + AI FOR SERVICE BUSINESSES
            </div>
            <h1 id="conversion-title">
              A slow website.
              <br />A missed question.
              <br />A lost customer.
              <br />
              <span>Let’s fix that.</span>
            </h1>
            <p>
              We build websites that explain what you sell, AI assistants that
              answer questions, and workflows that put new inquiries in your
              team’s hands.
            </p>
            <div className="conversion-actions">
              <Link href="/websites" className="conversion-primary">
                Explore the websites <ArrowUpRight size={18} />
              </Link>
              <Link href="/contact" className="conversion-secondary">
                Talk about your business <ArrowRight size={17} />
              </Link>
            </div>
            <button
              className="hero-demo-toggle"
              aria-expanded={view === "demo"}
              onClick={() => setView(view === "film" ? "demo" : "film")}
            >
              {view === "film"
                ? "Try the customer journey"
                : "Close customer demo"}{" "}
              <ArrowUpRight size={16} />
            </button>
            <div className="conversion-delivery">
              <span>Designed for your business.</span>
              <span>Set up by our team.</span>
            </div>
          </div>
          <div className="conversion-exhibit">
            {view === "demo" && (
              <>
                <div className="exhibit-heading">
                  <span className="exhibit-index">01—03</span>
                  <span>
                    DON’T TAKE OUR WORD FOR IT.
                    <br />
                    <strong>Be the customer.</strong>
                  </span>
                  <CornerDownRight size={25} strokeWidth={1.3} />
                </div>
                <div
                  className="industry-picker"
                  aria-label="Choose a demo business"
                >
                  {businesses.map((item, i) => (
                    <button
                      key={item.slug}
                      aria-pressed={industry === i}
                      onClick={() => reset(i)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <div className={`customer-demo demo-${business.theme}`}>
                  <div className="customer-demo-header">
                    <span className="customer-brand">
                      <span>{business.icon}</span>
                      {business.name}
                    </span>
                    <span className="customer-demo-label">
                      INTERACTIVE CONCEPT
                    </span>
                  </div>
                  <div
                    className="customer-screen"
                    aria-live="polite"
                    aria-atomic="false"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={`${industry}-${step}-${complete}`}
                        initial={reduced ? false : { opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={reduced ? undefined : { opacity: 0, x: -8 }}
                        transition={{ duration: 0.16 }}
                        className="customer-screen-content"
                      >
                        {step === 0 && (
                          <>
                            <div className="customer-category">
                              {business.category}
                            </div>
                            <h2>{business.headline}</h2>
                            <p>{business.description}</p>
                            <fieldset className="service-picker">
                              <legend>What brings you here?</legend>
                              {business.services.map((item, i) => (
                                <button
                                  key={item}
                                  aria-pressed={service === i}
                                  onClick={() => setService(i)}
                                >
                                  <span>{item}</span>
                                  <span className="service-radio">
                                    {service === i && <span />}
                                  </span>
                                </button>
                              ))}
                            </fieldset>
                            <button
                              className="customer-action"
                              onClick={() => move(1)}
                            >
                              Ask a question first <ArrowRight size={17} />
                            </button>
                          </>
                        )}
                        {step === 1 && (
                          <>
                            <div className="customer-category">
                              ANSWERS, BEFORE THE INQUIRY
                            </div>
                            <h2>
                              A question shouldn’t
                              <br />
                              be a dead end.
                            </h2>
                            <div className="customer-question">
                              <span>
                                YOU’RE EXPLORING · {business.services[service]}
                              </span>
                              <p>{business.question}</p>
                            </div>
                            <div className="customer-answer">
                              <div>
                                <span className="answer-mark">
                                  <Image
                                    src="/flowcraft-logo.png"
                                    alt="Flowcraft"
                                    width={17}
                                    height={18}
                                  />
                                </span>
                                <strong>{business.name} assistant</strong>
                              </div>
                              <p>{business.reply}</p>
                            </div>
                            <button
                              className="customer-action"
                              onClick={() => move(2)}
                            >
                              {business.action} <ArrowRight size={17} />
                            </button>
                            <button
                              className="customer-back"
                              onClick={() => move(0)}
                            >
                              <ArrowLeft size={13} /> Back to services
                            </button>
                          </>
                        )}
                        {step === 2 && !complete && (
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              setComplete(true);
                            }}
                          >
                            <div className="customer-category">
                              FROM INTEREST TO A CLEAR NEXT STEP
                            </div>
                            <h2>
                              Let’s find a time
                              <br />
                              to talk.
                            </h2>
                            <p>
                              Request {business.subject} about{" "}
                              <strong>
                                {business.services[service].toLowerCase()}
                              </strong>
                              . The team confirms the details.
                            </p>
                            <fieldset className="day-picker">
                              <legend>Preferred day</legend>
                              <div>
                                {["Tuesday", "Wednesday", "Thursday"].map(
                                  (item) => (
                                    <button
                                      type="button"
                                      key={item}
                                      aria-pressed={day === item}
                                      onClick={() => setDay(item)}
                                    >
                                      {item}
                                    </button>
                                  ),
                                )}
                              </div>
                            </fieldset>
                            <fieldset className="day-picker">
                              <legend>Time of day</legend>
                              <div>
                                {["Morning", "Afternoon"].map((item) => (
                                  <button
                                    type="button"
                                    key={item}
                                    aria-pressed={period === item}
                                    onClick={() => setPeriod(item)}
                                  >
                                    {item}
                                  </button>
                                ))}
                              </div>
                            </fieldset>
                            <button className="customer-action" type="submit">
                              Create sample inquiry <Send size={16} />
                            </button>
                            <span className="sample-assurance">
                              Sample preferences only. No personal details
                              needed.
                            </span>
                          </form>
                        )}
                        {step === 2 && complete && (
                          <>
                            <div className="customer-category">
                              READY FOR A HUMAN TO TAKE IT FROM HERE
                            </div>
                            <h2>
                              A conversation.
                              <br />
                              Worth following up.
                            </h2>
                            <div className="inquiry-receipt">
                              <div>
                                <span>{business.request}</span>
                                <Check size={19} />
                              </div>
                              <dl>
                                <div>
                                  <dt>Business</dt>
                                  <dd>{business.name}</dd>
                                </div>
                                <div>
                                  <dt>Interested in</dt>
                                  <dd>{business.services[service]}</dd>
                                </div>
                                <div>
                                  <dt>Preference</dt>
                                  <dd>
                                    {day} · {period.toLowerCase()}
                                  </dd>
                                </div>
                                <div>
                                  <dt>Next step</dt>
                                  <dd>Team reviews & confirms</dd>
                                </div>
                              </dl>
                            </div>
                            <p className="receipt-disclaimer">
                              That’s the experience. This sample stays in your
                              browser; nothing was sent or booked.
                            </p>
                            <Link
                              href={`/websites/${business.slug}`}
                              className="customer-action"
                            >
                              Explore this website <ArrowUpRight size={17} />
                            </Link>
                            <button
                              className="customer-back"
                              onClick={() => reset()}
                            >
                              <RotateCcw size={13} /> Try the journey again
                            </button>
                          </>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <nav className="customer-steps" aria-label="Demo journey">
                    {["Your website", "A useful answer", "A new inquiry"].map(
                      (item, i) => (
                        <button
                          key={item}
                          aria-current={step === i ? "step" : undefined}
                          onClick={() => move(i)}
                        >
                          <span>0{i + 1}</span>
                          {item}
                          <span
                            className="step-fill"
                            style={{
                              transform: `scaleX(${step >= i ? 1 : 0})`,
                            }}
                          />
                        </button>
                      ),
                    )}
                  </nav>
                </div>
                <div className="exhibit-footnote">
                  <span>Scripted example. No live bookings or messages.</span>
                  <button
                    onClick={() => reset()}
                    aria-label="Reset customer journey"
                  >
                    <RotateCcw size={13} /> Reset
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="conversion-baseline">
        <span>FLOWCRAFT / BUILT FOR THE NEXT INQUIRY</span>
        <a href="#solutions">
          Find the right setup for your business <span>↓</span>
        </a>
      </div>
    </section>
  );
}
