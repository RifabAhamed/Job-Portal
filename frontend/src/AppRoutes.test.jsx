import { describe, test, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "./test-utils";
import AppRoutes from "../src/routes/AppRoutes";

// 1. Mock the Auth Context
vi.mock("../src/context/AuthContext", () => ({
  useAuth: () => ({
    user: { role: "jobseeker", name: "John Doe" },
    isAuthenticated: true,
    loading: false,
  }),
}));

// 2. Mock the Job Service (API calls)
// Replace the path below with your actual API service path
vi.mock("../src/features/jobs/JobService", () => ({
  default: {
    getJobs: vi.fn().mockResolvedValue([
      { _id: "1", title: "React Developer", company: "Tech Inc" },
      { _id: "2", title: "Node Engineer", company: "Backend Ltd" },
    ]),
  },
}));

describe("User/JobSeeker Flows", () => {
//   test("renders the Jobs page and displays job titles", async () => {
//     renderWithProviders(<AppRoutes />, { route: "/jobs" });

//     // Using findByText is often better than waitFor + getByText
//     // because it handles the wait automatically.
//     const jobTitle = await screen.findByText(/react developer/i);
//     expect(jobTitle).toBeInTheDocument();

//     // If you want to see what's happening during debugging:
//     // screen.debug();
//   });

  test("allows user to access My Account", async () => {
    renderWithProviders(<AppRoutes />, { route: "/my-account" });

    // Ensure this text matches exactly what is in your MyAccount component
    const accountHeading = await screen.findByText(/my account/i);
    expect(accountHeading).toBeInTheDocument();
  });
});
