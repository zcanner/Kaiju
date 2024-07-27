import Posts from "../../components/home/post.component";
import Profile from "../../components/home/profile.component";
import Navbar from "../../components/navbar/sidebar.component";

const UserPage = () => {
  return (
    <div className="w-full mx-auto">
      <div className="flex justify-center">
        <Navbar />
        <div className="w-full max-w-xl">
          <Profile />
          <Posts />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
