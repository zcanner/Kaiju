import { useEffect } from "react";
import { useParams } from "react-router-dom";

import usePosts from "../../lib/hooks/query/usePosts";

import Post from "../../components/posts/post.component";
import Posts from "../../components/posts/posts.component";

const PostPage = () => {
  const { postID } = useParams();
  const { data: posts, refetch } = usePosts("comment", postID);

  useEffect(() => {
    refetch();
  }, [postID]);

  return (
    <div className="border-b border-ghostbg w-full max-w-xl ">
      <Post />
      <Posts post={posts} />
    </div>
  );
};

export default PostPage;
