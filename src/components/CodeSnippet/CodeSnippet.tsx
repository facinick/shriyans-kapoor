import { Code } from 'bright';
import clsx from 'clsx';
import { ComponentProps, isValidElement, ReactNode } from 'react';
import styles from './CodeSnippet.module.css';
import { Box } from '../ui/Box';
import CopyToClipboardButton from '../CopyToClipboardButton/CopyToClipboardButton';
import React from 'react';

type CodeSnippetProps = ComponentProps<typeof Code>;

const CodeSnippet = ({ children, className, ...props }: CodeSnippetProps) => {
  return (
    <Box style={{ position: 'relative' }}>
      <Code
        {...props}
        lineNumbers
        theme={{
          dark: 'github-dark',
          light: 'github-light',
          lightSelector: '[data-color-scheme="light"]',
        }}
        style={{
          borderRadius: "var(--radius)"
        }}
        className={clsx(className, styles.wrapper)}
      >
        {children}
      </Code>
      {isValidElement(children) && (
        <CopyToClipboardButton copyText={children.props.children} />
      )}
    </Box>
  );
};

export default CodeSnippet;
