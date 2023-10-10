"use client";
import { APP_THEMES } from "@/lib/constants";
import { Theme } from "@/types/Theme";
import { Label } from "@radix-ui/react-label";
import { useContext, useId } from "react";
import VisuallyHidden from "../VisuallyHidden";
import { ThemeContext } from "../providers/ThemeProvider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/Select/Select";
import styles from "./ThemeSelect.module.css";

interface Props {}

const ThemeSelect = ({}: Props): JSX.Element => {
  const { theme, changeTheme } = useContext(ThemeContext);

  const handleChange = async (value: string): Promise<void> => {
    await changeTheme(value as Theme);
  };

  const id = useId();

  return (
    <>
      <VisuallyHidden>
        <Label htmlFor="theme">Select Theme</Label>
      </VisuallyHidden>
      <Select onValueChange={handleChange} value={theme}>
        <SelectTrigger
          title={"Change Theme"}
          id="theme"
          className={styles.trigger}
        >
          <SelectValue aria-label={theme}>{theme}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Themes</SelectLabel>
            {APP_THEMES.map((value) => (
              <SelectItem key={`${id}${value}`} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

export default ThemeSelect;
