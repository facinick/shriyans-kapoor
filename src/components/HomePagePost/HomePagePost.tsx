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

        {/* <div className='flex gap-2'>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>FA</AvatarFallback>
          </Avatar>
          <div className='flex flex-col'>
              <Paragraph>facinick.xyz</Paragraph>
              <Paragraph>https://facinick.xyz/blog/.../this-is-sparta</Paragraph>
          </div>
        </div> */}

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
        {/* <Flex asChild> */}
        <Flex className={styles['author-time']} gap={3}>
          <address className={styles['author']}>
            <VisuallyHidden>Published By </VisuallyHidden>
            {author}
          </address>
          <time dateTime={publishedOn}>
            <VisuallyHidden>Published On </VisuallyHidden>
            {formatDate(publishedOn)}
          </time>
        </Flex>
        {/* </Flex> */}
        <Paragraph className={styles.abstract}>
          {`${abstract} `} <ReadMore href={slug} />
        </Paragraph>
      </article>
    </Flex>
  );
};

export default HomePagePost;
