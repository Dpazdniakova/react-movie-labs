import { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import FilterCard from "../components/filterMovieCard";
import useFilters from "../hooks/useFilters";
import { applyFilters } from "../util";
import RemoveFromMustWatch from "../components/cardIcons/removeFromMustWatch";
import WriteReview from "../components/cardIcons/writeReview";

const MustWatchMoviesPage = () => {
  const { mustWatch: movieIds } = useContext(MoviesContext);
  const { filters, handleChange, reset } = useFilters();

  // same as favourites page , parallel requests
  const mustWatchMovieQueries = useQueries({
    queries: movieIds.map((movieId) => {
      return {
        queryKey: ['movie', movieId],
        queryFn: () => getMovie(movieId),
      }
    })
  });

  // Check if any of the parallel queries is still loading.
  const isPending = mustWatchMovieQueries.find((m) => m.isPending === true);

  if (isPending) {
    return <Spinner />;
  }

  const mustWatchMovies = mustWatchMovieQueries.map((q) => ({
    ...q.data,
    genre_ids: q.data.genres.map((g) => g.id),
  })); //create a new object instead of using cached object  with genres mapped to their ids)

  const movies = applyFilters(mustWatchMovies, filters);

  return (
    <PageTemplate
      title="Must Watch"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromMustWatch movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
      }}
      controls={
        <FilterCard
          filters={filters}
          onChange={handleChange}
          onReset={reset}
        />
      }
    />
  );

};

export default MustWatchMoviesPage;
