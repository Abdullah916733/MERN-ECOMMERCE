import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Profile from "../User/Profile";

const ProtectedRoute = ({ Component }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return !loading && isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
