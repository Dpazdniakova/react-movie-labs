import truncate from "lodash/truncate";

export function excerpt(string) {
  return truncate(string, {
    length: 400, // maximum 400 characters
    separator: /,?\.* +/, // separate by spaces, including preceding commas and periods
  });
}

// Keyed by the same strings TMDB's sort_by accepts, so one dropdown drives both
// the server query and the client-side sort.
export const sortComparators = {
  "popularity.desc": (a, b) => b.popularity - a.popularity,
  "vote_average.desc": (a, b) => b.vote_average - a.vote_average,
  "release_date.desc": (a, b) => new Date(b.release_date) - new Date(a.release_date),
  "title.asc": (a, b) => a.title.localeCompare(b.title),
};

// Used by pages whose endpoint cannot filter server-side. Sorts a copy, since
// the array it receives is owned by the react-query cache.
export const applyFilters = (movies, { title, genre, year, minRating, sortBy } = {}) => {
  let result = movies;

  if (title) {
    const needle = title.toLowerCase();
    result = result.filter((m) => m.title.toLowerCase().includes(needle));
  }
  if (genre) {
    const genreId = Number(genre);
    result = result.filter((m) => m.genre_ids?.includes(genreId));
  }
  if (year) {
    result = result.filter((m) => m.release_date?.startsWith(String(year)));
  }
  if (minRating) {
    result = result.filter((m) => m.vote_average >= Number(minRating));
  }

  const comparator = sortComparators[sortBy]; // get the appropriate function 
  return comparator ? [...result].sort(comparator) : result;
};

// fallback for multiple components for the actor picture
export const profileImage = (path, size = "w185") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : null;
