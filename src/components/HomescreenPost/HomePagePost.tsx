import { headingFont } from "@/lib/helpers/font-helper";
import { formatDate } from "@/lib/helpers/utils";
import { Frontmatter } from "@/types/Post";
import { ReadMore } from "../ReadMore/ReadMore";
import VisuallyHidden from "../VisuallyHidden";
import { Flex } from "../ui/Flex";
import { Heading, Paragraph } from "../ui/Typography";
import styles from "./HomePagePost.module.css";
import clsx from "clsx";
import { Link } from "../ui/Link";
interface Props {
  post: Frontmatter & {
    slug: string;
  };
}

const HomePagePost = ({ post }: Props): JSX.Element => {
  const { author, publishedOn, abstract, title, slug } = post;

  return (
    <Flex asChild direction={"column"} gap={1}>
      <article>
        <Link className={clsx(styles.link, styles.head)} href={slug}>
          <Heading
            level={3}
            asChild
            className={clsx(styles["heading"], headingFont.className)}
          >
            <h2>{title} </h2>
          </Heading>
        </Link>
        {/* <Flex asChild> */}
        <Flex className={styles["author-time"]} gap={3}>
          <address className={styles["author"]}>
            <VisuallyHidden>Published By </VisuallyHidden>
            {author}
          </address>
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

export default HomePagePost;
