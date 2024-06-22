import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

function useGetBooking() {
  const { id } = useParams();
  const { data: booking, isLoading } = useQuery({
    queryKey: ["booking" , id],
    queryFn: () => getBooking(+id),
    retry: false,
  });

  return { booking, isLoading };
}

export default useGetBooking;
