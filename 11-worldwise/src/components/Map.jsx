import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";
function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  // the power of having global state (you need it just use it)
  const { cities } = useCities();
  const {
    position: geoLocationPosition,
    getPosition,
    isLoading: isLoadingPosition,
  } = useGeolocation();

  const [mapLat, mapLng] = useUrlPosition();

  // note you are now syncronize
  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng, setMapPosition]
  );

  // you are know sync. the mapPosition with geoLocationPosition
  useEffect(() => {
    if (geoLocationPosition) {
      setMapPosition(geoLocationPosition);
    }
  }, [geoLocationPosition]);
  return (
    <div className={styles.mapContainer}>
      <MapContainer
        // the center is not reactive so it will not change the map position when lat and lng changes when you click */}
        center={mapPosition}
        zoom={8}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {/* city.position.lat, lng */}
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>{city.cityName + " " + city.emoji}</Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
      {!geoLocationPosition && (
        <Button
          type="position"
          onClick={function () {
            getPosition();
            // get position is async. so cl(position) will give you null
            // setMapPosition(position);
          }}
        >
          {isLoadingPosition ? "Loading..." : "use your position"}
        </Button>
      )}
    </div>
  );
}
// just follow the recipe of the documentation
function ChangeCenter({ position }) {
  // custome hook of react leaflet library
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
}
export default Map;
