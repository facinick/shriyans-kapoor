'use client';
import {
  LazyMotion,
  m,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import { MoveUp } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import VisuallyHidden from '../VisuallyHidden';
import { Button } from '../ui/Button';
import CircularProgress from '../ui/CircularProgress';
import styles from './ScrollToTop.module.css';
interface Props {}

const ScrollToTop = ({}: Props): JSX.Element => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { scrollYProgress } = useScroll();

  const [scroll, setScroll] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setScroll(latest);
  });

  const [appear, setAppear] = useState(false);

  const id = useId();

  useEffect(() => {
    if (triggerRef.current) {
      const target = triggerRef.current;

      const callback = (entries: IntersectionObserverEntry[]) => {
        const bodyIsHalfVisible = entries[0].isIntersecting;
        setAppear(!bodyIsHalfVisible);
      };

      const observer = new IntersectionObserver(callback);

      observer.observe(target);

      return () => {
        observer.unobserve(target);
      };
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const translateY = appear ? '0%' : 'calc(100% + 20px)';
  const opacity = appear ? 1 : 0;

  return (
    <>
      <div ref={triggerRef} className={styles.trigger} />
      <motion.div
        className={styles.wrapper}
        initial={false}
        transition={{
          type: 'spring',
          stiffness: appear ? 300 : 600,
          damping: appear ? 70 : 40,
          restDelta: 0.01,
        }}
        animate={{
          y: translateY,
          opacity,
        }}
      >
        <Button
          title="Scroll to top"
          onClick={scrollToTop}
          className={styles.button}
          ref={buttonRef}
        >
          <MoveUp />
          <VisuallyHidden>Scroll To Top</VisuallyHidden>
        </Button>
        <div className={styles.progress}>
          <CircularProgress size={'thick'} progressInDecimal={scroll} />
        </div>
      </motion.div>
    </>
  );
};

export default ScrollToTop;
