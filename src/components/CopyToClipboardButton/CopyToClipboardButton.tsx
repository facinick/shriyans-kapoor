'use client';
import { copyToClipboard } from '@/lib/helpers/utils';
import { useVibrateOnce } from '@/lib/hooks/useVibrateOnce';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/Button';
import VisuallyHidden from '../VisuallyHidden';
import styles from './CopyToClipboardButton.module.css';

type CopyToClipboardButtonProps = {
  copyText: string;
};

const CopyToClipboardButton = ({ copyText }: CopyToClipboardButtonProps) => {
  const [copied, setCopied] = useState(false);

  const vibrate = useVibrateOnce();

  const handleCopy = () => {
    copyToClipboard(copyText);
    setCopied(true);
    vibrate();
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <Button
      onClick={handleCopy}
      title={copied ? 'Copied' : 'Copy Code'}
      size={'icon'}
      variant={'outline'}
      className={styles.button}
      style={{
        pointerEvents: copied ? 'none' : 'auto',
      }}
      vibrate={true}
    >
      {copied ? (
        <>
          <Check color='green' />
          <VisuallyHidden>Copied</VisuallyHidden>
        </>
      ) : (
        <>
          <Copy />
          <VisuallyHidden>Copy Code</VisuallyHidden>
        </>
      )}
    </Button>
  );
};

export default CopyToClipboardButton;
