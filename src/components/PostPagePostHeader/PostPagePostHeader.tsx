"use client"

import { Link } from '@/components/ui/Link';
import { Heading } from '@/components/ui/Typography';
import { headingFont } from '@/lib/helpers/font-helper';
import { ArrowLeft } from 'lucide-react';
import styles from './PostPagePostHeader.module.css';
import { useTransitionRouter } from 'next-view-transitions';
import { Button } from '../ui/Button';
import { useRouter } from 'next/navigation';

interface Props {
  children?: React.ReactNode;
  backLinkOrNull: string | null;
}

export const PostPagePostHeader = ({
  children,
  backLinkOrNull,
}: Props): JSX.Element => {

  const router = useTransitionRouter()

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
