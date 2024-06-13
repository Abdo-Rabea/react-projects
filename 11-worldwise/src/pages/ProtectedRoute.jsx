import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

// you can use it to wrap all childs in the applayout but it is more convenient to do so in the app in the route
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // this doesn't work if you are accessing the composite route
  //    I think this is because you are navigate to "/" after the app and then to cities
  //  so use useEffect
  // if (!isAuthenticated) {
  //   console.log("not auth");
  //   navigate("/");
  // }

  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );
  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
