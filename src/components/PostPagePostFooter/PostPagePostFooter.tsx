import { formatDate } from '@/lib/helpers/utils';
import { Metadata } from '@/types/Post';
import { z } from 'zod';
import { Flex } from '../ui/Flex';
import VisuallyHidden from '../VisuallyHidden';
import styles from './PostPagePostFooter.module.css';

interface Props {
  children?: React.ReactNode;
  author: z.infer<typeof Metadata>['author'];
  publishedOn: z.infer<typeof Metadata>['publishedOn'];
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
