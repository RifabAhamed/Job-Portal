import { describe, test, expect, vi, beforeEach } from "vitest";
import { screen} from "@testing-library/react";
import { renderWithProviders } from "../../test-utils";
import AppRoutes from "../../../routes/AppRoutes";
import { useAuth } from "../../../context/AuthContext";

// 1. Mock the useAuth hook
vi.mock("../../../context/AuthContext", () => ({
  useAuth: vi.fn(),
}));

describe("AppRoutes Integration Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // --- PUBLIC ROUTES ---
  test('renders HomePage for the root path "/"', async () => {
    useAuth.mockReturnValue({
      user: null,
      loading: false,
      isAuthenticated: false,
    });
    renderWithProviders(<AppRoutes />, { route: "/" });

    // Look for unique text on your HomePage
    expect(screen.getByText(/find your dream job/i)).toBeInTheDocument();
  });

  test('renders Login page for "/login"', () => {
    useAuth.mockReturnValue({
      user: null,
      loading: false,
      isAuthenticated: false,
    });
    renderWithProviders(<AppRoutes />, { route: "/login" });

    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  // --- ROLE-BASED PROTECTION ---
  test("redirects to Login (or Home) when a JobSeeker tries to access Employer routes", async () => {
    // Simulate a JobSeeker being logged in
    useAuth.mockReturnValue({
      user: { role: "jobseeker" },
      isAuthenticated: true,
      loading: false,
    });

    renderWithProviders(<AppRoutes />, { route: "/createJob/123" });

    // Assert: They should NOT see the Create Job text
    expect(screen.queryByText(/create a new job/i)).not.toBeInTheDocument();

    // Depending on your PrivateRoute logic, they might see a "Unauthorized" message
    // or be redirected to the home page.
  });

  test('allows Employer to access "/createJob"', async () => {
    useAuth.mockReturnValue({
      user: { role: "employer" },
      isAuthenticated: true,
      loading: false,
    });

    renderWithProviders(<AppRoutes />, { route: "/createJob/123" });

    // Assuming your CreateJob component has this heading
    expect(screen.getByText(/Create Job Posting/i)).toBeInTheDocument();
  });

  test('allows Admin to access "/admin-dashboard"', async () => {
    useAuth.mockReturnValue({
      user: { role: "admin" },
      isAuthenticated: true,
      loading: false,
    });

    renderWithProviders(<AppRoutes />, { route: "/admin-dashboard" });

    // If AdminDashboard is not finished yet, this might fail unless you have a placeholder
    expect(screen.getByText(/admindashboard/i)).toBeInTheDocument();
  });
});
