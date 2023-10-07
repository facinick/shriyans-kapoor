"use client"
import { Moon, Sun } from 'lucide-react';
import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";
import { Button } from "../ui/Button/Button";
interface Props { }

export const ColorSchemeToggle = ({ }: Props): JSX.Element => {

  const { colorScheme, toggleColorScheme } = useContext(ThemeContext)

  const handleToggle = async (): Promise<void> => {
    await toggleColorScheme()
  }

  return (
    <>
      <Button size="icon" variant={"secondary"} onClick={handleToggle}>
        {colorScheme === 'dark' ? <Sun/> : <Moon/>}
      </Button>
    </>
  );
}