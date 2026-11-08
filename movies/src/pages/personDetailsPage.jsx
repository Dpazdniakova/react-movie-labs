import { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Typography from "@mui/material/Typography";
import { getPerson, getPersonMovieCredits } from "../api/tmdb-api";
import PersonDetails from "../components/personDetails";
import PageTemplate from "../components/templatePersonPage";
import MovieList from "../components/movieList";
import Paginator from "../components/paginator";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const per_page= 8;

const PersonDetailsPage = () => {
  const { id } = useParams();
  const personId = Number(id); 
  const [page, setPage] = useState(1);

  const person = useQuery({
    queryKey: ["person", personId],
    queryFn: () => getPerson(personId),
  });

  const credits = useQuery({
    queryKey: ["personCredits", personId],
    queryFn: () => getPersonMovieCredits(personId),
  });

  if (person.isPending || credits.isPending) {
    return <Spinner />;
  }

  if (person.isError) {
    return <h1>{person.error.message}</h1>;
  }

  if (credits.isError) {
    return <h1>{credits.error.message}</h1>;
  }

  // credits.data.cast returns one entry per credit, not per movie
  const seen = new Set();
  const filmography = credits.data.cast
    .filter((movie) => {
      if (!movie.release_date || seen.has(movie.id)) return false; // drop unreleased stubs
      seen.add(movie.id);
      return true;
    })
    .sort((a, b) => new Date(b.release_date) - new Date(a.release_date)); // sort descending 

  // person/{id}/movie_credits is unpaginated so this pager is client-side 
  const count = Math.ceil(filmography.length / per_page);
  const current = Math.min(page, count || 1); // clamp when switching between people
  const shown = filmography.slice((current - 1) * per_page, current * per_page);

  return (
    <PageTemplate person={person.data}>
      <PersonDetails person={person.data} />

      <Typography variant="h5" component="h3" sx={{ mt: 3 }}>
        {`Filmography (${filmography.length} ${filmography.length === 1 ? "film" : "films"})`}
      </Typography>

      <MovieList
        movies={shown}
        action={(movie) => <AddToFavoritesIcon movie={movie} />}
      />

      <Paginator count={count} page={current} onChange={setPage} />
    </PageTemplate>
  );
};

export default PersonDetailsPage;
