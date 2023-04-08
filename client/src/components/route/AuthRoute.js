import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = ({ isAuth, children, adminRoute, isAdmin }) => {
  if (!isAuth) {
    return <Navigate to="/login-signup" />;
  }
  if (adminRoute && !isAdmin) {
    return <Navigate to="/" />;
  }
  return children ? children : <Outlet />;
};

export default AuthRoute;
