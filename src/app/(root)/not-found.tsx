import TerminalAnimationText from '@/components/TerminalAnimationText';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Link } from '@/components/ui/Link';
import { APP_TITLE } from '@/lib/constants';
import styles from './not-found.module.css';

export const metadata = {
  title: `404 Not found • ${APP_TITLE}`,
};

const ERROR_MESSAGE = '404, page not found.';

async function NotFound() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <TerminalAnimationText>{ERROR_MESSAGE}</TerminalAnimationText>
        </CardTitle>
        <CardDescription className={styles.description}>
          <Link href={'/'}>Go Home</Link>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export default NotFound;
