import { headingFont } from '@/lib/helpers/font-helper';
import { CHARACTERS } from '@/lib/helpers/string-helper';
import { formatDate } from '@/lib/helpers/utils';
import { Post } from '@/types/Post';
import clsx from 'clsx';
import { z } from 'zod';
import { ReadMore } from '../ReadMore/ReadMore';
import SlideOnHoverText from '../SlideOnHoverText';
import { Tags } from '../Tags';
import VisuallyHidden from '../VisuallyHidden';
import { Flex } from '../ui/Flex';
import { Link } from '../ui/Link';
import { Heading, Paragraph } from '../ui/Typography';
import styles from './HomePagePost.module.css';

interface Props {
  post: z.infer<typeof Post>
}

const HomePagePost = ({ post }: Props): JSX.Element => {
  const { author, publishedOn, abstract, title, tags } = post.metadata;
  const { category, slug } = post

  const href = `${category}/${slug}`

  return (
    <Flex asChild direction={'column'} gap={2}>
      <article>
        <Link className={clsx(styles.link, styles.head)} href={href}>
          <Heading
            level={3}
            asChild
            className={clsx(styles.heading, headingFont.className)}
          >
            <h2>
              <SlideOnHoverText>{title}</SlideOnHoverText>
            </h2>
          </Heading>
        </Link>
        <Tags tags={tags} />
        <Paragraph className={styles.abstract}>
          {`${abstract} `} <ReadMore href={slug}>view entire post</ReadMore>
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
