"use client"
import { useContext } from "react";
import { Moon, Sun } from 'react-feather';
import { ThemeContext } from "../providers/ThemeProvider";
import { IconButton } from "../ui/IconButton/IconButton";
import styles from './ColorSchemeToggle.module.css';
interface Props { }

export const ColorSchemeToggle = ({ }: Props): JSX.Element => {

  const { colorScheme, toggleColorScheme } = useContext(ThemeContext)

  const handleToggle = async (): Promise<void> => {
    await toggleColorScheme()
  }

  return (
    <>
      <IconButton variant="surface" onClick={handleToggle}>
        {colorScheme === 'dark' ? <Sun className={styles['trigger-icon']} /> : <Moon className={styles['trigger-icon']} />}
      </IconButton>
    </>
  );
}