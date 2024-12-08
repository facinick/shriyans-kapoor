import CodeSnippet from '@/components/CodeSnippet';
import CircularColorsDemo from '@/components/lazy/CircularColorsDemo';
import DivisionGroupsDemo from '@/components/lazy/DivisionGroupsDemo';
import PathFindingGrid from '@/components/lazy/PathFindingGrid';
import PercolatingGrid from '@/components/lazy/PercolatingGrid';
import { Button } from '@/components/ui/Button';
import { Link } from '@/components/ui/Link';
import { Heading } from '@/components/ui/Typography/Heading';
import { Ol } from '@/components/ui/Typography/Ol';
import { Paragraph } from '@/components/ui/Typography/Paragraph';
import { Ul } from '@/components/ui/Typography/Ul';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ComponentProps, ReactNode } from 'react';

const MDX_COMPONENTS_MAP: ComponentProps<typeof MDXRemote>['components'] = {
  pre: CodeSnippet,
  DivisionGroupsDemo,
  CircularColorsDemo,
  PercolatingGrid,
  PathFindingGrid,
  p: ({ children, ...rest }: { children?: React.ReactNode }) => {
    return <Paragraph {...rest}>{children}</Paragraph>;
  },
  h1: ({ children, ...rest }: { children?: React.ReactNode }) => {
    return (
      <Heading level={1} asChild {...rest}>
        <h1>{children}</h1>
      </Heading>
    );
  },
  h2: ({ children, ...rest }: { children?: React.ReactNode }) => {
    return (
      <Heading level={2} asChild {...rest}>
        <h2>{children}</h2>
      </Heading>
    );
  },
  h3: ({ children, ...rest }: { children?: React.ReactNode }) => {
    return (
      <Heading level={3} {...rest} asChild>
        <h3>{children}</h3>
      </Heading>
    );
  },
  h4: ({ children, ...rest }: { children?: React.ReactNode }) => {
    return (
      <Heading level={4} {...rest} asChild>
        <h4>{children}</h4>
      </Heading>
    );
  },
  ul: ({ children, ...rest }: { children?: React.ReactNode }) => {
    return <Ul {...rest}>{children}</Ul>;
  },
  ol: ({ children, ...rest }: { children?: React.ReactNode }) => {
    return <Ol {...rest}>{children}</Ol>;
  },
  table: ({ children, ...rest }: { children?: React.ReactNode }) => {
    return <Table {...rest}>{children}</Table>;
  },
  thead: ({ children, ...rest }: { children?: React.ReactNode }) => {
    return <TableHeader {...rest}>{children}</TableHeader>;
  },
  tbody: ({ children, ...rest }: { children?: React.ReactNode }) => {
    return <TableBody {...rest}>{children}</TableBody>;
  },
  tr: ({ children, ...rest }: { children?: React.ReactNode }) => {
    return <TableRow {...rest}>{children}</TableRow>;
  },
  th: ({ children, ...rest }: { children?: React.ReactNode }) => {
    return <TableHead {...rest}>{children}</TableHead>;
  },
  td: ({ children, ...rest }: { children?: React.ReactNode }) => {
    return <TableCell {...rest}>{children}</TableCell>;
  },
  Button: ({ children, ...rest }: { children?: React.ReactNode }) => {
    return (
      <Button variant={'default'} {...rest}>
        {children}
      </Button>
    );
  },
  a: ({
    children,
    ...rest
  }: {
    children?: ReactNode;
  } & React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const href = rest['href'];

    // Ensure href is a valid string or URL
    if (href === undefined || href === '') {
      throw new Error('href is required for the Link component');
    }

    return (
      <Link
        className='p-0'
        target='_blank'
        rel='noopener noreferrer'
        href={href}
      >
        {children}
      </Link>
    );
  },
};

export default MDX_COMPONENTS_MAP;
