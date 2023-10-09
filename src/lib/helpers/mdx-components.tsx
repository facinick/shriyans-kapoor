import CodeSnippet from "@/components/CodeSnippet";
import { Paragraph } from "@/components/ui/Typography/Paragraph";

const MDX_COMPONENTS_MAP = {
  pre: CodeSnippet,
  p: ({ children, ...rest }: { children?: React.ReactNode }) => {
    return <Paragraph {...rest}>{children}</Paragraph>;
  },
};

export default MDX_COMPONENTS_MAP;
