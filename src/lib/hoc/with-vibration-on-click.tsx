import React from 'react';
import { useVibrateOnce } from '../hooks/useVibrateOnce';

function withVibrateOnCLick<T extends React.ComponentType<any>>(
  Component: T
): T {
  const WrappedComponent = React.forwardRef<
    typeof Component,
    React.ComponentProps<typeof Component>
  >((props, ref) => {
    const vibrateOnClick = useVibrateOnce();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      vibrateOnClick();
      if (props.onClick) {
        props.onClick(event);
      }
    };

    WrappedComponent.displayName = 'WithVibration';

    return <Component {...props} onClick={handleClick} ref={ref} />;
  });

  return WrappedComponent as T;
}

export { withVibrateOnCLick };
