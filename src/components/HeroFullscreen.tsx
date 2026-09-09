"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
const ease = [0.16, 1, 0.3, 1] as const;

export default function HeroFullscreen() {
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const isDesktop = window.matchMedia("(min-width: 768px)").matches;

    if (!isDesktop) {
      video.play().catch(() => {});
      return;
    }

    video.pause();
    let targetTime = 0;
    let currentTime = 0;
    let rafId: number;

    const unsubscribe = scrollYProgress.on("change", (progress) => {
      if (video.duration) {
        targetTime = progress * video.duration;
      }
    });

    const tick = () => {
      currentTime += (targetTime - currentTime) * 0.15;
      if (video.readyState >= 2 && Math.abs(video.currentTime - currentTime) > 0.03) {
        video.currentTime = currentTime;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      unsubscribe();
      cancelAnimationFrame(rafId);
    };
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="relative h-[220vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-between overflow-hidden bg-white">
        {/* Navbar */}
        <motion.nav
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease }}
          className="pointer-events-none fixed top-0 z-50 flex w-full items-center justify-between px-4 py-4 md:px-8 md:py-6"
        >
          <div className="pointer-events-auto flex items-center gap-3">
            <Image src="/logo.png" alt="Flowcraft" width={28} height={28} />
            <span className="hidden text-base font-medium tracking-tight text-ink md:inline">Flowcraft</span>

            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="ml-3 flex items-center gap-2 rounded-full bg-ink px-3 py-1.5"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
                  <Plus size={12} strokeWidth={3} className={`text-ink transition-transform ${menuOpen ? "rotate-45" : ""}`} />
                </span>
                <span className="text-[11px] text-white">Menu</span>
              </button>

              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute left-0 top-12 w-48 rounded-lg border border-line bg-white p-2 shadow-lg"
                >
                  {[
                    { label: "Ask Flowcraft", href: "#ask" },
                    { label: "Services", href: "#services" },
                    { label: "How It Works", href: "#process" },
                    { label: "Our Work", href: "#proof" },
                    { label: "Buy an Agent", href: "/agents" },
                    { label: "Book a Call", href: "#cta" },
                  ].map((item) => (
                    <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="block rounded-md px-3 py-2 text-sm text-ink hover:bg-paper">
                      {item.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </div>

            <Link href="/agents" className="ml-2 hidden items-center gap-2 rounded-full bg-signal px-4 py-2 text-[11px] font-medium text-white transition hover:bg-ink md:flex">
              Buy an Agent →
            </Link>
          </div>

          <div className="pointer-events-auto hidden items-center gap-2 rounded-full bg-[#F4F4F6] py-1.5 pl-4 pr-1.5 md:flex">
            <span className="text-[11px] text-ink-soft">Workflow Systems</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="2" cy="2" r="1.5" fill="white" />
                <circle cx="10" cy="2" r="1.5" fill="white" />
                <circle cx="2" cy="10" r="1.5" fill="white" />
                <circle cx="10" cy="10" r="1.5" fill="white" />
              </svg>
            </span>
          </div>
        </motion.nav>

        {/* Video (scroll-scrubbed on desktop, autoplay loop on mobile) */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <div className="h-[80%] w-[80%] overflow-hidden md:h-full md:w-full">
            <video ref={videoRef} muted loop playsInline preload="auto" className="h-full w-full object-cover">
              <source src="/hero-video-scrub.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Footer content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease }}
          className="relative z-30 flex flex-col gap-8 px-4 pb-10 pt-24 md:flex-row md:items-end md:justify-between md:px-8 md:pb-14"
          style={{ background: "linear-gradient(to top, #ffffff 0%, rgba(255,255,255,0.8) 50%, transparent 100%)" }}
        >
          <div>
            <motion.div
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease }}
              className="flex items-center gap-2"
            >
              <span className="h-2 w-2 rounded-full bg-black" />
              <span className="text-[13px] text-black/55">Fast, automated business websites</span>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease }}
              className="mt-3 font-light tracking-tight text-ink"
              style={{ fontSize: "clamp(2rem, 8vw, 4.5rem)", letterSpacing: "-0.03em", lineHeight: 1 }}
            >
              Your Website, Zero
              <br />
              Limits. Automated.
            </motion.h1>

            <motion.div
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0, ease }}
              className="mt-6 flex gap-3"
            >
              <a href="#services" className="rounded-full bg-ink px-5 py-2.5 text-[13px] text-white">
                See Services
              </a>
              <a href="#process" className="rounded-full border border-black/35 px-5 py-2.5 text-[13px] text-ink">
                How It Works
              </a>
            </motion.div>
          </div>

          <div className="flex gap-2">
            {["n8n", "AI Agents", "Automation"].map((tag) => (
              <span key={tag} className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-[11px] text-ink-soft">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}