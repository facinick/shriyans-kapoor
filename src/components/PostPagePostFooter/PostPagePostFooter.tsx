import { Link } from '@/components/ui/Link';
import { Heading } from '@/components/ui/Typography';
import { headingFont } from '@/lib/helpers/font-helper';
import { ArrowLeft } from 'lucide-react';
import styles from './PostPagePostFooter.module.css';
import { formatDate } from '@/lib/helpers/utils';
import { Flex } from '../ui/Flex';
import VisuallyHidden from '../VisuallyHidden';
import { Frontmatter } from '@/types/Post';

interface Props {
  children?: React.ReactNode;
  author: Frontmatter['author'];
  publishedOn: Frontmatter['publishedOn'];
}

export const PostPagePostFooter = ({
  children,
  author,
  publishedOn,
}: Props): JSX.Element => {
  return (
    <>
      <Flex className={styles['author-time']} justify={'end'} gap={3}>
        <address className={styles['author']}>
          <VisuallyHidden>Published By </VisuallyHidden>
        </address>
        <time dateTime={publishedOn}>
          <VisuallyHidden>Published On </VisuallyHidden>
          {formatDate(publishedOn)}
        </time>
      </Flex>
    </>
  );
};

export default PostPagePostFooter;
