// //
// note if there is no latitude and longitude this api will use you geolocation and return you data
// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const flagemojiToPNG = (flag) => {
  var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join("");
  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
  );
};

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
function Form() {
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [lat, lng] = useUrlPosition();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emojiCode, setEmojiCode] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const { createCity } = useCities();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true);
        setError("");
        const response = await fetch(
          BASE_URL + `?latitude=${lat}&longitude=${lng}`
        );
        const data = await response.json();
        if (!data.countryCode)
          throw new Error("it is not a city. click somewhere else");
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmojiCode(data.countryCode || "");
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  // handler can be async function
  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji: convertToEmoji(emojiCode),
      date,
      notes,
      position: {
        lat,
        lng,
      },
    };
    // async. function will return a promise
    await createCity(newCity);
    navigate("/app/cities");
  }

  if (!lat && !lng)
    return <Message message="start by clicking anywhere in the map" />;
  if (!lat) if (error) return <Message message={error} />;
  if (isLoadingGeocoding) return <Spinner />;
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>
          {emojiCode && flagemojiToPNG(convertToEmoji(emojiCode))}
        </span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          dateFormat="dd/MM/yyyy"
          onChange={(data) => {
            setDate(data);
          }}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
