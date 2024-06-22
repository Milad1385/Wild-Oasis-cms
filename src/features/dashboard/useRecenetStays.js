import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numOfDays = !searchParams.get("last") ? 7 : searchParams.get("last");

  const numQuery = subDays(new Date(), numOfDays).toISOString();

  const { data: stays, isLoading } = useQuery({
    queryFn: () => getStaysAfterDate(numQuery),
    queryKey: ["stays", `last-${numOfDays}`],
  });

  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );


  return { confirmedStays: confirmedStays, isLoading };
}

export default useRecentStays;
