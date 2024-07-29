import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import RootPage from "./pages/auth/root.page";
import LoginPage from "./pages/auth/login.page";
import SignupPage from "./pages/auth/signup.page";
import App from "./pages/app/app.page";

const UserPage = lazy(() => import("./pages/app/user.page"));

import {
  ProtectedRoutes,
  Public,
} from "./components/controller/protected.routes";

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
    path: "/home",
    element: (
      <ProtectedRoutes to="/">
        <App />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/:username",
    element: (
      <Suspense fallback={<h1>Loading</h1>}>
        <UserPage />
      </Suspense>
    ),
    errorElement: <h1>404</h1>,
  },
]);

export default router;
