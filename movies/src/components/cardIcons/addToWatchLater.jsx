import { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const AddToPlaylistIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleAddToMustWatch = (e) => {
    e.preventDefault();
    context.addToMustWatch(movie);
  };

  return (
    <Tooltip title="Add to must-watch">
      <IconButton aria-label="add to watch later" onClick={handleAddToMustWatch}>
        <PlaylistAddIcon color="primary" fontSize="large" />
      </IconButton>
    </Tooltip>
  );
};

export default AddToPlaylistIcon;
