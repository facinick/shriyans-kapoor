import { Link } from "@/components/ui/Link/Link";
import { Heading } from "@/components/ui/Typography/Heading";
import { headingFont } from "@/lib/helpers/font-helper";
import { ArrowLeft } from "lucide-react";
import styles from "./PostHeader.module.css";
interface Props {
  children?: React.ReactNode;
  backLink: string;
}

export const PostHeader = ({ children, backLink }: Props): JSX.Element => {
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
