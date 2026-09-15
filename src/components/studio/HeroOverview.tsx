"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowDown, Check, Globe, MessageCircle, Workflow } from "lucide-react";
import "./hero-overview.css";

const offers = [
  { title: "Websites", caption: "Make a great first impression.", href: "/websites", icon: Globe },
  { title: "AI assistants", caption: "Turn questions into conversations.", href: "/agents", icon: MessageCircle },
  { title: "Automation", caption: "Keep every inquiry moving.", href: "/solutions", icon: Workflow },
];

export default function HeroOverview() {
  const [active, setActive] = useState(0);
  const offer = offers[active];
  return <div className="offer-overview">
    <div className="offer-navigation" aria-label="Explore what Flowcraft builds">
      {offers.map(({ title, icon: Icon }, i) => <button key={title} aria-pressed={active === i} onClick={() => setActive(i)}><Icon size={17} /><span>{title}</span></button>)}
    </div>
    <div className={`offer-stage offer-stage-${active}`}>
      {active === 0 && <div className="hero-site-concept">
        <div className="hero-site-nav"><strong>forma.</strong><span>Hair, with feeling.</span><ArrowUpRight size={20} /></div>
        <div className="hero-site-body"><div><span className="offer-eyebrow">SALON & STUDIO</span><h2>A fresh<br />perspective.</h2><Link href="/websites/forma-studio">Explore this design <ArrowUpRight size={15} /></Link></div><div className="hero-sculpture" aria-hidden="true"><i /><i /><i /><span>f.</span></div></div>
        <div className="hero-site-footer"><span>01 / CUT</span><span>02 / COLOUR</span><span>03 / STYLE</span></div>
      </div>}
      {active === 1 && <div className="hero-chat-concept"><div className="hero-chat-title"><MessageCircle size={22} /><div><strong>Your website assistant</strong><span>Answers from your business</span></div></div><div className="hero-chat-question">Can I book a colour consultation?</div><div className="hero-chat-answer">Of course. Let’s find a time that suits you.</div><div className="hero-chat-options"><span>Choose a day</span><span>Ask another question</span></div><div className="hero-chat-note"><Check size={16} /> A clear next step for your visitor.</div></div>}
      {active === 2 && <div className="hero-workflow-concept"><div><MessageCircle /><span>New website inquiry</span></div><ArrowDown /><div><Workflow /><span>Organize the details</span></div><ArrowDown /><div><Check /><span>Notify your team</span></div></div>}
      <span className="offer-concept-label">ILLUSTRATIVE DESIGN</span>
    </div>
    <div className="offer-caption" aria-live="polite"><span>{offer.caption}</span><Link href={offer.href}>Explore {offer.title.toLowerCase()} <ArrowUpRight size={17} /></Link></div>
  </div>;
}
