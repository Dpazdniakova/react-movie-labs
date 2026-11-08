import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { getMovieCredits } from "../../api/tmdb-api";
import { profileImage } from "../../util";
import Spinner from "../spinner";

const cast_shown = 10;

const MovieCast = ({ movie }) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["credits", Number(movie.id)],
    queryFn: () => getMovieCredits(Number(movie.id)),
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const cast = data.cast.slice(0, cast_shown); // casts can be very long

  if (!cast.length) {
    return null;
  }

  return (
    <Paper sx={{ p: 2, mt: 1.5 }}>
      <Typography variant="h5" component="h3" sx={{ mb: 1.5 }}>
        Top Billed Cast
      </Typography>
      <Stack // arrange vertically to save space
        direction="row"
        spacing={2}
        sx={{ overflowX: "auto", pb: 1 }}
      >
        {cast.map((member) => (
          <Box
            key={`${member.id}-${member.credit_id}`} // because actors can hold multiple roles in the same movie
            component={Link}
            to={`/people/${member.id}`}
            sx={{
              flex: "0 0 auto",
              width: 110,
              textAlign: "center",
              textDecoration: "none",
              color: "inherit",
            }}
          >

              <Avatar
                src={profileImage(member.profile_path) ?? undefined}
                alt={member.name}
                sx={{ width: 80, height: 80, margin: "0 auto", mb: 1 }}
              />

            <Typography variant="body2" noWrap>
              {member.name}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              noWrap
              sx={{ display: "block" }}
            >
              {member.character}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
};

export default MovieCast;
