import Grid from "@mui/material/Grid";
import PersonCard from "../personCard";

const PersonList = ({ people }) => (
  <Grid container>
    {people.map((p) => (
      <Grid
        key={p.id}
        size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
        sx={{ padding: "20px" }}
      >
        <PersonCard person={p} />
      </Grid>
    ))}
  </Grid>
);

export default PersonList;
