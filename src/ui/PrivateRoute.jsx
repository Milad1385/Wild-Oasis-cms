import React, { useEffect } from "react";
import supabase from "../services/supabase";
import useAuthorized from "../features/authentication/useAuthorized";
import styled from "styled-components";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

const LoaderContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

function PrivateRoute({ children }) {
  const { user, isLoading, isAuthenticated } = useAuthorized();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated, isLoading]);

  if (isLoading) {
    return (
      <LoaderContainer>
        <Spinner />
      </LoaderContainer>
    );
  }

  if (isAuthenticated) return children;
}

export default PrivateRoute;
