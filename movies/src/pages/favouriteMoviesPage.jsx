import { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import FilterCard from "../components/filterMovieCard";
import useFilters from "../hooks/useFilters";
import { applyFilters } from "../util";
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";

const FavoriteMoviesPage = () => {
  const {favorites: movieIds } = useContext(MoviesContext);
  const { filters, handleChange, reset } = useFilters();

  // Create an array of queries and run in parallel.
  const favoriteMovieQueries = useQueries({
    queries: movieIds.map((movieId) => {
      return {
        queryKey: ['movie', movieId],
        queryFn: () => getMovie(movieId),
      }
    })
  });
  
  // Check if any of the parallel queries is still loading.
  const isPending = favoriteMovieQueries.find((m) => m.isPending === true);

  if (isPending) {
    return <Spinner />;
  }

  const favorites = favoriteMovieQueries.map((q) => ({
    ...q.data,
    genre_ids: q.data.genres.map((g) => g.id),
  })); //create a new object instead of using cached object

  const movies = applyFilters(favorites, filters);

   return (
    <PageTemplate
      title="Favorite Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromFavorites movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
      }}
      controls={
        <FilterCard
          mode="client"
          filters={filters}
          onChange={handleChange}
          onReset={reset}
        />
      }
    />
  );

};

export default FavoriteMoviesPage;
