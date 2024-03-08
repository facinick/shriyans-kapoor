import { SOCIALS } from "@/lib/constants";
import { Nav } from "../ui/Nav/Nav";
import { Heading } from "../ui/Typography/Heading";
import styles from "./Footer.module.css";
import { Flex } from "../ui/Flex";
import { Box } from "../ui/Box/Box";

interface Props { }

const Footer = ({ }: Props): JSX.Element => {
  return (

    <footer className={styles.footer}>
      <Box className={styles['footer-content']}>
        <Heading level={6} asChild className={styles['links-category']}>
          <h6>contact</h6>
        </Heading>

        <Flex asChild direction={"column"} className={styles['nav']}>
          <Nav>
            <a href={SOCIALS.telegram} target="_blank" rel="noopener noreferrer">telegram</a>
            <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer">github</a>
            <a href={SOCIALS.gmail}>gmail</a>
          </Nav>
        </Flex>
      </Box>
    </footer>


  );
};

export default Footer;
