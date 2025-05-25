import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import useAuthCheck from "./user/auth-check";

export default function ProtectedRouteElement({
  children,
  redirectTo,
  isAuthRequired,
}) {
  const location = useLocation();

  const { user, isLoading } = useAuthCheck();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (isAuthRequired && !user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (!isAuthRequired && user) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}

ProtectedRouteElement.propTypes = {
  children: PropTypes.node.isRequired,
  redirectTo: PropTypes.string.isRequired,
  isAuthRequired: PropTypes.bool.isRequired,
};
