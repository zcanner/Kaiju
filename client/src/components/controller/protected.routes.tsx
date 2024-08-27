import useAuth from "../../lib/hooks/query/useAuth";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({
  children,
  to,
}: {
  children: React.ReactNode;
  to: string;
}) => {
  const { data, isError, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data?.isAuth) {
    return <Navigate to={to} />;
  }

  return <>{children}</>;
};

const Public = ({
  children,
  to,
}: {
  children: React.ReactNode;
  to: string;
}) => {
  const { data, isError, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || data?.isAuth) {
    return <Navigate to={to} />;
  }

  return <>{children}</>;
};

export { ProtectedRoutes, Public };
