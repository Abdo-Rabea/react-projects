import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numDays = Number(searchParams.get("last")) || 7;
  const queryDate = subDays(new Date(), numDays).toISOString();

  const {
    isLoading,
    data: stays,
    error,
  } = useQuery({
    queryKey: ["stays", numDays], // what an elegand feature
    queryFn: () => getStaysAfterDate(queryDate),
    retry: false,
  });

  const confirmedStays = stays?.filter((stay) => stay.status !== "unconfirmed");
  return { isLoading, confirmedStays, error, numDays };
}
