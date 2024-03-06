import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { useEffect } from "react";
function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const navigate = useNavigate();
  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      map{" "}
      <p>
        Position: lat{lat}
        <br />
        lng: {lng}
      </p>
      {/* wow the state is changed everyWhere 
      you can shere it*/}
      <button onClick={() => setSearchParams({ lat: 20, lng: 40 })}>
        new city
      </button>
    </div>
  );
}

export default Map;
