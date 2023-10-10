import { Link } from "../ui/Link";
import styles from "./ReadMore.module.css";
interface Props {
  href: string;
}

export const ReadMore = ({ href }: Props): JSX.Element => {
  return (
    <>
      <Link className={styles.link} href={href}>
        Read More
      </Link>
    </>
  );
};

export default ReadMore;
