import { headingFont } from "@/lib/helpers/font-helper";
import { formatDate } from "@/lib/utils";
import { Frontmatter } from "@/types/Post";
import Link from "next/link";
import { ReadMore } from "../ReadMore/ReadMore";
import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";
import { Flex } from "../ui/Flex/Flex";
import { Heading } from "../ui/Typography/Heading";
import { Paragraph } from "../ui/Typography/Paragraph";
import styles from "./Post.module.css";

interface Props {
  post: Frontmatter & {
    slug: string;
  };
}

export const Post = ({ post }: Props): JSX.Element => {
  const { author, publishedOn, abstract, title, slug } = post;

  return (
    <Flex asChild direction={"column"} gap={1}>
      <article>
        <Link href={slug}>
          <Heading level={3} asChild className={headingFont.className}>
            <h3>{title} </h3>
          </Heading>
        </Link>
        {/* <Flex asChild> */}
        <Flex className={styles["author-time"]} gap={3}>
          <address className={styles["author"]}>{author}</address>
          <time dateTime={publishedOn}>
            <VisuallyHidden>Published On </VisuallyHidden>
            {formatDate(publishedOn)}
          </time>
        </Flex>
        {/* </Flex> */}
        <Paragraph>
          {`${abstract} `} <ReadMore href={slug} />
        </Paragraph>
      </article>
    </Flex>
  );
};
