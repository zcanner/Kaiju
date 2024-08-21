import { createBrowserRouter } from "react-router-dom";

import RootPage from "./pages/auth/root.page";
import LoginPage from "./pages/auth/login.page";
import SignupPage from "./pages/auth/signup.page";

import UserPage from "./pages/profile/user.page";
import EditProfile from "./pages/profile/editProfile.component";

// prettier-ignore
import { ProtectedRoutes, Public }from  "./components/controller/protected.routes";

import Home from "./pages/app/home.page";
import PostPage from "./pages/post/post.page";
import Saved from "./pages/app/saved.page";

import App from "./app";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Public to="/home">
        <RootPage />
      </Public>
    ),
  },
  {
    path: "/login",
    element: (
      <Public to="/home">
        <LoginPage />
      </Public>
    ),
  },
  {
    path: "/signup",
    element: (
      <Public to="/home">
        <SignupPage />
      </Public>
    ),
  },
  {
    element: (
      <ProtectedRoutes to="/">
        <App />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "editprofile",
        element: <EditProfile />,
      },
      {
        path: "saved",
        element: <Saved />,
      },
      {
        path: ":username",
        element: <UserPage />,
        errorElement: (
          <div className="w-full max-w-xl items-center h-dvh content-center">
            <div className="flex justify-center">
              <span className="text-3xl font-bold">User Not Found</span>
            </div>
          </div>
        ),
      },
      {
        path: "post",
        element: <PostPage />,
        children: [
          {
            path: ":username",
            children: [
              {
                path: ":postID",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: (
      <div className="w-full items-center p-10">
        <div className="flex justify-center text-center">
          <div>
            <h1 className="text-3xl font-bold">Oops!</h1>
            <p className="text-lg label-text font-medium">
              you seem to have arrived at nowhere. <br />
              The page you are looking for doesn't exist.
            </p>
          </div>
        </div>
      </div>
    ),
  },
]);

export default router;
