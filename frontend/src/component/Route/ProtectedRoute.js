import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const ProtectedRoute = ({ Component, stripeApiKey }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }
  return (
    loading === false &&
    isAuthenticated === true && (
      <Elements stripe={loadStripe(stripeApiKey)}>
        <Component />
      </Elements>
    )
  );
};

export default ProtectedRoute;

// return loading === false && isAuthenticated === true ? (
//   <Elements stripe={loadStripe(stripeApiKey)}>
//     <Component />
//   </Elements>
// ) : (
//   <Navigate to="/login" />
// );
