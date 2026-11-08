import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Header from "../headerMovieList";
import { profileImage } from "../../util";


const TemplatePersonPage = ({ person, children }) => {
  const image = profileImage(person.profile_path, "w500");

  return (
    <>
      <Header title={person.name} />

      <Grid container spacing={5} sx={{ padding: "15px" }}>
        <Grid size={{ xs: 12, sm: 4, md: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {image ? (
              <img
                src={image}
                alt={person.name}
                style={{ width: "100%", borderRadius: 10 }}
              />
            ) : (
              <Avatar sx={{ width: 160, height: 160 }} alt={person.name} />
            )}
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 8, md: 9 }}>{children}</Grid>
      </Grid>
    </>
  );
};

export default TemplatePersonPage;
