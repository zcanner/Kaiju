import { Outlet } from "react-router-dom";
import { useUser } from "./lib/hooks/getUser";
import Navbar from "./components/navbar/sidebar.component";

const App = () => {
  const { data } = useUser();
  return (
    <div className="w-full mx-auto">
      <div className="flex w-full justify-center">
        <Navbar user={data} />
        <div className="w-full max-w-xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default App;
