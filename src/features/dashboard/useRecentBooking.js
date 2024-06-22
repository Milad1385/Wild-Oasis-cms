import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

function useRecentBooking() {
  const [searchParams] = useSearchParams();
  const numOfDays = !searchParams.get("last") ? 7 : searchParams.get("last");

  const numQuery = subDays(new Date(), numOfDays).toISOString();

  const { data: bookings, isLoading } = useQuery({
    queryFn: () => getBookingsAfterDate(numQuery),
    queryKey: ["booking", `last-${numOfDays}`],
  });

  return { bookings, isLoading, numOfDays };
}

export default useRecentBooking;
