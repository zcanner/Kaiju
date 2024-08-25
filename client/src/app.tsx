import { Outlet } from "react-router-dom";

import Sidebar from "./components/sidebar/sidebar.component";
import useAuth from "./lib/hooks/query/useAuth";

// TODO : make a context api for status and wrap everything in it to avoid prop drilling and repeating api calls in every component
const App = () => {
  const { data } = useAuth();
  return (
    <div className="w-full mx-auto">
      <div className="flex w-full justify-center">
        <Sidebar user={data} />
        <Outlet />
      </div>
    </div>
  );
};
export default App;
