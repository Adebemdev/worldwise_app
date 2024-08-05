import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';
import { useGeolocation } from '../hooks/useGeolocation';
import Button from '../components/Button';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { useEffect, useState } from 'react';
import { useCities } from '../contexts/CitiesContext';

function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [searchParam] = useSearchParams();
  const { cities } = useCities();
  const mapLat = searchParam.get('lat');
  const mapLng = searchParam.get('lng');

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  // Synch mapposition with geolocation
  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? 'Loading...' : 'use your loacation'}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.name}</span>
            </Popup>
          </Marker>
        ))}

        <ChangePositon position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangePositon({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navaigate = useNavigate();

  useMapEvents({
    click: (e) => navaigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
