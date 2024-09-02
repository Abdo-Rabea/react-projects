import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //*Filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" };

  //*SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  //*PAGINATION
  const page = Number(searchParams.get("page")) || 1;

  //* query
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page], // what an elegand feature
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  //* prefetching
  const numPages = Math.ceil(count / PAGE_SIZE);
  if (page < numPages)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1], // what an elegand feature
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  //* you need to still prefetch previous this because there is a combination of other stuff like filter , sorting
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1], // what an elegand feature
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  return { isLoading, bookings, error, count };
}
