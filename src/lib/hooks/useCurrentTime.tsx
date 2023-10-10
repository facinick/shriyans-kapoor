import { useEffect, useRef, useState } from "react";

interface Props {
  unit?: "ms" | "s" | "m" | "h" | "d" | "y";
  every?: number;
}

const INTERVAL_MAP = {
  ms: 1,
  s: 1000 * 1,
  m: 60 * 1000 * 1,
  h: 60 * 60 * 1000 * 1,
  d: 24 * 60 * 60 * 1000 * 1,
  y: 365 * 24 * 60 * 60 * 1000 * 1,
};

// export const useCurrentTime = ({ unit = "ms" }: Props): Date => {
//   const [time, setTime] = useState<Date>(new Date());
//   const animationFrameRef = useRef<number | undefined>(undefined);
//   const lastIntervalTimestamp = useRef<number>(Date.now());

//   useEffect(() => {
//     const updateTime = () => {
//       const now = new Date();
//       const nowTime = now.getTime();
//       if (nowTime - lastIntervalTimestamp.current >= INTERVAL_MAP[unit]) {
//         lastIntervalTimestamp.current = nowTime;
//         setTime(now);
//       }

//       animationFrameRef.current = requestAnimationFrame(updateTime);
//     };

//     animationFrameRef.current = requestAnimationFrame(updateTime);

//     return () => cancelAnimationFrame(animationFrameRef.current!);
//   }, [unit]);

//   return time;
// };

// export const useCurrentTime = ({ unit = "ms" }: Props): Date => {
//   const [time, setTime] = useState<Date>(new Date());
//   const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

//   const c = new Date();
//   useEffect(() => {
//     const updateTime = () => {
//       setTime(new Date());
//     };

//     intervalRef.current = setInterval(updateTime, INTERVAL_MAP[unit]);

//     return () => clearInterval(intervalRef.current);
//   }, [unit]);

//   return time;
// };

export const useCurrentTime = ({ unit = "ms", every = 1 }: Props): Date => {
  const [time, setTime] = useState<Date>(new Date());
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const nextUpdateTimeRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const f = () => {
      setTime(new Date());
      nextUpdateTimeRef.current =
        new Date().getTime() + INTERVAL_MAP[unit] * every;
      timeoutRef.current = setTimeout(
        f,
        nextUpdateTimeRef.current - new Date().getTime()
      );
    };

    timeoutRef.current = setTimeout(f, INTERVAL_MAP[unit] * every);

    return () => clearTimeout(timeoutRef.current);
  }, [unit, every]);

  return time;
};
