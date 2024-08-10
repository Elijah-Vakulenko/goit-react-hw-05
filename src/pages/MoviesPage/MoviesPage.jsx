import { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import { fetchMoviesSearch } from '../../services/api';
import { useSearchParams } from 'react-router-dom';
import MoviesList from '../../components/MoviesList/MoviesList';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [error, setError] = useState('');

  useEffect(() => {
    if (query) {
      const fetchMovies = async () => {
        try {
          const data = await fetchMoviesSearch (query);
          setMovies(data);
          setNoResults(true);
        } catch (error) {
          console.error('Error searching movies:', error);
        }
      };

      fetchMovies();
    }
  }, [query]);

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const newQuery = form.elements.query.value.trim();

    if (newQuery === '') {
      setError('Please, enter some key words or the whole movie title');
      return;
    }

    setError('');

    setSearchParams({ query: newQuery });
    setNoResults(false);
  };

  return (
    <main>
      <SearchBar query={query} onSubmit={handleSubmit} error={error} />
      {movies.length > 0 ? (
        <MoviesList movies={movies} />
      ) : (
        noResults && <p>No results.</p>
      )}
    </main>
  );
};

export default MoviesPage;