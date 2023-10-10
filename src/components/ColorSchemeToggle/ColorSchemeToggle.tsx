"use client";
import { Moon, Sun } from "lucide-react";
import { useContext } from "react";
import VisuallyHidden from "../VisuallyHidden";
import { ThemeContext } from "../providers/ThemeProvider";
import { Button } from "../ui/Button/Button";
interface Props {}

const ColorSchemeToggle = ({}: Props): JSX.Element => {
  const { colorScheme, toggleColorScheme } = useContext(ThemeContext);

  const handleToggle = async (): Promise<void> => {
    await toggleColorScheme();
  };

  return (
    <>
      <Button
        title={colorScheme === "dark" ? "Light Mode" : "Dark Mode"}
        size="icon"
        variant={"secondary"}
        onClick={handleToggle}
      >
        {colorScheme === "dark" ? <Sun /> : <Moon />}
        <VisuallyHidden>Color Scheme Toggle</VisuallyHidden>
      </Button>
    </>
  );
};

export default ColorSchemeToggle;
