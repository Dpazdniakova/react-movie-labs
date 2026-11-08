import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Link } from "react-router";
import { profileImage } from "../../util";

const media_height = 350;

export default function PersonCard({ person }) {
  const image = profileImage(person.profile_path, "w500");

  const knownFor = (person.known_for ?? [])
    .map((work) => work.title || work.name)
    .filter(Boolean)
    .slice(0, 3)
    .join(", ");

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardHeader
        title={
          <Tooltip title={person.name}>
            <Typography variant="h6" component="p" noWrap>
              {person.name}
            </Typography>
          </Tooltip>
        }
      />
      {image ? ( // if there's no image show a box with an avatar
        <CardMedia sx={{ height: media_height }} image={image} title={person.name} />
      ) : (
        <Box
          sx={{
            height: media_height,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "secondary.main",
          }}
        >
          <Avatar sx={{ width: 120, height: 120 }} alt={person.name} />
        </Box>
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {person.known_for_department || "Acting"}
        </Typography>
        <Tooltip title={knownFor || ""}>
          <Typography variant="body2" noWrap>
            {knownFor || "No credits listed"}
          </Typography>
        </Tooltip>
      </CardContent>

      <CardActions disableSpacing sx={{ justifyContent: "flex-end" }}>
        <Link to={`/people/${person.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
