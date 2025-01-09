import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const { isPending, mutate: login } = useMutation({
    //* it is mutation because something is mutated in the server
    //* and also it is easer to handle onEvents
    //* also it is called on the form submission and not when the component mounts
    mutationFn: loginApi,
    onSuccess: (user) => {
      toast.success("user login successfully");
      navigate("/");
    },
    onError: () => {
      toast.error("email or password are incorrect");
    },
  });
  return { isPending, login };
}
