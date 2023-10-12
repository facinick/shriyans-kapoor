import TerminalAnimationText from "@/components/TerminalAnimationText";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { APP_TITLE } from "@/lib/constants";
import styles from "./not-found.module.css";

export const metadata = {
  title: `404 Not found • ${APP_TITLE}`,
};

const ERROR_MESSAGE = "404, page not found.";

async function NotFound() {
  return (
    <Card className={styles.card}>
      <CardHeader>
        <CardTitle className={styles.title}>
          <TerminalAnimationText>{ERROR_MESSAGE}</TerminalAnimationText>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

export default NotFound;
