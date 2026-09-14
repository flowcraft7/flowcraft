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
  const sliderRef = useRef<HTMLInputElement>(null);
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
    const syncSlider = () => {
      if (sliderRef.current && Number.isFinite(video.duration))
        sliderRef.current.value = String(
          (video.currentTime / video.duration) * 100,
        );
    };
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
      syncSlider();
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
          /* Native controls remain available when autoplay is blocked. */
        });
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      configure();
    });
    observer.observe(video);
    const unsubscribe = scrollYProgress.on("change", seekProgress);
    video.addEventListener("loadeddata", configure);
    video.addEventListener("timeupdate", syncSlider);
    media.addEventListener("change", configure);
    configure();
    return () => {
      unsubscribe();
      observer.disconnect();
      media.removeEventListener("change", configure);
      video.removeEventListener("loadeddata", configure);
      video.removeEventListener("timeupdate", syncSlider);
      cancelAnimationFrame(frame);
      video.pause();
    };
  }, [scrollYProgress, reduced, paused]);

  return (
    <div className="hero-film">
      <div className="hero-film-top">
        <span>FLOWCRAFT IN MOTION</span>
        <span>01 / THE BUILD</span>
      </div>
      <div className="hero-film-picture">
        {failed ? (
          <div className="film-fallback">
            <p>The film couldn’t load.</p>
            <p>You can still explore the customer demo below.</p>
          </div>
        ) : (
          <video
            ref={videoRef}
            muted
            playsInline
            loop
            preload="auto"
            aria-label="Flowcraft website and automation film"
            onError={() => setFailed(true)}
          >
            <source src="/hero-video-scrub.mp4" type="video/mp4" />
          </video>
        )}
      </div>
      <div className="hero-film-controls">
        <div>
          <strong>Good systems move business forward.</strong>
          <span className="film-desktop-hint">
            Scroll to move through the film, or use the slider.
          </span>
          <span className="film-mobile-hint">
            A closer look at Flowcraft. Drag to explore the film.
          </span>
        </div>
        <button
          aria-label={paused ? "Resume hero video" : "Pause hero video"}
          aria-pressed={paused}
          onClick={() => setPaused(!paused)}
        >
          {paused ? <Play size={17} /> : <Pause size={17} />}
        </button>
      </div>
      <label className="film-seek">
        <span>Video progress</span>
        <input
          ref={sliderRef}
          type="range"
          min="0"
          max="100"
          step="0.1"
          defaultValue="0"
          disabled={failed}
          onChange={(event) => {
            const video = videoRef.current;
            if (video && Number.isFinite(video.duration)) {
              video.pause();
              setPaused(true);
              video.currentTime =
                (Number(event.target.value) / 100) *
                Math.max(0, video.duration - 0.04);
            }
          }}
        />
      </label>
    </div>
  );
}
