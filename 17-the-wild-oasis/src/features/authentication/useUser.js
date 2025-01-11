import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ["user"], // what an elegand feature
    queryFn: getCurrentUser,
  });
  return {
    isLoading,
    user,
    error,
    isAuth: user?.role === "authenticated" ? true : false,
  };
}
