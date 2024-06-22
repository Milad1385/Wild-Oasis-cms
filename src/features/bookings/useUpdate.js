import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

function useUpdate() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  const { mutate: updateHandler, isLoading: isUpdating } = useMutation({
    mutationFn: ({ id, breakfast }) =>
      updateBooking(id, {
        isPaid: true,
        status: "checked-in",
        ...breakfast,
      }),
    onSuccess: () => {
      toast.success(`booking ${id} checked in successfully`);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      navigate("/");
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateHandler, isUpdating };
}

export default useUpdate;
