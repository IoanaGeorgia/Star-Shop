import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import LoadingPage from "./LoadingPage";

const UserRoute = () => {

  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.isLoading);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!user) {
    return <Navigate to="/register" replace />;
  }
  return <Outlet />;
};

export default UserRoute;