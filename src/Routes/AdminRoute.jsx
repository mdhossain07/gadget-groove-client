import { Navigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import PropTypes from "prop-types";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();

  if (loading || isAdminLoading) {
    return (
      <span className="mt-20 loading loading-spinner text-info tex-2xl text-center"></span>
    );
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

AdminRoute.propTypes = {
  children: PropTypes.node,
};

export default AdminRoute;
