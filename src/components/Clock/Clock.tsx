'use client';
import { APP_TIMEZONE } from '@/lib/constants';
import { extractTimeDigitsFromDate } from '@/lib/helpers/utils';
import { useCurrentTime } from '@/lib/hooks/useCurrentTime';
import usePageVisibility from '@/lib/hooks/usePageVisibility';
import clsx from 'clsx';
import { AnimatePresence, MotionProps, motion } from 'framer-motion';
import React, { ComponentProps, useId } from 'react';
import VisuallyHidden from '../VisuallyHidden';
import { Box } from '../ui/Box';
import { Flex } from '../ui/Flex';
import styles from './Clock.module.css';

type ClockProps = ComponentProps<typeof Box>;

const Clock = ({ className }: ClockProps): JSX.Element => {
  const currentTime = useCurrentTime({
    unit: 's',
    every: 1,
    timezone: APP_TIMEZONE,
  });

  const {
    hourTensDigit,
    hourUnitDigit,
    minuteTensDigit,
    minuteUnitDigit,
    secondTensDigit,
    secondUnitDigit,
  } = extractTimeDigitsFromDate(currentTime);

  const isVisible = usePageVisibility();

  return (
    <Box className={clsx(styles.wrapper, className)} asChild>
      <time
        suppressHydrationWarning
        title={currentTime.toISOString()}
        dateTime={currentTime.toISOString()}
      >
        <VisuallyHidden>Author&apos;s local time: </VisuallyHidden>
        <Flex direction={'row'} asChild>
          {/* span so that when page loads without css, "Author's local time" and clock show size by side */}
          <span>
            <Flex
              asChild
              justify={'center'}
              align={'center'}
              className={styles['number-wrapper']}
            >
              <span>
                <AnimatedDigit digit={hourTensDigit} isVisible={isVisible} />
              </span>
            </Flex>
            <Flex
              asChild
              justify={'center'}
              align={'center'}
              className={styles['number-wrapper']}
            >
              <span>
                <AnimatedDigit digit={hourUnitDigit} isVisible={isVisible} />
              </span>
            </Flex>
            <Box asChild className={styles.separator}>
              <span>:</span>
            </Box>
            <Flex
              asChild
              justify={'center'}
              align={'center'}
              className={styles['number-wrapper']}
            >
              <span>
                <AnimatedDigit digit={minuteTensDigit} isVisible={isVisible} />
              </span>
            </Flex>
            <Flex
              asChild
              justify={'center'}
              align={'center'}
              className={styles['number-wrapper']}
            >
              <span>
                <AnimatedDigit digit={minuteUnitDigit} isVisible={isVisible} />
              </span>
            </Flex>
            <Box asChild className={styles.separator}>
              <span>:</span>
            </Box>
            <Flex
              asChild
              justify={'center'}
              align={'center'}
              className={styles['number-wrapper']}
            >
              <span>
                <AnimatedDigit digit={secondTensDigit} isVisible={isVisible} />
              </span>
            </Flex>
            <Flex
              asChild
              justify={'center'}
              align={'center'}
              className={styles['number-wrapper']}
            >
              <span>
                <AnimatedDigit digit={secondUnitDigit} isVisible={isVisible} />
              </span>
            </Flex>
          </span>
        </Flex>
      </time>
    </Box>
  );
};

const AnimatedDigit = ({
  isVisible,
  digit,
}: {
  isVisible: boolean;
  digit: number;
}) => {
  const id = useId();

  return isVisible ? (
    <AnimatePresence initial={false}>
      <motion.span
        {...MOTION_VALUES}
        suppressHydrationWarning
        key={`${id}-${digit}`}
        className={styles.number}
        data-key={`${id}-${digit}`}
      >
        {digit}
      </motion.span>
    </AnimatePresence>
  ) : (
    <span
      suppressHydrationWarning
      key={`${id}-${digit}`}
      className={styles.number}
      data-key={`${id}-${digit}`}
    >
      {digit}
    </span>
  );
};

const MOTION_VALUES: MotionProps = {
  initial: { y: '100%' },
  animate: { y: '0%' },
  exit: { y: '-100%' },
  transition: {
    duration: 1,
    ease: 'linear',
  },
};

const MemoizedClock = React.memo(Clock);

export default MemoizedClock;
