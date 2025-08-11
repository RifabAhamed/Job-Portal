import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CssBaseline} from "@mui/material";
import { ThemeContextProvider } from "../src/context/ThemeContext.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeContextProvider>
      <CssBaseline />
      <App/>
    </ThemeContextProvider>
  </StrictMode>
);
