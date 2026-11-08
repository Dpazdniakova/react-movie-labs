import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Grid from "@mui/material/Grid";
import { getPopularPeople } from "../api/tmdb-api";
import Header from "../components/headerMovieList";
import PersonList from "../components/personList";
import Paginator from "../components/paginator";
import Spinner from "../components/spinner";

const PopularPeoplePage = () => {
  const [page, setPage] = useState(1);

  const { data, error, isPending, isError, isPlaceholderData } = useQuery({
    queryKey: ["popularPeople", { page }],
    queryFn: () => getPopularPeople(page),
    placeholderData: keepPreviousData, // keeps the current page visible while the next loads
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <Grid container>
      <Grid size={12}>
        <Header title="Popular Actors" />
      </Grid>

      <Grid size={12}>
        <PersonList people={data.results} />
      </Grid>

      <Grid size={12}>
        <Paginator
          count={Math.min(data.total_pages, 500)}
          page={page}
          onChange={setPage}
          disabled={isPlaceholderData}
        />
      </Grid>
    </Grid>
  );
};

export default PopularPeoplePage;
