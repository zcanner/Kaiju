import { useQuery } from "@tanstack/react-query";
import CreatePost from "../../components/home/createpost.component";
import Posts from "../../components/home/post.component";
import Navbar from "../../components/navbar/sidebar.component";
import { useUser } from "../../lib/hooks/getUser";
const App = () => {
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
      <div className="w-full mx-auto">
        <div className="flex w-full justify-center">
          <Navbar user={data} />
          <div className="w-full max-w-xl">
            <CreatePost user={data} />
            <Posts post={post} />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
