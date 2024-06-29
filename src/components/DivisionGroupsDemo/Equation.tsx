import React from 'react';

import styles from './Equation.module.css';

interface Props {
  dividend: number
  divisor: number
  remainder: number
}

function Equation({ dividend, divisor, remainder }: Props) {
  return (
    <p className={styles.wrapper}>
      {dividend} ÷ {divisor} ={' '}
      {Math.floor(dividend / divisor)}
      {typeof remainder === 'number' && remainder > 0 && (
        <span className={styles.remainderPhrase}>
          {' '}
          (and{' '}
          <span className={styles.remainderDigit}>
            {remainder}
          </span>{' '}
          leftover)
        </span>
      )}
    </p>
  );
}

export default Equation;
