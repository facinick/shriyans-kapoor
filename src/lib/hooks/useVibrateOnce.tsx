import { useState } from 'react';
import useVibrate from './useVibrate';

function useVibrateOnce() {
  const [vibrating, setVibrating] = useState(false);

  useVibrate(vibrating, [50], false);

  const vibrate = () => {
    setVibrating(true);
    setTimeout(() => setVibrating(false), 50);
  };

  return vibrate;
}

export { useVibrateOnce };
