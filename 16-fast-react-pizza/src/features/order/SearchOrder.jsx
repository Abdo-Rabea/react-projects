import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }
  return (
    <form action="" onSubmit={handleSubmit} className="md:ml-auto md:mr-4">
      <input
        className="w-28 rounded-full border bg-yellow-100 px-4 py-2 text-sm outline-none ring-yellow-400 ring-opacity-50 transition-all duration-300 placeholder:text-stone-400 focus:ring sm:w-64 sm:focus:w-72"
        type="text"
        name=""
        id=""
        value={query}
        placeholder="Search Order #"
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

export default SearchOrder;
