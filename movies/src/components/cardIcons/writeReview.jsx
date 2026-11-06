import RateReviewIcon from "@mui/icons-material/RateReview";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router";

const WriteReviewIcon = ({ movie }) => {
  return (
    <Tooltip title="Write a review">
      <Link
        to={`/reviews/form`}
        state={{
            movieId: movie.id,
        }}
      >
        <RateReviewIcon color="primary" fontSize="large" />
      </Link>
    </Tooltip>
  );
};

export default WriteReviewIcon;
