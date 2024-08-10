
import { Link, useLocation } from 'react-router-dom';
import s from './MoviesList.module.css';

const MoviesList = ({ movies }) => {
  const location = useLocation();

  const defaultImg =
    'https://upload.wikimedia.org/wikipedia/en/6/68/Riddler.png';

  return (
    <ul className={s.list}>
      {movies.map(movie => (
        <li key={movie.id} className={s.card}>
          <Link to={`/movies/${movie.id}`} state={{ from: location.pathname }}>
            <div className={s.wrapper}>
              <img
                className={s.poster}
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                    : defaultImg
                }
                alt={movie.original_title}
              />
            </div>
            <h3 className={s.title}>{movie.original_title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MoviesList;
