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
import { ProgressBar } from 'react-loader-spinner';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const previousLocation = useRef(location.state?.from || '/movies');

  useEffect(() => {
    const getMovieInfo = async () => {
      try {
        const data = await fetchMovieById (id);
        setMovie(data);
      } catch (error) {
        console.error('Error searching movies:', error);
      }
    };

    getMovieInfo();
  }, [id]);

  if (!movie) return render(<ProgressBar
  visible={true}
  height="80"
  width="250"
  barColor="#000000"
  borderColor="#000000"
  ariaLabel="progress-bar-loading"
  wrapperStyle={{}}
  wrapperClass="loader"
  />) ;

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
        <h1 className={s.titleWrapper}>{movie.original_title}</h1>
      </div>
      <div className={s.imgWrapper}>
        <img
          className={s.poster}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.original_title}
        />
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
      <Suspense fallback={<div>Loading subpage...</div>}>
        <Outlet />
      </Suspense>
    </main>
  );
};

export default MovieDetailsPage;