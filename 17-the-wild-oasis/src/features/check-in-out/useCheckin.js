import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: (boodingId) =>
      updateBooking(boodingId, {
        status: "checked-in",
        isPaid: true,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      // queryClient.invalidateQueries({
      //   queryKey: ["booking"],
      // });

      //* really good way to do so
      queryClient.invalidateQueries({
        active: true,
      });
      navigate("/");
    },
    onError: (err) => {
      toast.error("there was an error while checking in");
      // console.log(err.message);
    },
  });
  return { checkin, isCheckingIn };
}
