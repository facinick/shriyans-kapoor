import { APP_TITLE } from "@/lib/constants";
import { sourceSans3 } from "@/lib/helpers/font-helper";
import clsx from "clsx";
import ColorSchemeToggle from "../ColorSchemeToggle";
import { ThemeSelect } from "../ThemeSelect/ThemeSelect";
import { Box } from "../ui/Box/Box";
import { Flex } from "../ui/Flex/Flex";
import { Link } from "../ui/Link/Link";
import { Heading } from "../ui/Typography/Heading";
import styles from "./Header.module.css";

interface Props {
  children?: React.ReactNode;
}

export const Header = ({ children }: Props): JSX.Element => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.backdrop}></div>
        <Flex className={styles.content} align={"center"} justify={"between"}>
          <Link href={"/"}>
            <Heading
              asChild
              className={clsx(styles.title, sourceSans3.className)}
            >
              <h1>{APP_TITLE}</h1>
            </Heading>
          </Link>
          <Box>
            <Flex align={"center"} gap={2}>
              <ColorSchemeToggle />
              <ThemeSelect />
              {/* <UserDropdown /> */}
            </Flex>
          </Box>
        </Flex>
      </header>
    </>
  );
};
