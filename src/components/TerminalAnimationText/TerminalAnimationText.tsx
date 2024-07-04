'use client';
import { monoFont } from '@/lib/helpers/font-helper';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import styles from './TerminalAnimatedText.module.css';

interface Props {
  children: string;
}

const TerminalAnimationText = ({ children }: Props): JSX.Element => {
  const [characters, setCharacters] = useState<string[]>([]);
  const intervalTimerRef = useRef<undefined | NodeJS.Timeout>(undefined);

  useEffect(() => {
    const char = children.split('');

    intervalTimerRef.current = setInterval(() => {
      const charToAdd = char.shift();

      if (charToAdd !== undefined) {
        setCharacters((prevCharacters) => [...prevCharacters, charToAdd]);
      } else {
        clearInterval(intervalTimerRef.current);
      }
    }, 100);

    return () => {
      clearInterval(intervalTimerRef.current);
    };
  }, [children]);

  return (
    <p className={clsx(monoFont.className, styles.message)}>
      {characters.map((character, index) => (
        <span key={index}>{character}</span>
      ))}
      <span className={styles.cursor}> </span>
    </p>
  );
};

export default TerminalAnimationText;
