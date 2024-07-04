import { useEffect, useState } from 'react';

interface Breakpoints {
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
}

const breakpointValues: { [key: string]: number } = {
  xs: 0,
  sm: 520,
  md: 768,
  lg: 1024,
  xl: 1280,
};

function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoints>(() => ({
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false,
  }));

  useEffect(() => {
    function handleResize() {
      const currentWidth = window.innerWidth;
      const currentBreakpoints: Breakpoints = {} as Breakpoints;

      for (const key in breakpointValues) {
        currentBreakpoints[key as keyof Breakpoints] =
          currentWidth >= breakpointValues[key];
      }

      setBreakpoint(currentBreakpoints);
    }

    handleResize(); // Initial check

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return breakpoint;
}

export default useBreakpoint;
