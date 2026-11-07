import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import { useQuery } from "@tanstack/react-query";
import { getGenres } from "../../api/tmdb-api";
import Spinner from "../spinner";

const sort_options = [
  { value: "popularity.desc", label: "Popularity" },
  { value: "vote_average.desc", label: "Rating" },
  { value: "release_date.desc", label: "Newest" },
  { value: "title.asc", label: "Title A-Z" },
];

const current_year = new Date().getFullYear();
const years = Array.from({ length: 46 }, (_, i) => current_year + 1 - i);

export default function FilterMoviesCard({ filters, onChange, onReset, mode }) {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["genres"],
    queryFn: () => getGenres(),
    staleTime: Infinity, //genres dont change
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid size={{ xs: 12, md: 3 }}>
        <TextField
          fullWidth
          size="small"
          type="search"
          label={mode === "server" ? "Search movies" : "Filter by title"}
          value={filters.title ?? ""}
          onChange={(e) => onChange("title", e.target.value)}
        />
      </Grid>

      <Grid size={{ xs: 6, md: 2 }}>
        <TextField
          select
          fullWidth
          size="small"
          label="Genre"
          value={filters.genre ?? ""}
          onChange={(e) => onChange("genre", e.target.value)}
        >
          <MenuItem value="">All genres</MenuItem>
          {data.genres.map((genre) => (
            <MenuItem key={genre.id} value={genre.id}>
              {genre.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid size={{ xs: 6, md: 2 }}>
        <TextField
          select
          fullWidth
          size="small"
          label="Year"
          value={filters.year ?? ""}
          onChange={(e) => onChange("year", e.target.value)}
        >
          <MenuItem value="">Any year</MenuItem>
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid size={{ xs: 6, md: 2 }}>
        <TextField
          select
          fullWidth
          size="small"
          label="Sort by"
          value={filters.sortBy ?? ""}
          onChange={(e) => onChange("sortBy", e.target.value)}
        >
          <MenuItem value="">Default</MenuItem>
          {sort_options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid size={{ xs: 6, md: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Min rating: {filters.minRating ?? "any"}
        </Typography>
        <Slider
          size="small"
          min={0}
          max={10}
          step={0.5}
          valueLabelDisplay="auto"
          value={Number(filters.minRating) || 0}
          onChange={(e, value) => onChange("minRating", value === 0 ? "" : value)}
        />
      </Grid>

      <Grid size={{ xs: 6, md: 1 }}>
        <Button fullWidth size="small" onClick={onReset}>
          Clear
        </Button>
      </Grid>
    </Grid>
  );
}
