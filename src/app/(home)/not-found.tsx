import { Flex } from "@/components/ui/Flex";
import { Paragraph } from "@/components/ui/Typography";
import { APP_TITLE } from "@/lib/constants";

export const metadata = {
  title: `404 Not found • ${APP_TITLE}`,
};

const ERROR_MESSAGE = "404, page not found.";

async function NotFound() {
  return (
    <Flex direction={"column"} gap={5} asChild>
      <section>
        <Paragraph>{ERROR_MESSAGE}</Paragraph>
      </section>
    </Flex>
  );
}

export default NotFound;
