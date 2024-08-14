import CreatePost from "../../components/home/createpost.component";
import Posts from "../../components/posts/posts.component";
import { useUser } from "../../lib/hooks/query/getUser";
import usePosts from "../../lib/hooks/query/usePosts";
const Home = () => {
  const { data } = useUser();
  // TODO : merge with usePost hook
  const { data: post } = usePosts();
  return (
    <div className="w-full max-w-xl">
      <CreatePost user={data} />
      <Posts post={post} />
    </div>
  );
};

export default Home;
