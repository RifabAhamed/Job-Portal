import { createTheme } from "@mui/material/styles";

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: { main: "#1976d2" },
          primarybutton: { main: "#309689" },
          secondary: { main: "#9c27b0" },
          background: {
            default: "#f5f5f5",
            paper: "#ffffff",
          },
          text: {
            primary: "#000000",
            secondary: "#555555",
          },
        }
      : {
          primary: { main: "#90caf9" },
          primarybutton: { main: "#309689" },
          secondary: { main: "#ce93d8" },
          background: {
            default: "#121212",
            paper: "#1e1e1e",
          },
          text: {
            primary: "#ffffff",
            secondary: "#aaaaaa",
          },
        }),
  },
});

export const createAppTheme = (mode) => createTheme(getDesignTokens(mode));
