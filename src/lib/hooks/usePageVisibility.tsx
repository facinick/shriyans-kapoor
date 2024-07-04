import { useEffect, useState } from 'react';
import {
  getHandlerArgs,
  isSupported,
  visibility,
} from '../helpers/visibility-helper';

const isSupportedLocal = isSupported && visibility;

const usePageVisibility = () => {
  const [initiallyVisible] = getHandlerArgs();

  const [isVisible, setIsVisible] = useState(initiallyVisible);

  useEffect(() => {
    if (isSupportedLocal) {
      const handler = () => {
        const [currentlyVisible] = getHandlerArgs();

        setIsVisible(currentlyVisible);
      };

      if (visibility) document.addEventListener(visibility.event, handler);

      return () => {
        if (visibility) document.removeEventListener(visibility.event, handler);
      };
    }
  }, []);

  return isVisible;
};

export default usePageVisibility;
