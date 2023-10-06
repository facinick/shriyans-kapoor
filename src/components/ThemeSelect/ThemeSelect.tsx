"use client"
import { THEMES } from "@/lib/constants";
import { Theme } from "@/types/Theme";
import { useContext, useId } from "react";
import { ThemeContext } from "../providers/ThemeProvider";
import { Select } from "../ui/Select/Select";

interface Props {

}

export const ThemeSelect = ({ }: Props): JSX.Element => {

  const { theme, changeTheme } = useContext(ThemeContext)

  const handleChange = async (value: string): Promise<void> => {
    await changeTheme(value as Theme)
  }

  const id = useId()

  return (
    <>
      <Select.Root onValueChange={handleChange} value={theme}>
        <Select.Trigger />
        <Select.Content>
          {THEMES.map(
            (value) =>
              (<Select.Item key={`${id}${value}`} value={value}>{value}</Select.Item>)
          )}
        </Select.Content>
      </Select.Root>
    </>
  );
}