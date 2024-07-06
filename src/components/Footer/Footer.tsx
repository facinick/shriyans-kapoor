import { SOCIALS } from '@/lib/constants';
import { Nav } from '../ui/Nav/Nav';
import { Heading } from '../ui/Typography/Heading';
import styles from './Footer.module.css';
import { Flex } from '../ui/Flex';
import { Box } from '../ui/Box/Box';
import { Link } from '../ui/Link';
import SlideOnHoverText from '../SlideOnHoverText';

interface Props { }

const Footer = ({ }: Props): JSX.Element => {
  return (
    <footer className={styles.footer}>
      <Box className={styles['footer-content']}>
        <Heading level={6} asChild className={styles['links-category']}>
          <span>contact</span>
        </Heading>

        <Flex asChild direction={'column'} className={styles['nav']}>
          <Nav>
            <Flex
              asChild
              justify={'center'}
              direction={'column'}
              align={'start'}
              gap={2}
            >
              <ul>
                <li>
                  <Link
                    className={styles['footer-link']}
                    href={SOCIALS.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SlideOnHoverText slideOnHoverCharacter=':) '>
                      message on telegram
                    </SlideOnHoverText>
                  </Link>
                </li>
                <li>
                  <Link
                    className={styles['footer-link']}
                    href={SOCIALS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SlideOnHoverText slideOnHoverCharacter='# '>
                      view github
                    </SlideOnHoverText>
                  </Link>
                </li>
                <li>
                  <Link className={styles['footer-link']} href={SOCIALS.gmail}>
                    <SlideOnHoverText slideOnHoverCharacter='@ '>
                      mail on gmail
                    </SlideOnHoverText>
                  </Link>
                </li>
              </ul>
            </Flex>
          </Nav>
        </Flex>
      </Box>
    </footer>
  );
};

export default Footer;
