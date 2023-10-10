import clsx from "clsx";
import React from "react";

import styles from "./VisuallyHidden.module.css";

interface Props {
  as?: React.ElementType;
  children?: React.ReactNode;
  className?: string;
}

const VisuallyHidden = React.forwardRef<HTMLElement, Props>(
  ({ as: Element = "span", className, children, ...delegated }, ref) => {
    return (
      <Element className={clsx(styles.wrapper, className)} {...delegated}>
        {children}
      </Element>
    );
  }
);

VisuallyHidden.displayName = "VisuallyHidden";

export default VisuallyHidden;
