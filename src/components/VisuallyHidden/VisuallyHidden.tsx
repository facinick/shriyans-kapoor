import clsx from 'clsx';
import React from 'react';

import styles from './VisuallyHidden.module.css';

interface Props {
  as?: React.ElementType;
  children?: React.ReactNode
  className?: string
}

function VisuallyHidden({
  as: Element = 'span',
  className,
  children,
  ...delegated
}: Props) {
  return (
    <Element
      className={clsx(styles.wrapper, className)}
      {...delegated}
    >
      {children}
    </Element>
  );
}

export default VisuallyHidden;
