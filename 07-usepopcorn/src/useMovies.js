import { useEffect, useState } from "react";

const key = "85c62a61";

// this is the customHook
export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // the problem of useing fetch outside useEffect is that you first don't follow the rule of (don't use SIDE EFFECT inside render logic)
  useEffect(
    function () {
      callback?.(null);
      const controller = new AbortController(); // is a browser api like fetch
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${key}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");
          // wait for the promise to be resolved and get data (res.json() returns a promise)
          const data = await res.json();
          console.log(data);
          if (data.Response === "False") throw new Error("no movies found");
          setMovies(data.Search);
          console.log(data.Search);
          // works really nice
          // res.json().then((data) => setMovies(data.Search));
        } catch (err) {
          console.log(err.name);
          if (err.name !== "AbortError") setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      //   handleSelectMovie(null);
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query, callback]
  );
  return { movies, isLoading, error };
}
