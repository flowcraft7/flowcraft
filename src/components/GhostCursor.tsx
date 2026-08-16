"use client";

import { motion } from "framer-motion";
import { MousePointer2 } from "lucide-react";

export default function GhostCursor() {
  return (
    <motion.div
      className="pointer-events-none absolute -top-6 left-1/2 z-10 hidden lg:block"
      animate={{
        x: [-120, 0, 120, 0, -120],
        y: [0, -10, 0, 10, 0],
        opacity: [0, 1, 1, 1, 0],
      }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <MousePointer2 className="h-5 w-5 fill-automate text-automate" />
    </motion.div>
  );
}