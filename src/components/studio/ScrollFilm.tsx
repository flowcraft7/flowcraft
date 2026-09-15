"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { useReducedMotion, useScroll } from "framer-motion";
import { Pause, Play } from "lucide-react";

export default function ScrollFilm({
  track,
}: {
  track: RefObject<HTMLDivElement | null>;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const reduced = useReducedMotion();
  const [failed, setFailed] = useState(false);
  const [paused, setPaused] = useState(false);
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const media = window.matchMedia(
      "(min-width: 1000px) and (min-height: 650px)",
    );
    let frame = 0;
    let target = 0;
    let visible = true;
    const isScrub = () => media.matches && !reduced && !paused;
    const tick = () => {
      frame = 0;
      if (
        !visible ||
        !isScrub() ||
        video.readyState < 2 ||
        !Number.isFinite(video.duration)
      )
        return;
      const delta = target - video.currentTime;
      if (Math.abs(delta) > 0.04 && !video.seeking)
        video.currentTime += delta * 0.25;

      if (Math.abs(delta) > 0.04) frame = requestAnimationFrame(tick);
    };
    const seekProgress = () => {
      if (!isScrub() || !Number.isFinite(video.duration)) return;
      target = Math.min(
        video.duration - 0.04,
        Math.max(0, scrollYProgress.get() * video.duration),
      );
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const configure = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (reduced || paused || !visible) video.pause();
      else if (media.matches) {
        video.pause();
        seekProgress();
      } else
        video.play().catch(() => {
          /* Keep a still background when autoplay is blocked. */
        });
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      configure();
    });
    observer.observe(video);
    const unsubscribe = scrollYProgress.on("change", seekProgress);
    video.addEventListener("loadeddata", configure);

    media.addEventListener("change", configure);
    configure();
    return () => {
      unsubscribe();
      observer.disconnect();
      media.removeEventListener("change", configure);
      video.removeEventListener("loadeddata", configure);
      cancelAnimationFrame(frame);
      video.pause();
    };
  }, [scrollYProgress, reduced, paused]);

  return (
    <div className="hero-background-film">
      {!failed && (
        <video
          ref={videoRef}
          muted
          playsInline
          loop
          preload="auto"
          aria-hidden="true"
          onError={() => setFailed(true)}
        >
          <source src="/hero-video-scrub.mp4" type="video/mp4" />
        </video>
      )}
      {!failed && (
        <button
          className="background-motion-toggle"
          aria-label={
            paused
              ? "Resume background animation"
              : "Pause background animation"
          }
          aria-pressed={paused}
          onClick={() => setPaused(!paused)}
        >
          {paused ? <Play size={14} /> : <Pause size={14} />}
          <span>{paused ? "Resume motion" : "Pause motion"}</span>
        </button>
      )}
    </div>
  );
}
