import { useState, useEffect } from 'react';

function useIsTouchDevice() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window || navigator.maxTouchPoints > 0
      );
    };

    checkTouch(); // Initial check

    // Event listener to detect changes in touch capability
    window.addEventListener('touchstart', checkTouch);

    return () => {
      window.removeEventListener('touchstart', checkTouch);
    };
  }, []);

  return isTouchDevice;
}

export { useIsTouchDevice };
