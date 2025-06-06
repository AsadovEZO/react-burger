import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import useAuthCheck from "./user/auth-check";

interface IProtectedRouteElement {
  children: ReactNode;
  redirectTo: string;
  isAuthRequired: boolean;
}

export default function ProtectedRouteElement({
  children,
  redirectTo,
  isAuthRequired,
}: IProtectedRouteElement) {
  const location = useLocation();

  const { user, isLoading } = useAuthCheck();

  if (isLoading) {
    return <>{<div>Загрузка...</div>}</>;
  }

  if (isAuthRequired && !user) {
    return (
      <>{<Navigate to={redirectTo} state={{ from: location }} replace />}</>
    );
  }

  if (!isAuthRequired && user) {
    return <>{<Navigate to={redirectTo} replace />}</>;
  }

  return <>{children}</>;
}
