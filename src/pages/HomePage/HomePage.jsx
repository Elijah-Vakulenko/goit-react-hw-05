import { useEffect, useState } from 'react';
import MoviesList from '../../components/MoviesList/MoviesList';
import { fetchMoviesTrends } from '../../services/api';
import s  from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const TrendMovies = async () => {
      try {
        const data = await fetchMoviesTrends();
        setMovies(data.results);
      } catch (err) {
        console.error('Error fetching trending movies:', err);
      }
    };

    TrendMovies();
  }, []);

  return (
    <main>
      <h1 className={s.title}>Trending Movies</h1>
      <MoviesList movies={movies} />
    </main>
  );
};

export default HomePage;