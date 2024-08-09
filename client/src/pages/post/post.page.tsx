import { useParams } from "react-router-dom";
import Post from "../../components/posts/post.component";
import Posts from "../../components/posts/posts.component";
import usePost from "../../lib/hooks/query/usePost";

const PostPage = () => {
  const { postID } = useParams();
  const { data } = usePost(postID!);
  return (
    <>
      <Post />

      <Posts post={data} />
    </>
  );
};

export default PostPage;
