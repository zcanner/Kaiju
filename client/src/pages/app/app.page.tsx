import { useQuery } from "@tanstack/react-query";
import CreatePost from "../../components/home/createpost.component";
import Posts from "../../components/home/post.component";
import Navbar from "../../components/navbar/sidebar.component";
import axios from "axios";

const App = () => {
  const getUser = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/user/", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.error) throw new Error(res.data.error);

      return res.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  return (
    <div className="w-full mx-auto">
      <div className="flex justify-center">
        <div>
          <Navbar />
        </div>
        <div className="w-full max-w-xl">
          <CreatePost user={data} />
          <Posts />
        </div>
        <div>
          <Navbar />
        </div>
      </div>
    </div>
  );
};

export default App;
