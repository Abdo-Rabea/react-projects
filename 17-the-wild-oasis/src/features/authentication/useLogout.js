import {
  QueryClient,
  useMutation,
  useQueries,
  useQueryClient,
} from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isPending, mutate: logout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      toast.success("user loged out successfully");
      queryClient.removeQueries(); // if you don't do so the use will be cashed in react query and making unexpected behavier
      navigate("/login", { replace: true });
    },
    onError: () => {
      toast.error("Error gone with logining out");
    },
  });
  return { isPending, logout };
}
