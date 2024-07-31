import { Outlet } from "react-router-dom";
import { useUser } from "./lib/hooks/query/getUser";
import Sidebar from "./components/sidebar/sidebar.component";
// TODO : make a context api for status and wrap everything in it to avoid prop drilling and repeating api calls in every component
const App = () => {
  const { data } = useUser();
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
