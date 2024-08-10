import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDhiZmI1ZTQ5NjRmYTY0NjI3OGQ5ZTQ3MjI2MmEyZiIsIm5iZiI6MTcyMjk4MzUzMi41MzI3NzMsInN1YiI6IjY2YjJhMTJjYzZlMGZhZWMxZTFkMzAwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yRnKa1Ajo_00QBD7dihcYhxOxdGXRZwNf0INctTZf2s";

export const settings = {
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
  params: {
    query: "",
    include_adult: false,
    language: "en-US",
    page: 1,
  },
};

//======================= ↓ Робимо запит на останні хітові фільми 

export const fetchMoviesTrends = async () => {

  const { data } = await axios.get('/trending/movie/day', settings);
  return data;
};

//======================== ↓ Робимо запит на фільми за введеною назвою у пошуку

export const fetchMoviesSearch = async (Query) => {

  const { data } = await axios.get('/search/movie', {
    ...settings,
    params: { query: Query },
  });
  return data.results;
};

//========================== ↓ Робимо запит інформаціі про фільм

export const fetchMovieById = async (id) => {

  const { data } = await axios.get(`/movie/${id}`, settings);
  return data;
};

//========================== ↓ Робимо запит акторського складу

export const fetchCast = async (id) => {

  const { data } = await axios.get(`/movie/${id}/credits`, settings);
  return data.cast;
};

//========================= ↓ Робимо запит відгуків про фільм

export const fetchReviews = async (id) => {

  const { data } = await axios.get(`/movie/${id}/reviews`, settings);
  return data.results;
};