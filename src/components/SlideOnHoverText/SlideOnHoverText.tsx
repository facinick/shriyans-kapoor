"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react";

export function SlideOnHoverText({
  children,
}: {
  children: React.ReactNode;
}) {

  const [hovered, setHovered] = useState(false)

  return (
    <span 
      onMouseEnter={() => setHovered(true)} 
      onMouseLeave={() => setHovered(false)}
      style={{ display: 'inline-block', position: 'relative' }}
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ type: 'tween', duration: 0.3 }}
            style={{ position: 'absolute', left: 0 }}
          >
            {'» '}
          </motion.span>
        )}
      </AnimatePresence>
      <span style={{ position: 'relative', left: hovered ? '1em' : '0', transition: 'left 0.3s' }}>
        {children}
      </span>
    </span>
  );
}