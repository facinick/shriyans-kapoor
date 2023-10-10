import { Frontmatter } from "@/types/Post";
import HomescreenPost from "../HomescreenPost";
import { Flex } from "../ui/Flex/Flex";
import { Paragraph } from "../ui/Typography/Paragraph";

interface Props {
  posts: (Frontmatter & {
    slug: string;
  })[];
}

const HomePagePostList = ({ posts }: Props): JSX.Element => {
  if (posts.length === 0) {
    return (
      <>
        <Paragraph>No posts on this page</Paragraph>
      </>
    );
  }

  return (
    <>
      <Flex gap={12} direction={"column"} asChild>
        <ul>
          {posts.map((post) => {
            return (
              <li key={post.slug}>
                <HomescreenPost post={post} />
              </li>
            );
          })}
        </ul>
      </Flex>
    </>
  );
};

export default HomePagePostList;
