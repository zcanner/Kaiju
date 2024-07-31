import { Outlet } from "react-router-dom";
import { useUser } from "./lib/hooks/query/getUser";
import Navbar from "./components/navbar/sidebar.component";

const App = () => {
  const { data } = useUser();
  return (
    <div className="w-full mx-auto">
      <div className="flex w-full justify-center">
        <Navbar user={data} />
        <Outlet />
      </div>
    </div>
  );
};
export default App;
