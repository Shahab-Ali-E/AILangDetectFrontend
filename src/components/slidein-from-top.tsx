"use client";

import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

// Component that makes its children slide in from the top when scrolled into view
function SlideInFromTop({
  children,
  duration = 0.6, // animation duration
  delay = 0.2,     // delay before animation starts
}: {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null); // reference to DOM element
  const isInView = useInView(ref, { once: true }); // trigger only once when in view

  return (
    <motion.div
      ref={ref}
      initial={{ y: -20, opacity: 0 }} // start 20px above and invisible
      animate={isInView ? { y: 0, opacity: 1 } : {}} // animate to original position
      transition={{ duration: duration, delay: delay, ease: "easeInOut" }} // smooth transition
    >
      {children}
    </motion.div>
  );
}

export default SlideInFromTop;
