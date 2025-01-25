import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { isPending, mutate: signup } = useMutation({
    mutationFn: signupApi,
    onSuccess: (data) => {
      toast.success(
        "User successfully created! please varify the new user from the user's email address"
      );
    },
  });

  return { isPending, signup };
}
