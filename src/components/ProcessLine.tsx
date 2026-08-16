"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ProcessLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 50%"] });
  const left = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="absolute left-0 right-0 top-4 hidden h-0.5 bg-line sm:block">
      <motion.div style={{ left }} className="absolute -top-1.5 h-3 w-3 rounded-full bg-signal" />
    </div>
  );
}