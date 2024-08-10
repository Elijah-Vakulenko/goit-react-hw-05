import axios from 'axios';


const API_KEY = "248bfb5e4964fa646278d9e472262a2f"
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmODM3N2Q2MGY1MDFjYmIzZTBlOTg2YjZmYjMyMDNiNCIsIm5iZiI6MTcyMjcwNzk5MS45OTEzMzYsInN1YiI6IjY2YWU2ZWQxYmEzNDhjMWFmOTBiNjU5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9wDiwsqcaGM-WpRamVYropkuBOkJSydOarAY_SXu3tY";
const BASIC_URL = "https://api.themoviedb.org/3";
const END_POINT_TRENDS = "/trending/movie/day";
const END_POINT_SEARCH = "/search/movie";
const END_POINT_ID = "/movie/";
const END_POINT_CREDITS = "/credits";
const END_POINT_REVIEWS = "/reviews";

export const settings = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
  params: {
    query: "",
    language: "en-US",
    page: 1,
  },
};

export const fetchMoviesTrends = async () => {
  const url = `${BASIC_URL}${END_POINT_TRENDS}`;

  const { data } = await axios.get(url, settings);
  return data.results;
};

export const fetchMoviesSearch = async (searchQuery) => {
  const url = `${BASIC_URL}${END_POINT_SEARCH}`;

  const { data } = await axios.get(url, {
    ...settings,
    params: { query: searchQuery },
  });
  return data.results;
};

export const fetchMoviesById = async (id) => {
  const url = `${BASIC_URL}${END_POINT_ID}${id}`;

  const { data } = await axios.get(url, settings);
  return data;
};

export const fetchMoviesByIdCredits = async (id) => {
  const url = `${BASIC_URL}${END_POINT_ID}${id}${END_POINT_CREDITS}`;

  const { data } = await axios.get(url, settings);
  return data;
};

export const fetchMoviesByIdReviews = async (id) => {
  const url = `${BASIC_URL}${END_POINT_ID}${id}${END_POINT_REVIEWS}`;

  const { data } = await axios.get(url, settings);
  return data;
};