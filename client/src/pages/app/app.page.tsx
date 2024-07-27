import { useQuery } from "@tanstack/react-query";
import CreatePost from "../../components/home/createpost.component";
import Posts from "../../components/home/post.component";
import Navbar from "../../components/navbar/sidebar.component";
import axios from "axios";
import { useUser } from "../../lib/hooks/getUser";

const App = () => {
  const { data } = useUser();

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
