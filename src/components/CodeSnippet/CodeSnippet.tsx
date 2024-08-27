import { monoFont } from '@/lib/helpers/font-helper';
import { Code } from 'bright';
import clsx from 'clsx';
import { ComponentProps, isValidElement } from 'react';
import CopyToClipboardButton from '../CopyToClipboardButton/CopyToClipboardButton';
import { Box } from '../ui/Box';
import styles from './CodeSnippet.module.css';

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
        className={clsx(className, styles.wrapper, monoFont.className)}
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
