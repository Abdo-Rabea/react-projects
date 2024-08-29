import { useSearchParams } from "react-router-dom";
import Select from "./Select";

//* this component only tells you in the url what value to sortBy
function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      value={sortBy}
      options={options}
      onChange={handleChange}
      type="white"
    />
  );
}

export default SortBy;
