import CircularColorsDemo from "@/components/CircularColorsDemo";
import CodeSnippet from "@/components/CodeSnippet";
import DivisionGroupsDemo from "@/components/DivisionGroupsDemo";
import { Heading } from "@/components/ui/Typography/Heading";
import { Paragraph } from "@/components/ui/Typography/Paragraph";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ComponentProps } from "react";

const MDX_COMPONENTS_MAP: ComponentProps<typeof MDXRemote>["components"] = {
  pre: CodeSnippet,
  DivisionGroupsDemo,
  CircularColorsDemo,
  p: ({ children, ...rest }: { children?: React.ReactNode }) => {
    return <Paragraph {...rest}>{children}</Paragraph>;
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
};

export default MDX_COMPONENTS_MAP;
