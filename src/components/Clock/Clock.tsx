"use client";

import { extractTimeDigitsFromDate } from "@/lib/helpers/utils";
import { useCurrentTime } from "@/lib/hooks/useCurrentTime";
import usePageVisibility from "@/lib/hooks/usePageVisibility";
import clsx from "clsx";
import { AnimatePresence, MotionProps, motion } from "framer-motion";
import { ComponentProps, useId } from "react";
import { Box } from "../ui/Box";
import { Flex } from "../ui/Flex";
import styles from "./Clock.module.css";

type ClockProps = ComponentProps<typeof Box>;

const Clock = ({ className }: ClockProps): JSX.Element => {
  const currentTime = useCurrentTime({ unit: "ms", every: 50 });

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
        <Flex justify={"center"} align={"center"}>
          <Flex
            justify={"center"}
            align={"center"}
            className={styles["number-wrapper"]}
          >
            <AnimatedDigit digit={hourTensDigit} isVisible={isVisible} />
          </Flex>
          <Flex
            justify={"center"}
            align={"center"}
            className={styles["number-wrapper"]}
          >
            <AnimatedDigit digit={hourUnitDigit} isVisible={isVisible} />
          </Flex>
          <Box className={styles.separator}>:</Box>
          <Flex
            justify={"center"}
            align={"center"}
            className={styles["number-wrapper"]}
          >
            <AnimatedDigit digit={minuteTensDigit} isVisible={isVisible} />
          </Flex>
          <Flex
            justify={"center"}
            align={"center"}
            className={styles["number-wrapper"]}
          >
            <AnimatedDigit digit={minuteUnitDigit} isVisible={isVisible} />
          </Flex>
          <Box className={styles.separator}>:</Box>
          <Flex
            justify={"center"}
            align={"center"}
            className={styles["number-wrapper"]}
          >
            <AnimatedDigit digit={secondTensDigit} isVisible={isVisible} />
          </Flex>
          <Flex
            justify={"center"}
            align={"center"}
            className={styles["number-wrapper"]}
          >
            <AnimatedDigit digit={secondUnitDigit} isVisible={isVisible} />
          </Flex>
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
      <motion.div
        {...MOTION_VALUES}
        suppressHydrationWarning
        key={`${id}-${digit}`}
        className={styles.number}
        data-key={`${id}-${digit}`}
      >
        {digit}
      </motion.div>
    </AnimatePresence>
  ) : (
    <div
      suppressHydrationWarning
      key={`${id}-${digit}`}
      className={styles.number}
      data-key={`${id}-${digit}`}
    >
      {digit}
    </div>
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
