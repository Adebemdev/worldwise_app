import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';

function Map() {
  const [searchParam, setSearchParam] = useSearchParams();
  const navaigate = useNavigate();

  const lat = searchParam.get('lat');
  const lng = searchParam.get('lng');

  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navaigate('form');
      }}
    >
      <h1>
        Position: {lat}, {lng}
      </h1>
      <button
        onClick={() => {
          setSearchParam({ lat: 23.8, lng: 34.9 });
        }}
      >
        Change position
      </button>
    </div>
  );
}

export default Map;
