'use client';
import { Code } from 'bright';
import clsx from 'clsx';
import { ComponentProps, useState } from 'react';
import styles from './CopyToClipboardButton.module.css';
import { Button } from '../ui/Button';
import { Check, Copy } from 'lucide-react';
import VisuallyHidden from '../VisuallyHidden';
import { copyToClipboard } from '@/lib/helpers/utils';
import useVibrate from '@/lib/hooks/useVibrate';
import { useVibrateOnce } from '@/lib/hooks/useVibrateOnce';

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
          <Check color="green" />
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
