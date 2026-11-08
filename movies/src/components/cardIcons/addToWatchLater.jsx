import { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

const AddToPlaylistIcon = ({ movie }) => {
  const { mustWatch, addToMustWatch } = useContext(MoviesContext);

  // The button itself carries the state, so the card needs no extra badge.
  const isMustWatch = mustWatch.includes(movie.id);

  const handleAddToMustWatch = (e) => {
    e.preventDefault();
    addToMustWatch(movie);
  };

  return (
    <Tooltip title={isMustWatch ? "In your must-watch list" : "Add to must-watch"}>
      <IconButton aria-label="add to must watch" onClick={handleAddToMustWatch}>
        {isMustWatch ? (
          <PlaylistAddCheckIcon color="success" fontSize="large" />
        ) : (
          <PlaylistAddIcon color="primary" fontSize="large" />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default AddToPlaylistIcon;
