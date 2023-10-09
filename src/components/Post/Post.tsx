import { sourceSans3 } from "@/lib/helpers/font-helper";
import { formatDate } from "@/lib/utils";
import { Frontmatter } from "@/types/Post";
import Link from "next/link";
import { ReadMore } from "../ReadMore/ReadMore";
import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";
import { Box } from "../ui/Box/Box";
import { Heading } from "../ui/Typography/Heading";
import { Paragraph } from "../ui/Typography/Paragraph";

interface Props {
  post: Frontmatter & {
    slug: string;
  };
}

export const Post = ({ post }: Props): JSX.Element => {
  const { author, publishedOn, abstract, title, slug } = post;

  return (
    <Box asChild>
      <article>
        <Link href={slug}>
          <Heading level={3} asChild className={sourceSans3.className}>
            <h3>{title} </h3>
          </Heading>
        </Link>
        <Paragraph variant={"muted"} asChild>
          <time dateTime={publishedOn}>
            <VisuallyHidden>Published On </VisuallyHidden>
            {formatDate(publishedOn)}
          </time>
        </Paragraph>
        <Paragraph>
          {`${abstract} `} <ReadMore href={slug} />
        </Paragraph>
      </article>
    </Box>
  );
};
