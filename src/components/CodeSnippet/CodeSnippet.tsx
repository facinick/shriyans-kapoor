import { Code } from 'bright';
import { ComponentProps } from 'react';

import clsx from 'clsx';
import styles from './CodeSnippet.module.css';
import theme from './theme';

type CodeSnippetProps = ComponentProps<typeof Code>

function CodeSnippet({className, ...props}: CodeSnippetProps) {
  return (
    <Code
      {...props}
      theme={theme}
      className={clsx(styles.wrapper, className)}
    />
  );
}

export default CodeSnippet;
