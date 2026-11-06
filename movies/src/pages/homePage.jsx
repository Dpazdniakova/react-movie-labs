import { useState } from "react";
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getDiscoverMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import Paginator from '../components/paginator';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'

const HomePage = () => {
  const [page, setPage] = useState(1);

  const { data, error, isPending, isError, isPlaceholderData } = useQuery({
    queryKey: ['discover', { page }],
    queryFn: () => getDiscoverMovies({ page }),
    placeholderData: keepPreviousData,
  })

  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }

  const movies = data.results;

   return (
      <PageTemplate
        title="Discover Movies"
        movies={movies}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />
        }}
        pagination={
          <Paginator
            count={Math.min(data.total_pages, 500)}
            page={page}
            onChange={setPage}
            disabled={isPlaceholderData}
          />
        }
      />
  );

};
export default HomePage;
