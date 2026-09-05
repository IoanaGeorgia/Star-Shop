import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import LoadingPage from "./LoadingPage";

const GuestRoute = () => {

  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.isLoading);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default GuestRoute;