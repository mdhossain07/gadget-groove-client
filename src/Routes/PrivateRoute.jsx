import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (user) {
    return children;
  }

  if (loading) {
    return (
      <span className="mt-20 loading loading-spinner text-info tex-2xl text-center"></span>
    );
  }
  return <Navigate to="/login" replace></Navigate>;
};

export default PrivateRoute;
