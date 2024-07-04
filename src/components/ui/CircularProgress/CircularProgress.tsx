import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import React from "react";
import styles from "./CircularProgress.module.css";

interface Props {
  progressInDecimal: number;
}

const circularProgressVariants = cva("", {
  variants: {
    variant: {
      primary: styles.primary,
    },
    size: {
      thin: styles.thin,
      medium: styles.medium,
      thick: styles.thick,
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "thin",
  },
});

export interface CircularProgressProps
  extends React.SVGAttributes<SVGSVGElement>,
    VariantProps<typeof circularProgressVariants>,
    Props {
  trackStyle?: React.CSSProperties;
  fillStyle?: React.CSSProperties;
}

const CircularProgress = React.forwardRef<SVGSVGElement, CircularProgressProps>(
  (
    {
      className,
      fillStyle,
      trackStyle,
      variant,
      size,
      progressInDecimal,
      ...rest
    },
    ref
  ): JSX.Element => {
    return (
      <svg
        className={clsx(styles.progress, className)}
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        ref={ref}
        // fallback styles incase css doesn't load on page
        style={{ width: '70px', height: '70px' }}
        {...rest}
      >
        <circle
          className={clsx(
            styles.track,
            styles.circle,
            circularProgressVariants({ variant, size })
          )}
          style={{
            ...trackStyle,
          }}
          cx="50"
          cy="50"
          r="42"
          pathLength="1"
        />
        <circle
          cx="50"
          cy="50"
          r="42"
          pathLength="0.99"
          className={clsx(
            styles.filled,
            styles.circle,
            circularProgressVariants({ variant, size })
          )}
          style={{
            strokeDasharray: `${progressInDecimal}px 1px`,
            ...fillStyle,
          }}
        />
      </svg>
    );
  }
);

CircularProgress.displayName = "CircularProgress";

export default CircularProgress;
