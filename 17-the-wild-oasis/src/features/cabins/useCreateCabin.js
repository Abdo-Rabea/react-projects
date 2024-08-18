import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin(reset) {
  const queryClient = useQueryClient();

  const { isPending: isCreatingCabin, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("cabin added successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      //todo: close the modal
      //! instead of reset here i will reset after onSuccess in the mutate function calling
      //! reset();
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCreatingCabin, createCabin };
}
