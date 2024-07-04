"use client";

import { extractTimeDigitsFromDate } from "@/lib/helpers/utils";
import { useCurrentTime } from "@/lib/hooks/useCurrentTime";
import usePageVisibility from "@/lib/hooks/usePageVisibility";
import clsx from "clsx";
import { AnimatePresence, LazyMotion, MotionProps, m } from "framer-motion";
import { ComponentProps, useId } from "react";
import { Box } from "../ui/Box";
import { Flex } from "../ui/Flex";
import styles from "./Clock.module.css";
import VisuallyHidden from "../VisuallyHidden";
import { APP_TIMEZONE } from "@/lib/constants";

type ClockProps = ComponentProps<typeof Box>;

const loadFeatures = () =>
  import("../../lib/motion-features").then((res) => res.default);

const Clock = ({ className }: ClockProps): JSX.Element => {
  const currentTime = useCurrentTime({
    unit: "s",
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
    <LazyMotion features={loadFeatures} strict>
      <Box className={clsx(styles.wrapper, className)} asChild>
        <time
          suppressHydrationWarning
          title={currentTime.toISOString()}
          dateTime={currentTime.toISOString()}
        >
          <VisuallyHidden>Author&apos;s local time: </VisuallyHidden>
          <Flex direction={"row"} asChild>
            {/* span so that when page loads without css, "Author's local time" and clock show size by side */}
            <span>
              <Flex
                asChild
                justify={"center"}
                align={"center"}
                className={styles["number-wrapper"]}
              >
                <span>
                  <AnimatedDigit digit={hourTensDigit} isVisible={isVisible} />
                </span>
              </Flex>
              <Flex
                asChild
                justify={"center"}
                align={"center"}
                className={styles["number-wrapper"]}
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
                justify={"center"}
                align={"center"}
                className={styles["number-wrapper"]}
              >
                <span>
                  <AnimatedDigit
                    digit={minuteTensDigit}
                    isVisible={isVisible}
                  />
                </span>
              </Flex>
              <Flex
                asChild
                justify={"center"}
                align={"center"}
                className={styles["number-wrapper"]}
              >
                <span>
                  <AnimatedDigit
                    digit={minuteUnitDigit}
                    isVisible={isVisible}
                  />
                </span>
              </Flex>
              <Box asChild className={styles.separator}>
                <span>:</span>
              </Box>
              <Flex
                asChild
                justify={"center"}
                align={"center"}
                className={styles["number-wrapper"]}
              >
                <span>
                  <AnimatedDigit
                    digit={secondTensDigit}
                    isVisible={isVisible}
                  />
                </span>
              </Flex>
              <Flex
                asChild
                justify={"center"}
                align={"center"}
                className={styles["number-wrapper"]}
              >
                <span>
                  <AnimatedDigit
                    digit={secondUnitDigit}
                    isVisible={isVisible}
                  />
                </span>
              </Flex>
            </span>
          </Flex>
        </time>
      </Box>
    </LazyMotion>
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
      <m.span
        {...MOTION_VALUES}
        suppressHydrationWarning
        key={`${id}-${digit}`}
        className={styles.number}
        data-key={`${id}-${digit}`}
      >
        {digit}
      </m.span>
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
  initial: { y: "100%" },
  animate: { y: "0%" },
  exit: { y: "-100%" },
  transition: {
    duration: 1,
    ease: "linear",
  },
};

export default Clock;
