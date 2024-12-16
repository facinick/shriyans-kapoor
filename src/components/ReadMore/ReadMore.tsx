import SlideOnHoverText from '../SlideOnHoverText';
import { Link } from '../ui/Link';
import styles from './ReadMore.module.css';
interface Props {
  href: string;
  children?: React.ReactNode;
}

export const ReadMore = ({ href, children }: Props): JSX.Element => {
  return (
    <>
      <Link className={styles['read-more-link']} href={href}>
        {' '}
        <SlideOnHoverText>{children}</SlideOnHoverText>
      </Link>
    </>
  );
};

export default ReadMore;
