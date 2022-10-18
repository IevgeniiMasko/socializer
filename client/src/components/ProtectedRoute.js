import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { authUserAccessTokenSelector } from "../store/auth/selectors";

const ProtectedRoute = ({ isProtected, element }) => {
  const loggedIn = useSelector(authUserAccessTokenSelector);

  const condition = (isProtected && loggedIn) || (!isProtected && !loggedIn);

  if (condition) {
    return element;
  }
  return <Navigate to={isProtected ? "/" : "/newsfeed"} />;
};

export default ProtectedRoute;
