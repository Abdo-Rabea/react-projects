import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkout, isPending: isCheckingout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      // queryClient.invalidateQueries({
      //   queryKey: ["booking"],
      // });

      //* really good way to do so
      queryClient.invalidateQueries({
        active: true,
      });
    },
    onError: (err) => {
      toast.error("there was an error while checking out");
      // console.log(err.message);
    },
  });
  return { checkout, isCheckingout };
}
