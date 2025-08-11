import { createTheme } from "@mui/material/styles";

const getDesignTokens = (mode) => {
  const isLight = mode === "light";

  return {
    palette: {
      mode,
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: isLight ? "#9c27b0" : "#ce93d8",
      },
      primarygreen: {
        main: "#309689",
      },
      lightgreen: {
        main: "#eaf4f3",
      },
      cyangreen: { main: "#9c27b0" },
      background: {
        default: isLight ? "#ffffff" : "#121212",
        paper: isLight ? "#ffffff" : "#1e1e1e",
      },
      text: {
        primary: isLight ? "#000000" : "#ffffff",
        secondary: isLight ? "#555555" : "#aaaaaa",
        green: "#309689",
        gray: "#6c757d",
      },
    },
  };
};

const createAppTheme = (mode) => createTheme(getDesignTokens(mode));

export { getDesignTokens, createAppTheme };
