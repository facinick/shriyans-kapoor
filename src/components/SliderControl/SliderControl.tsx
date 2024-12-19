import React, { ComponentProps } from 'react';

import { Slider } from '../ui/Slider';
import styles from './SliderControl.module.css';

export interface SliderControlProps extends ComponentProps<typeof Slider> {
  label: string;
}

function SliderControl({ id, label, value, ...delegated }: SliderControlProps) {
  const generatedId = React.useId();

  const inputId = id || generatedId;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
        <span className={styles.value}>{value}</span>
      </div>
      <Slider id={inputId} {...delegated} />
    </div>
  );
}

export default SliderControl;
