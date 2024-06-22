import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

function useGetAllBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  // filter

  const filtered = searchParams.get("status") || "all";
  const filter =
    !filtered || filtered === "all"
      ? null
      : { field: "status", value: filtered };

  // sort
  const sortType = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortType.split("-");
  const sortBy = { field, direction };

  // pagination

  const page = searchParams.get("page") || 1;
  let Page = Number(page);

  const { data, isLoading } = useQuery(["bookings", filter, sortBy, Page], () =>
    getAllBookings({ filter, sortBy, page: Page })
  );

  const pageCount = Math.ceil(data?.count / 2);

  if (Page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, Page + 1],
      queryFn: () => getAllBookings({ filter, sortBy, page: Page + 1 }),
    });

  if (Page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, Page - 1],
      queryFn: () => getAllBookings({ filter, sortBy, page: Page - 1 }),
    });

  return { data, isLoading };
}

export default useGetAllBookings;
