import { Code } from 'bright';
import clsx from 'clsx';
import { ComponentProps, ReactNode } from 'react';
import styles from './CodeSnippet.module.css';
import { Box } from '../ui/Box';
import CopyToClipboardButton from '../CopyToClipboardButton/CopyToClipboardButton';

type CodeSnippetProps = ComponentProps<typeof Code>;

const extractTextFromReactNode = (node: ReactNode): string => {
  if (typeof node === 'string') {
    return node;
  }
  if (Array.isArray(node)) {
    return node.map(extractTextFromReactNode).join('');
  }
  if (typeof node === 'object' && node && 'props' in node) {
    return extractTextFromReactNode((node as any).props.children);
  }
  return '';
};

const CodeSnippet = ({ className, ...props }: CodeSnippetProps) => {
  const rawCode = extractTextFromReactNode(props.children);

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
        className={clsx(styles.wrapper, className)}
      />
      {typeof rawCode === 'string' && (
        <CopyToClipboardButton copyText={rawCode} />
      )}
    </Box>
  );
};

export default CodeSnippet;
