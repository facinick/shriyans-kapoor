'use client';
import { useIsTouchDevice } from '@/lib/hooks/useIsTouchDevice';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface Props {
  slideOnHoverCharacter?: string;
  children: React.ReactNode;
}

function SlideOnHoverText({ children, slideOnHoverCharacter = '» ' }: Props) {
  const [hovered, setHovered] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  const isTouchDevice = useIsTouchDevice();

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseDown={() => setMouseDown(true)}
      onMouseUp={() => setMouseDown(false)}
      style={{ display: 'inline-block', position: 'relative' }}
    >
      <AnimatePresence>
        {(hovered || mouseDown) && !isTouchDevice && (
          <motion.span
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ type: 'tween', duration: 0.2 }}
            style={{ position: 'absolute', left: 0 }}
          >
            {slideOnHoverCharacter}
          </motion.span>
        )}
      </AnimatePresence>
      <span
        style={{
          position: 'relative',
          left: (hovered || mouseDown) && !isTouchDevice ? '1em' : '0',
          transition: 'left 0.2s',
        }}
      >
        {children}
      </span>
    </span>
  );
}

export default SlideOnHoverText;
