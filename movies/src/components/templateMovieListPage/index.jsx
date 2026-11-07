import Header from "../headerMovieList";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

function MovieListPageTemplate({ movies, title, action, controls, pagination }) {
  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>

      {controls && (
        <Grid size={12} sx={{ px: 3, pb: 1 }}>
          <Paper sx={{ p: 2 }}>{controls}</Paper>
        </Grid>
      )}

      <Grid size={12}>
        <MovieList action={action} movies={movies} />
      </Grid>

      {pagination && <Grid size={12}>{pagination}</Grid>}
    </Grid>
  );
}
export default MovieListPageTemplate;
