import { useQuery } from "@tanstack/react-query";
import CreatePost from "../../components/home/createpost.component";
import Posts from "../../components/posts/posts.component";
import { useUser } from "../../lib/hooks/query/getUser";
const Home = () => {
  const { data } = useUser();
  // TODO : merge with usePost hook
  const { data: post } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/api/fun/get-posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      return res.json();
    },
  });

  return (
    <div className="w-full max-w-xl">
      <CreatePost user={data} />
      <Posts post={post} />
    </div>
  );
};

export default Home;
