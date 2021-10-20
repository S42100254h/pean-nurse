import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#f0f8ff",
      main: "#55AFD6",
      contrastText: "#fff",
    },
    secondary: {
      main: "#E77D95",
      dark: "#a40e26",
      contrastText: "#000",
    },
    basic: {
      light: "#f6f8fa",
      main: "#F5F3ED",
    },
    background: {
      default: "#F9FBFE"
    }
  },
});
