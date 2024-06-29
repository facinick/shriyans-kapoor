import React from 'react';
import clsx from 'clsx';

import styles from './Slider.module.css';

export interface SliderProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      ...props
    },
    ref
  ) => {
    return (
      <input
      type="range"
      className={clsx(styles.slider, className)}
      ref={ref}
      {...props}
    />
    )
  }
)

Slider.displayName = "Slider";

export { Slider };

export default Slider;
