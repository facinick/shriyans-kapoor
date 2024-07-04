import { useEffect } from 'react';
import { isNavigator } from '../helpers/browser-helper';
import { noop } from '../helpers/utils';

export type VibrationPattern = number | number[];

const isVibrationApiSupported = isNavigator && 'vibrate' in navigator;

function useVibrate(
  enabled: boolean = true,
  pattern: VibrationPattern = [1000, 1000],
  loop: boolean = true
): void {
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (enabled) {
      navigator.vibrate(pattern);

      if (loop) {
        const duration =
          pattern instanceof Array
            ? pattern.reduce((a, b) => a + b)
            : (pattern as number);

        interval = setInterval(() => {
          navigator.vibrate(pattern);
        }, duration);
      }
    }

    return () => {
      if (enabled) {
        navigator.vibrate(0);

        if (loop) {
          clearInterval(interval);
        }
      }
    };
  }, [enabled, loop, pattern]);
}

export default isVibrationApiSupported ? useVibrate : noop;
