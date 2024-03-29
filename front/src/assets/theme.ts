import { createTheme } from "@material-ui/core/styles";

export const theme = createTheme({
  palette: {
    primary: {
      light: "#f0f8ff",
      main: "#55AFD6",
      dark: "#4988b8",
      contrastText: "#fff",
    },
    secondary: {
      main: "#E77D95",
      dark: "#a40e26",
      contrastText: "#000",
    },
    basic: {
      light: "#f6f8fa",
      main: "#e3e3e3",
      dark: "#3E3E3E",
    },
    background: {
      default: "#F9FBFE",
    },
  },
});
