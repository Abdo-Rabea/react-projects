import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styles from "./City.module.css";
import { useCities } from "../contexts/CitiesContext";
import { useEffect } from "react";
import Spinner from "./Spinner";
import Button from "./Button";
import BackButton from "./BackButton";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

const flagemojiToPNG = (flag) => {
  var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join("");
  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
  );
};

function City() {
  const navigate = useNavigate();
  // note that you will need to fetch data for the single api even if you have all cities in the cities but
  // in reall world you don't the single object of one city has more data than all cities
  const { currentCity, getCity, isLoading } = useCities();
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  // console.log(searchParams);
  // const lat = searchParams.get("lat");
  // const lng = searchParams.get("lng");

  // if (isLoading) return <Spinner />;
  // you can't do this here as useEffect hook will not be called in the same order (you can't do early return)
  useEffect(
    function () {
      getCity(id);
    },
    [getCity, id]
  );

  if (isLoading) return <Spinner />;
  // console.log(currentCity);
  const { cityName, emoji, date, notes } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
