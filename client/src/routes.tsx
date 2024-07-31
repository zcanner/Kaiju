import { createBrowserRouter } from "react-router-dom";
import RootPage from "./pages/auth/root.page";
import LoginPage from "./pages/auth/login.page";
import SignupPage from "./pages/auth/signup.page";

import UserPage from "./pages/profile/user.page";

import {
  ProtectedRoutes,
  Public,
} from "./components/controller/protected.routes";
import Home from "./pages/app/home.page";
import App from "./app";
import EditProfile from "./pages/profile/editProfile.component";
import Post from "./components/posts/post.component";

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
        path: ":username",
        element: <UserPage />,
        errorElement: <h1>404</h1>,
      },
      {
        path: "post",
        element: <Post />,
        children: [
          {
            path: ":postID",
          },
        ],
      },
    ],
  },
]);

export default router;
