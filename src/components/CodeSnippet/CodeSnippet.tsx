import { Code } from "bright";
import clsx from "clsx";
import { ComponentProps } from "react";
import styles from "./CodeSnippet.module.css";

type CodeSnippetProps = ComponentProps<typeof Code>;

const CodeSnippet = ({ className, ...props }: CodeSnippetProps) => {
  return (
    <Code
      {...props}
      theme={{
        dark: "github-dark",
        light: "github-light",
        lightSelector: '[data-color-scheme="light"]',
      }}
      className={clsx(styles.wrapper, className)}
    />
  );
};

export default CodeSnippet;
