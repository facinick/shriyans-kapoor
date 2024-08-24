"use client"

import { Heading } from '@/components/ui/Typography';
import { headingFont } from '@/lib/helpers/font-helper';
import { useRouter } from '@/lib/hooks/useRouter';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/Button';
import styles from './PostPagePostHeader.module.css';

interface Props {
  children?: React.ReactNode;
  backLinkOrNull: string | null;
}

export const PostPagePostHeader = ({
  children,
  backLinkOrNull,
}: Props): JSX.Element => {

  const router = useRouter()

  const onBack = () => {
    router.back()
  }

  return (
    <>
      <Heading level={2} asChild className={headingFont.className}>
        <h1>
          {backLinkOrNull && (
            <Button variant={'link'} onClick={onBack} title="Go Back">
              {' '}
              <ArrowLeft />
            </Button>
          )}
          <span className={styles['title']}>{children}</span>
        </h1>
      </Heading>
    </>
  );
};

export default PostPagePostHeader;
