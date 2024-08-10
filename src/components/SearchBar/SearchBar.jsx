import s from './SearchBar.module.css';

const SearchBar = ({ query, onSubmit, error }) => {
  return (
    <main>
      <form className={s.form} onSubmit={onSubmit}>
        <input
          className={s.input}
          type="text"
          name="query"
          defaultValue={query}
          placeholder="Type the movie title"
        />
        <button className={s.btn} type="submit">
          Search
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </main>
  );
};

export default SearchBar;