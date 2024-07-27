import CreatePost from "../../components/home/createpost.component";
import Posts from "../../components/home/post.component";
import Navbar from "../../components/navbar/sidebar.component";
import { useUser } from "../../lib/hooks/getUser";

const App = () => {
  const { data } = useUser();

  return (
    <div className="w-full mx-auto">
      <div className="flex w-full justify-center">
        <Navbar />
        <div className="w-full max-w-xl">
          <CreatePost user={data} />
          <Posts />
        </div>
      </div>
    </div>
  );
};

export default App;
