import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Profile from "../User/Profile";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const ProtectedRoute = ({ Component, stripeApiKey }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  return !loading && isAuthenticated ? (
    <Elements stripe={loadStripe(stripeApiKey)}>
      <Component />
    </Elements>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
