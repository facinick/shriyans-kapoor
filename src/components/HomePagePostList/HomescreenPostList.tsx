import { Post } from '@/types/Post';
import { z } from 'zod';
import HomescreenPost from '../HomePagePost';
import { Flex } from '../ui/Flex/Flex';
import { Paragraph } from '../ui/Typography/Paragraph';

interface Props {
  posts: z.infer<typeof Post>[];
}

const HomePagePostList = ({ posts }: Props): JSX.Element => {
  if (posts.length === 0) {
    return (
      <>
        <Paragraph>No posts, much empty!</Paragraph>
      </>
    );
  }

  return (
    <>
      <Flex gap={12} direction={'column'} asChild>
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
