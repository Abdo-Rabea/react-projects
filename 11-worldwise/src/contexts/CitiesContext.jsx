import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/cities`);
        setCities(await response.json());
      } catch (e) {
        alert("error");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the context provider");
  console.log(context);
  return context;
}
export { CitiesProvider, useCities };
