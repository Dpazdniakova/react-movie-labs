import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import img from '../../images/film-poster-placeholder.png'
import { Link } from "react-router";
import Avatar from '@mui/material/Avatar';
import { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";

export default function MovieCard({ movie, action = () => null }) {
   const { favorites } = useContext(MoviesContext);

  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false
  }


  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardHeader
          avatar={
          movie.favorite ? (
            <Avatar sx={{ bgcolor: "error.main" }}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Tooltip title={movie.title}>
            <Typography variant="h6" component="p" noWrap>
              {movie.title}
            </Typography>
          </Tooltip>
        }
      />
      <CardMedia
        sx={{ height: 350 }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <CalendarIcon fontSize="small" color="primary" />
            <Typography variant="body2" color="text.secondary">
              {movie.release_date}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Rating
              value={movie.vote_average / 2}
              precision={0.1}
              size="small"
              readOnly
            />
            <Typography variant="body2" color="text.secondary">
              {movie.vote_average?.toFixed(1)}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <CardActions disableSpacing sx={{ justifyContent: "space-between" }}>
        {action(movie)}

        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>

    </Card>
  );
}
