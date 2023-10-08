import { Link } from "../ui/Link/Link";

interface Props {
  href: string;
}

export const ReadMore = ({ href }: Props): JSX.Element => {
  return (
    <>
      <Link href={href}>Read More</Link>
    </>
  );
};
