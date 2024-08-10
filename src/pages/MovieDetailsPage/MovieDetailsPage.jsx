import { Suspense, useEffect, useRef, useState } from 'react';
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { fetchMovieById } from '../../services/api';
import s from './MovieDetailsPage.module.css';
import Loader from '../../components/Loader/Loader';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();
  const location = useLocation();
  const previousLocation = useRef(location.state?.from || '/movies');

  useEffect(() => {
    const getMovieInfo = async () => {
      try {
        const data = await fetchMovieById(id);
        setMovie(data);
      } catch (error) {
        console.error('Error searching movies:', error);
      } finally {
        setLoading(false); 
      }
    };

    getMovieInfo();
  }, [id]);

  if (loading) {
    return <Loader />; 
  }

  if (!movie) {
    return <p>Error load the movie</p>; 
  }

  return (
    <main>
      <button
        className={s.goBack}
        type="button"
        onClick={() => navigate(previousLocation.current)}
      >
        {' '}
        Go back
      </button>
      <div>
        <h1 className={s.title}>{movie.original_title}</h1>
      </div>
      <div className={s.wrapper}>
        <div className={s.imgWrapper}>
          <img
            className={s.poster}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.original_title}
          />
        </div>
        <p className={s.description}>{movie.overview}</p>
      </div>
      <ul className={s.additionalInfo}>
        <li>
          <Link
            className={s.link}
            to={'cast'}
            state={{ from: previousLocation.current }}
          >
            Cast
          </Link>
        </li>
        <li>
          <Link
            className={s.link}
            to={'reviews'}
            state={{ from: previousLocation.current }}
          >
            Reviews
          </Link>
        </li>
      </ul>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </main>
  );
};

export default MovieDetailsPage;
