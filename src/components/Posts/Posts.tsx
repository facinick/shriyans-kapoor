import { Frontmatter } from "@/types/Post";
import { Post } from "../Post/Post";
import { Flex } from "../ui/Flex/Flex";
import { Paragraph } from "../ui/Typography/Paragraph";

interface Props {
  posts: (Frontmatter & {
    slug: string;
  })[];
}

export const Posts = ({ posts }: Props): JSX.Element => {
  if (posts.length === 0) {
    return (
      <>
        <Paragraph>No posts on this page</Paragraph>
      </>
    );
  }

  return (
    <>
      <Flex gap={12} direction={"column"}>
        {posts.map((post) => {
          return <Post key={post.slug} post={post} />;
        })}
      </Flex>
    </>
  );
};
