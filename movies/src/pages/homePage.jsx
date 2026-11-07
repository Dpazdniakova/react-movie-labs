import { useState } from "react";
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getDiscoverMovies, searchMovies, getSearchPool } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import FilterCard from '../components/filterMovieCard';
import Paginator from '../components/paginator';
import Spinner from '../components/spinner';
import useFilters from '../hooks/useFilters';
import { applyFilters } from '../util';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'

const per_page = 20;

// no title fetches by /discover/movie, every filter and the paging server-side
// title, no filters by /search/movie, server-side paging through all matches
// title + filters     -> pooled /search/movie, filtered, sorted and paged here,because search ignores genre, rating and sort
const HomePage = () => {
  const [page, setPage] = useState(1);
  const { filters, debouncedTitle, handleChange, reset } = useFilters();
  const { genre, year, minRating, sortBy } = filters;

  const isSearching = Boolean(debouncedTitle && debouncedTitle.trim());
  const needsPool = isSearching && Boolean(genre || minRating || sortBy);

  const discover = useQuery({
    queryKey: ['discover', { page, genre, year, minRating, sortBy }],
    queryFn: () => getDiscoverMovies({ page, genre, year, minRating, sortBy }),
    enabled: !isSearching,
    placeholderData: keepPreviousData,
  });

  const searchPaged = useQuery({
    queryKey: ['search', { query: debouncedTitle, year, page }],
    queryFn: () => searchMovies({ query: debouncedTitle, year, page }),
    enabled: isSearching && !needsPool,
    placeholderData: keepPreviousData,
  });

  const searchPooled = useQuery({
    queryKey: ['searchPool', { query: debouncedTitle, year }],
    queryFn: () => getSearchPool({ query: debouncedTitle, year }),
    enabled: needsPool,
    placeholderData: keepPreviousData,
  });

  let active;
  if (needsPool) active = searchPooled;
  else if (isSearching) active = searchPaged;
  else active = discover;

  const changeFilter = (field, value) => {
    handleChange(field, value);
    setPage(1);
  };

  const resetFilters = () => {
    reset();
    setPage(1);
  };

  if (active.isPending) {
    return <Spinner />
  }

  if (active.isError) {
    return <h1>{active.error.message}</h1>
  }

  let movies;
  let pageCount;

  if (needsPool) {
    const filtered = applyFilters(active.data.results, { genre, minRating, sortBy });
    movies = filtered.slice((page - 1) * per_page, page * per_page);
    pageCount = Math.ceil(filtered.length / per_page);
  } else {
    movies = active.data.results;
    pageCount = Math.min(active.data.total_pages, 500);
  }

   return (
      <PageTemplate
        title="Discover Movies"
        movies={movies}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />
        }}
        controls={
          <FilterCard
            mode="server"
            filters={filters}
            onChange={changeFilter}
            onReset={resetFilters}
          />
        }
        pagination={
          <Paginator
            count={pageCount}
            page={page}
            onChange={setPage}
            disabled={active.isPlaceholderData}
          />
        }
      />
  );

};
export default HomePage;
