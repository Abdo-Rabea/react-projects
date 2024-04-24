import { useSearchParams } from "react-router-dom";

// your are making custom hook on top of react-router hook
export function useUrlPosition() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return [lat, lng];
}
