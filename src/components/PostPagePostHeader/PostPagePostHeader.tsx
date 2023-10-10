import { Link } from "@/components/ui/Link";
import { Heading } from "@/components/ui/Typography";
import { headingFont } from "@/lib/helpers/font-helper";
import { ArrowLeft } from "lucide-react";
import styles from "./PostPagePostHeader.module.css";

interface Props {
  children?: React.ReactNode;
  backLink: string;
}

export const PostPagePostHeader = ({
  children,
  backLink,
}: Props): JSX.Element => {
  return (
    <>
      <Heading level={2} asChild className={headingFont.className}>
        <h2>
          <Link href={backLink} title="Go Back">
            {" "}
            <ArrowLeft />
          </Link>
          <span className={styles["title"]}>{children}</span>
        </h2>
      </Heading>
    </>
  );
};

export default PostPagePostHeader;
