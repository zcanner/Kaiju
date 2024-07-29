import Posts from "../../components/home/post.component";
import Profile from "../../components/home/profile.component";
import Navbar from "../../components/navbar/sidebar.component";

const UserPage = () => {
  /*
   * The user data is hardcoded for now to ignore the error
   */
  const data = {
    username: "username",
  };
  return (
    <div className="w-full mx-auto">
      <div className="flex justify-center">
        <Navbar />
        <div className="w-full max-w-xl">
          <Profile />
          <Posts post={data} />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
