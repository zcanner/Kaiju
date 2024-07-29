import Posts from "../../components/home/posts.component";
import Profile from "../../components/home/profile.component";

const UserPage = () => {
  /*
   * The user data is hardcoded for now to ignore the error
   */
  const data = {
    username: "username",
  };
  return (
    <>
      <Profile />
      <Posts post={data} />
    </>
  );
};

export default UserPage;
