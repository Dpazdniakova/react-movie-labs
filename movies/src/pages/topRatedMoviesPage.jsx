import { useState } from "react";
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import PageTemplate from '../components/templateMovieListPage'
import { getTopRatedMovies } from "../api/tmdb-api";
import Paginator from '../components/paginator';
import Spinner from '../components/spinner';
import AddToPlaylistIcon from '../components/cardIcons/addToWatchLater';

const TopRatedPage = () => {
  const [page, setPage] = useState(1);

  const { data, error, isPending, isError, isPlaceholderData } = useQuery({
    queryKey: ['topRated', { page }],
    queryFn: () => getTopRatedMovies(page),
    placeholderData: keepPreviousData,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  return (
    <PageTemplate
      title='Top Rated Movies'
      movies={movies}
      action={(movie) => {
        return <AddToPlaylistIcon movie={movie} />
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
export default TopRatedPage;
