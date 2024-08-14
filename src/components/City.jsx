import { useParams } from 'react-router-dom';
import styles from './City.module.css';
import { useCities } from '../contexts/CitiesContext';
import { useEffect } from 'react';
import Spinner from './Spinner';
import BackButton from './BackButton';

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  }).format(new Date(date));

function City() {
  const { id } = useParams();
  const { currentCity, isLoading, getCity } = useCities();

  useEffect(
    function () {
      // async function getCity(id) {
      //   console.log(id, currentCity.id);
      //   if (Number(id) === currentCity.id) return;

      //   dispatch({ type: 'loading' });
      //   try {
      //     const res = await fetch(`${BASE_URL}/cities/${id}`);
      //     const data = await res.json();
      //     dispatch({ type: 'city/loaded', payload: data });
      //   } catch {
      //     dispatch({
      //       type: 'rejected',
      //       payload: 'There was  an error in getting the city ...',
      //     });
      //   }
      // }
      getCity(id);
    },
    [id, getCity]
  );

  const { cityName, emoji, date, notes } = currentCity;

  if (isLoading) return <Spinner />;

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
