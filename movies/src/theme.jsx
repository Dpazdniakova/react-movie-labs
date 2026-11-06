import { createTheme } from "@mui/material/styles";


const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#e8a33d", contrastText: "#1a1207" },
    secondary: { main: "#2a3545" },
    background: { default: "#0e131a", paper: "#171f29" },
    text: { primary: "#e6edf3", secondary: "#97a4b2" },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 600, fontSize: "1.9rem" },
    h5: { fontWeight: 600, fontSize: "1.3rem" },
    h6: { fontWeight: 600, fontSize: "1.05rem" },
  },
  components: {
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: "none" } },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { borderBottom: "1px solid rgba(255, 255, 255, 0.08)" },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { border: "1px solid rgba(255, 255, 255, 0.07)" },
      },
    },
  },
});

export default theme;
