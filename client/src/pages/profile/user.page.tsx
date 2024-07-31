import Profile from "../../components/profile/profile.component";
import Posts from "../../components/posts/posts.component";

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
