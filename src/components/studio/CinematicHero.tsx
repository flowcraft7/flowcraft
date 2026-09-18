"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import "./cinematic-hero.css";

export default function CinematicHero() {
  const sceneRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let cancelled = false;
    let dispose: (() => void) | undefined;
    const host = sceneRef.current;
    if (!host) return;
    // Keep the 3D library out of the initial page bundle and initialize after mount.
    import("@/lib/conveyor-scene").then(({ mountConveyor }) => {
      if (!cancelled) dispose = mountConveyor(host);
    }).catch(() => { if (!cancelled) host.dataset.unavailable = "true"; });
    return () => { cancelled = true; dispose?.(); };
  }, []);

  return (
    <section className="fc-cinematic" aria-labelledby="fc-hero-title">
      <div ref={sceneRef} className="fc-scene" aria-hidden="true" />
      <div className="fc-scene-shade" aria-hidden="true" />
      <div className="fc-copy">
        <p className="fc-eyebrow">YOUR NEXT STAGE, AUTOMATED.</p>
        <h1 id="fc-hero-title">Stop building<br />services.<br />Start building<br /><em>systems.</em></h1>
        <p className="fc-intro">AI that answers. Workflows that connect.<br />Software that keeps working when you don’t.</p>
        <div className="fc-actions">
          <Link className="fc-buy-primary" href="/websites">Buy your dream website <ArrowUpRight size={17} /></Link>
          <Link className="fc-buy-secondary" href="/agents">Buy your own agent <ArrowUpRight size={17} /></Link>
        </div>
        <p className="fc-expertise">AI AUTOMATION <span>/</span> VOICE AGENTS <span>/</span> SOFTWARE</p>
      </div>
      <p className="fc-status">INCOMING WORK → CONNECTED SYSTEM</p>
      <div className="fc-baseline"><span>LESS REPETITION. MORE POSSIBILITY.</span><Link href="/demos">Explore the demos <ArrowUpRight size={14} /></Link></div>
    </section>
  );
}
