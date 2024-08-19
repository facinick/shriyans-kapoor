import { headingFont } from '@/lib/helpers/font-helper';
import { formatDate } from '@/lib/helpers/utils';
import { Frontmatter } from '@/types/Post';
import { ReadMore } from '../ReadMore/ReadMore';
import VisuallyHidden from '../VisuallyHidden';
import { Flex } from '../ui/Flex';
import { Heading, Paragraph } from '../ui/Typography';
import styles from './HomePagePost.module.css';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Link } from '../ui/Link';
import SlideOnHoverText from '../SlideOnHoverText';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar';
import { CHARACTERS } from '@/lib/helpers/string-helper';

interface Props {
  post: Frontmatter & {
    slug: string;
  };
}

const HomePagePost = ({ post }: Props): JSX.Element => {
  const { author, publishedOn, abstract, title, slug } = post;

  return (
    <Flex asChild direction={'column'} gap={2}>
      <article>
        <Link className={clsx(styles.link, styles.head)} href={slug}>
          <Heading
            level={3}
            asChild
            className={clsx(styles['heading'], headingFont.className)}
          >
            <h2>
              <SlideOnHoverText>{title}</SlideOnHoverText>
            </h2>
          </Heading>
        </Link>
        <Paragraph className={styles.abstract}>
          {`${abstract} `} <ReadMore href={slug} />
        </Paragraph>
        {/* <Flex asChild> */}
        <Flex className={styles['author-time']}>
          <time dateTime={publishedOn}>
            <VisuallyHidden>Published On </VisuallyHidden>
            {formatDate(publishedOn)}
          </time>
          &nbsp;
          {CHARACTERS.bullet}
          &nbsp;
          <address className={styles['author']}>
            <VisuallyHidden>Published By </VisuallyHidden>
            {author}
          </address>
        </Flex>
        {/* </Flex> */}
      </article>
    </Flex>
  );
};

export default HomePagePost;
