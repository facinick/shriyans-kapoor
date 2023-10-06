import { APP_TITLE } from "@/lib/constants";
import { ColorSchemeToggle } from "../ColorSchemeToggle/ColorSchemeToggle";
import { ThemeSelect } from "../ThemeSelect/ThemeSelect";
import { UserDropdown } from "../UserDropdown/UserDropdown";
import { Box } from "../ui/Box/Box";
import { Flex } from "../ui/Flex/Flex";
import { Link } from "../ui/Link/Link";
import styles from './Header.module.css';

interface Props {
  children?: React.ReactNode;
}

export const Header = ({ children }: Props): JSX.Element => {
  return (
    <>
      <header className={styles.header}>
        <Flex align={"center"} justify={'between'}>
          <Link className={styles.title} href={'/'}>{APP_TITLE}</Link>
          <Box>
            <Flex align={"center"} gap={"2"}>
              <ColorSchemeToggle />
              <ThemeSelect />
              <UserDropdown />
            </Flex>
          </Box>
        </Flex>
      </header>
    </>
  );
}