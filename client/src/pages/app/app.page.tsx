import CreatePost from "../../components/home/createpost.component";
import Posts from "../../components/home/post.component";
import Navbar from "../../components/navbar/sidebar.component";

const App = () => {
  return (
    <div className="w-full mx-auto">
      <div className="flex justify-center">
        <div>
          <Navbar />
        </div>
        <div className="w-full max-w-xl">
          <CreatePost />
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
