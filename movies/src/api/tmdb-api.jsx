// Endpoints take plain arguments rather than react-query's context object.
// Call sites wrap them as queryFn: () => fn(arg) — this decouples the data
// layer from react-query so functions work in any context, and avoids coupling
// the query key shape to the function signature ( important for
// multi-parameter endpoints like search and discover).

const BASE = "https://api.themoviedb.org/3";

const get = async (path, params = {}) => {
  const qs = new URLSearchParams({
    api_key: import.meta.env.VITE_TMDB_KEY,
    language: "en-US",
    ...params,
  });
  const response = await fetch(`${BASE}${path}?${qs}`);
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.status_message || "Something went wrong");
  }
  return response.json();
};

export const getDiscoverMovies = () =>
  get("/discover/movie", { include_adult: false, include_video: false });

export const getGenres = () => get("/genre/movie/list");

export const getUpcomingMovies = () => get("/movie/upcoming");

export const getMovie = (id) => get(`/movie/${id}`);

export const getMovieImages = (id) => get(`/movie/${id}/images`);

export const getMovieReviews = (id) => get(`/movie/${id}/reviews`);
