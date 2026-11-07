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

// TMDB has 500 pages total
const safePage = (page) => Math.min(Math.max(Number(page) || 1, 1), 500);

// components never handle vote_average.gte, 
// if there is a value for any of the filters it gets spread with a correct parameter name otherwise its and empty object
// not undefined 
export const getDiscoverMovies = ({ page = 1, genre, year, minRating, sortBy } = {}) => {
  const params = {
    include_adult: false,
    include_video: false,
    page: safePage(page),
  };

  if (genre) params.with_genres = genre;
  if (year) params.primary_release_year = year;
  if (minRating) params["vote_average.gte"] = minRating;
  if (sortBy) params.sort_by = sortBy;

  return get("/discover/movie", params);
};


// used to query the title
export const searchMovies = ({ query, page = 1, year }) => {
  const params = {
    query,
    page: safePage(page),
    include_adult: false,
  };

  if (year) params.primary_release_year = year;

  return get("/search/movie", params);
};

// Solves the issue of filtering only one page at a time
export const getSearchPool = async ({ query, year }) => {
  const first = await searchMovies({ query, year, page: 1 }); // get the title query first first page, also accepts the year
  const pagesToFetch = Math.min(first.total_pages, 20);// caps requested pages to no higher than 20

  const requests = [];
  for (let page = 2; page <= pagesToFetch; page++) {
    requests.push(searchMovies({ query, year, page }));
  }
  const rest = await Promise.all(requests);

  let results = first.results;
  for (const response of rest) {
    results = results.concat(response.results); // return results from ALL pages
  }

  return { results };
};

export const getGenres = () => get("/genre/movie/list");

export const getUpcomingMovies = (page = 1) =>
  get("/movie/upcoming", { page: safePage(page) });

export const getMovie = (id) => get(`/movie/${id}`);

export const getMovieImages = (id) => get(`/movie/${id}/images`);

export const getMovieReviews = (id) => get(`/movie/${id}/reviews`);
