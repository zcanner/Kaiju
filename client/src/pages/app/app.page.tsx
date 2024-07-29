import { useQuery } from "@tanstack/react-query";
import CreatePost from "../../components/home/createpost.component";
import Posts from "../../components/home/post.component";
import { useUser } from "../../lib/hooks/getUser";
const Home = () => {
  const { data } = useUser();
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
    <>
      <CreatePost user={data} />
      <Posts post={post} />
    </>
  );
};

export default Home;
