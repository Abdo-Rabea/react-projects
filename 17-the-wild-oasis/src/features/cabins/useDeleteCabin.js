import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useDeleteCabin() {
  //! you have 2 hooks here so it is a good idea to have them here in custom hook
  const queryClient = useQueryClient(); //* to access invalidateQueries
  const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
    // mutationFn: (id)=> deleteCabin(id)  //* since it is the same parameter
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success("cabin deleted successfully");
      queryClient.invalidateQueries({
        // make cabins invalid so force re-fetching
        queryKey: ["cabins"],
      });
    },
    //* here after calling async. function you are just diplaying the message of the thrown error
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteCabin };
}
