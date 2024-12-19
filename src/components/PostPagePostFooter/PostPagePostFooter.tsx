import { formatDate } from '@/lib/helpers/utils';
import { PostMetadata } from '@/types/Post';
import { z } from 'zod';
import VisuallyHidden from '../VisuallyHidden';
import { Flex } from '../ui/Flex';
import styles from './PostPagePostFooter.module.css';

interface Props {
  children?: React.ReactNode;
  author: z.infer<typeof PostMetadata>['author'];
  publishedOn: z.infer<typeof PostMetadata>['publishedOn'];
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
