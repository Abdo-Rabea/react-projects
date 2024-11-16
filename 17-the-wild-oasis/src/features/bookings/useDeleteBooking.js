import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export default function useDeleteBooking() {
  //! you have 2 hooks here so it is a good idea to have them here in custom hook
  const queryClient = useQueryClient(); //* to access invalidateQueries
  const { isPending: isDeleting, mutate: deleteBooking } = useMutation({
    // mutationFn: (id)=> deleteBookingApi(id)  //* since it is the same parameter
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success("booking deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    //* here after calling async. function you are just diplaying the message of the thrown error
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteBooking };
}
