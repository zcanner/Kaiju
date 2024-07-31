import { lazy } from "react";

const Profile = lazy(() => import("../../components/home/profile.component"));
const Posts = lazy(() => import("../../components/home/posts.component"));

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
