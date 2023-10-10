"use client";

import { extractTimeDigitsFromDate } from "@/lib/helpers/utils";
import { useCurrentTime } from "@/lib/hooks/useCurrentTime";
import clsx from "clsx";
import { AnimatePresence, MotionProps, motion } from "framer-motion";
import { ComponentProps, useId } from "react";
import { Box } from "../ui/Box";
import { Flex } from "../ui/Flex";
import styles from "./Clock.module.css";

type ClockProps = ComponentProps<typeof Box>;

const Clock = ({ className }: ClockProps): JSX.Element => {
  const currentTime = useCurrentTime({ unit: "ms", every: 50 });

  const id = useId();

  const {
    hourTensDigit,
    hourUnitDigit,
    minuteTensDigit,
    minuteUnitDigit,
    secondTensDigit,
    secondUnitDigit,
  } = extractTimeDigitsFromDate(currentTime);

  return (
    <Box className={clsx(styles.wrapper, className)} asChild>
      <time
        title={currentTime.toISOString()}
        dateTime={currentTime.toISOString()}
      >
        <Flex justify={"center"} align={"center"}>
          <Flex
            justify={"center"}
            align={"center"}
            className={styles["number-wrapper"]}
          >
            <AnimatePresence initial={false}>
              <motion.div
                {...MOTION_VALUES}
                suppressHydrationWarning
                key={`${id}-hourTensDigit-${hourTensDigit}`}
                className={styles.number}
              >
                {hourTensDigit}
              </motion.div>
            </AnimatePresence>
          </Flex>
          <Flex
            justify={"center"}
            align={"center"}
            className={styles["number-wrapper"]}
          >
            <AnimatePresence initial={false}>
              <motion.div
                {...MOTION_VALUES}
                suppressHydrationWarning
                key={`${id}-hourUnitDigit-${hourUnitDigit}`}
                className={styles.number}
              >
                {hourUnitDigit}
              </motion.div>
            </AnimatePresence>
          </Flex>
          <Box className={styles.separator}>:</Box>
          <Flex
            justify={"center"}
            align={"center"}
            className={styles["number-wrapper"]}
          >
            <AnimatePresence initial={false}>
              <motion.div
                {...MOTION_VALUES}
                suppressHydrationWarning
                key={`${id}-minuteTensDigit-${minuteTensDigit}`}
                className={styles.number}
              >
                {minuteTensDigit}
              </motion.div>
            </AnimatePresence>
          </Flex>
          <Flex
            justify={"center"}
            align={"center"}
            className={styles["number-wrapper"]}
          >
            <AnimatePresence initial={false}>
              <motion.div
                {...MOTION_VALUES}
                suppressHydrationWarning
                key={`${id}-minuteUnitDigit-${minuteUnitDigit}`}
                className={styles.number}
              >
                {minuteUnitDigit}
              </motion.div>
            </AnimatePresence>
          </Flex>
          <Box className={styles.separator}>:</Box>
          <Flex
            justify={"center"}
            align={"center"}
            className={styles["number-wrapper"]}
          >
            <AnimatePresence initial={false}>
              <motion.div
                {...MOTION_VALUES}
                suppressHydrationWarning
                key={`${id}-secondTensDigit-${secondTensDigit}`}
                className={styles.number}
              >
                {secondTensDigit}
              </motion.div>
            </AnimatePresence>
          </Flex>
          <Flex
            justify={"center"}
            align={"center"}
            className={styles["number-wrapper"]}
          >
            <AnimatePresence initial={false}>
              <motion.div
                {...MOTION_VALUES}
                suppressHydrationWarning
                key={`${id}-secondUnitDigit-${secondUnitDigit}`}
                className={styles.number}
              >
                {secondUnitDigit}
              </motion.div>
            </AnimatePresence>
          </Flex>
        </Flex>
      </time>
    </Box>
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
