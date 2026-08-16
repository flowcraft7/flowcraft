"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function RobotMascot() {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const armWave = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3], [0, -20, 20, 0]);

  return (
    <motion.div
      className="pointer-events-none fixed bottom-6 right-6 z-40 hidden lg:block"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.svg width="64" height="72" viewBox="0 0 64 72" style={{ rotate }}>
        {/* antenna */}
        <motion.circle
          cx="32" cy="6" r="3" fill="#0E9F6E"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
        <line x1="32" y1="9" x2="32" y2="16" stroke="#1B1E1F" strokeWidth="2" />

        {/* head */}
        <rect x="14" y="16" width="36" height="26" rx="8" fill="#1B1E1F" />
        <circle cx="25" cy="29" r="3.5" fill="white" />
        <circle cx="39" cy="29" r="3.5" fill="white" />
        <path d="M 24 36 Q 32 40 40 36" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* body */}
        <rect x="18" y="44" width="28" height="22" rx="6" fill="#F5F6F3" stroke="#1B1E1F" strokeWidth="2" />
        <rect x="26" y="50" width="12" height="10" rx="2" fill="#0E9F6E" />

        {/* arms */}
        <motion.line
          x1="18" y1="50" x2="8" y2="46"
          stroke="#1B1E1F" strokeWidth="3" strokeLinecap="round"
          style={{ rotate: armWave, originX: "18px", originY: "50px" }}
        />
        <line x1="46" y1="50" x2="56" y2="46" stroke="#1B1E1F" strokeWidth="3" strokeLinecap="round" />
      </motion.svg>
    </motion.div>
  );
}