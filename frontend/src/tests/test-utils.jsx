import React from "react";
import { render } from "@testing-library/react";
import { ThemeContextProvider } from "../context/ThemeContext.jsx";
import { StrictMode } from "react";
import { MemoryRouter } from "react-router-dom";

// You might want to wrap this in your AuthProvider if you have one!
export function renderWithProviders(ui, { route = "/" } = {}) {
  return render(
    <StrictMode>
      <ThemeContextProvider>
        <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
      </ThemeContextProvider>
    </StrictMode>,
  );
}