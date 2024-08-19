import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

/**
 * @param
 * @returns {isLoading,  getSettings}
 */
export function useSettings() {
  const {
    isPending,
    error,
    data: settings,
  } = useQuery({
    queryKey: ["settings"],
    //! getSettings need to be a function that returns a promise (async. one)
    queryFn: getSettings,
  });
  return { isPending, settings, error };
}
