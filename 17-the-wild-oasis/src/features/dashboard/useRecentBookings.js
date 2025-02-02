import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const numDays = Number(searchParams.get("last")) || 7;
  const queryDate = subDays(new Date(), numDays).toISOString();

  const {
    isLoading,
    data: recentBookings,
    error,
  } = useQuery({
    queryKey: ["recentBookings", numDays], // what an elegand feature
    queryFn: () => getBookingsAfterDate(queryDate),
    retry: false,
  });
  return { isLoading, recentBookings, error };
}
