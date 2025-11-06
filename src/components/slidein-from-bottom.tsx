"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

// Component that makes its children slide in from the bottom when scrolled into view
function SlideInFromBottom({
  children,
  duration = 0.6, // animation duration
  delay = 2, // delay before animation starts
  className = "",
}: {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null); // reference to DOM element
  const isInView = useInView(ref, { once: true }); // trigger only once when in view

  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }} // start 50px lower and invisible
      animate={isInView ? { y: 0, opacity: 1 } : {}} // animate to original position
      transition={{ duration: duration, delay: delay, ease: "easeOut" }} // smooth transition
      viewport={{ once: true, amount: 0.3 }} // trigger when 30% in view
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export default SlideInFromBottom;
