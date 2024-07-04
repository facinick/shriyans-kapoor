import { APP_TITLE } from '@/lib/constants';
import { headingFont } from '@/lib/helpers/font-helper';
import clsx from 'clsx';
import ColorSchemeToggle from '../ColorSchemeToggle';
import ThemeSelect from '../ThemeSelect';
import { Box } from '../ui/Box';
import { Flex } from '../ui/Flex';
import { Link } from '../ui/Link';
import styles from './Header.module.css';

interface Props {}

const Header = ({}: Props): JSX.Element => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.backdrop}></div>
        <Flex className={styles.content} align={'center'} justify={'between'}>
          <Link
            href={'/'}
            size={'lg'}
            className={clsx(styles.link, styles.title, headingFont.className)}
            title="Goto Home"
          >
            {APP_TITLE}
          </Link>
          <Box>
            <Flex align={'center'} gap={2}>
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

export default Header;
