import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CakeIcon from "@mui/icons-material/Cake";
import StarRate from "@mui/icons-material/StarRate";

// Same style objects as movieDetails, so a person page reads like a movie page.
const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};
const chip = { margin: 0.5 };

const PersonDetails = ({ person }) => {
  return (
    <>
      <Typography variant="h5" component="h3">
        Biography
      </Typography>

      <Typography variant="body1" component="p" sx={{ whiteSpace: "pre-line" }}>
        {person.biography || "No biography has been added for this person."}
      </Typography>

      <Paper component="ul" sx={{ ...root }}>
        {person.birthday && (
          <li>
            <Chip
              icon={<CakeIcon />}
              label={`Born: ${person.birthday}`}
              sx={{ ...chip }}
            />
          </li>
        )}
        <li>
          <Chip
            icon={<StarRate />}
            label={`Popularity: ${person.popularity?.toFixed(1) ?? "n/a"}`}
            sx={{ ...chip }}
          />
        </li>
      </Paper>
    </>
  );
};

export default PersonDetails;
