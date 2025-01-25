import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const {
    mutate: updateUser,
    isPending,
    error,
  } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("user has been updated successfully");
    },
    onError: (error) => toast.error(error.message),
  });
  return { updateUser, isPending, error };
}
