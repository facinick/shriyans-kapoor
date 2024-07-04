'use client';
import { Moon, Sun } from 'lucide-react';
import { useContext } from 'react';
import VisuallyHidden from '../VisuallyHidden/VisuallyHidden';
import { ThemeContext } from '../providers/ThemeProvider';
import { Button } from '../ui/Button/Button';
import { motion } from 'framer-motion';
interface Props {}

const ColorSchemeToggle = ({}: Props): JSX.Element => {
  const { colorScheme, toggleColorScheme } = useContext(ThemeContext);

  const handleToggle = async (): Promise<void> => {
    await toggleColorScheme();
  };

  return (
    <>
      <Button
        title={colorScheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        size="icon"
        variant={'secondary'}
        onClick={handleToggle}
        asChild
      >
        <motion.button
          whileTap={{ scale: 0.9 }}
          // transition={{ duration: 0.2 }}
        >
          {colorScheme === 'dark' ? <Sun /> : <Moon />}
          <VisuallyHidden>Color Scheme Toggle</VisuallyHidden>
        </motion.button>
      </Button>
    </>
  );
};

export default ColorSchemeToggle;
