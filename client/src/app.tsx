import React, { createContext } from "react";
import { Outlet } from "react-router-dom";

import useAuth from "./lib/hooks/query/useAuth";
import Sidebar from "./components/sidebar/sidebar.component";

/**
 * AuthContext is a context provider that provides the user data to the entire app
 */
export const AuthContext = createContext<any>({ data: null });

const App: React.FC = () => {
  const { data } = useAuth();

  return (
    <div className="w-full mx-auto">
      <div className="flex w-full justify-center">
        <AuthContext.Provider value={{ data }}>
          <Sidebar />
          <Outlet />
        </AuthContext.Provider>
      </div>
    </div>
  );
};

export default App;
