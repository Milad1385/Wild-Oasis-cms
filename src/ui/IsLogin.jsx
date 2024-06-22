import React from "react";
import useAuthorized from "../features/authentication/useAuthorized";
import { Navigate } from "react-router-dom";

function IsLogin({ children }) {
  const { isAuthenticated } = useAuthorized();
  return isAuthenticated ? <Navigate to="/" /> : children;
}

export default IsLogin;
