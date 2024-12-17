import { SOCIALS } from '@/lib/constants';
import Image from 'next/image';
import SlideOnHoverText from '../SlideOnHoverText';
import { AspectRatio } from '../ui/aspect-ratio';
import { Flex } from '../ui/Flex';
import { Link } from '../ui/Link';
import { Nav } from '../ui/Nav/Nav';
import { Heading } from '../ui/Typography/Heading';
import styles from './Footer.module.css';

interface Props {}

const Footer = ({}: Props): JSX.Element => {
  return (
    <Flex
      asChild
      gap={4}
      direction={'column'}
      className={styles['footer-content']}
    >
      <footer className={styles.footer}>
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
                    target='_blank'
                    rel='noopener noreferrer'
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
                    target='_blank'
                    rel='noopener noreferrer'
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
        <AspectRatio className={styles.image} ratio={16 / 4}>
          <Image
            fill={true}
            height={0}
            alt={'abstract footer image'}
            src='/footer_image.jpg'
          ></Image>
          {/* <span>
            <Heading>FACINICK</Heading>
          </span> */}
        </AspectRatio>
      </footer>
    </Flex>
  );
};

export default Footer;
