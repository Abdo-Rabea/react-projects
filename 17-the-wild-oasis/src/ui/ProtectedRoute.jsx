import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useEffect } from "react";
const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //1. load auth. user
  const { isLoading, user, isAuth } = useUser();

  useEffect(
    function () {
      if (!isLoading && !isAuth) navigate("/login");
    },
    [isAuth, navigate, isLoading]
  );
  //2. while loading show spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  //3. if !auth redirect to login
  // if (!isAuth) navigate("/login"); in the custome hook

  //4. if auth redirect to home (or the openned page) "render the app"
  if (isAuth) return children;
}

export default ProtectedRoute;
