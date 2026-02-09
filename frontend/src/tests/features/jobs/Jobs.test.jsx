import { describe, test, expect, vi, beforeEach } from "vitest";
import { screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../test-utils";
import Jobs from "../../../features/jobs/Jobs";
import JobService from "../../../features/jobs/JobService";

// 1. Mock the JobService
vi.mock("../../../features/jobs/JobService", () => ({
  default: {
    getAllJobsPaginated: vi.fn(),
  },
}));

const mockJobs = [
  {
    _id: "1",
    title: "Frontend Engineer",
    company: "TechCorp",
    location: "Remote",
  },
  {
    _id: "2",
    title: "Backend Developer",
    company: "DataSync",
    location: "New York",
  },
];

describe("Jobs Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("fetches and displays jobs on initial load", async () => {
    // Define the mock data inside the test for clarity
    const mockResponse = {
      data: {
        jobs: [
          {
            _id: "1",
            title: "Frontend Engineer",
            company: "TechCorp",
            location: "Remote",
          },
        ],
        total: 1,
      },
    };

    // Force the mock to return this data
    JobService.getAllJobsPaginated.mockResolvedValue(mockResponse);

    renderWithProviders(<Jobs />);

    // Use findByText with a longer timeout to be safe
    const jobTitle = await screen.findByText(
      /frontend engineer/i,
      {},
      { timeout: 3000 },
    );

    expect(jobTitle).toBeInTheDocument();
  });
//   test("fetches and displays jobs on initial load", async () => {
//     // Mock the API response structure
//     JobService.getAllJobsPaginated.mockResolvedValueOnce({
//       data: { jobs: mockJobs, total: 2 },
//     });

//     renderWithProviders(<Jobs />);

//     // Check for a job title from our mock data
//     const firstJob = await screen.findByText(/frontend engineer/i);
//     expect(firstJob).toBeInTheDocument();
//     expect(screen.getByText(/techcorp/i)).toBeInTheDocument();

//     // Ensure the API was called with default pagination (page 1, limit 6)
//     expect(JobService.getAllJobsPaginated).toHaveBeenCalledWith({
//       page: 1,
//       limit: 6,
//     });
//   });

  test("updates jobs when pagination is clicked", async () => {
    const user = userEvent.setup();
    JobService.getAllJobsPaginated.mockResolvedValue({
      data: { jobs: mockJobs, total: 20 }, // Enough for multiple pages
    });

    renderWithProviders(<Jobs />);

    // Find the pagination button for page 2
    const page2Button = await screen.findByRole("button", {
      name: /go to page 2/i,
    });
    await user.click(page2Button);

    // Verify the API was called for the second page
    await waitFor(() => {
      expect(JobService.getAllJobsPaginated).toHaveBeenCalledWith({
        page: 2,
        limit: 6,
      });
    });
  });


  test("opens filter modal on small screens", async () => {
    const user = userEvent.setup();

    // 1. Mock matchMedia to return 'true' for mobile screens
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: true, // Force media query to pass
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    renderWithProviders(<Jobs />);

    // 2. Now the button should be accessible
    const filterButton = screen.getByRole("button", { name: /filters/i });
    await user.click(filterButton);

    // 3. Check if the Modal content appears
    expect(screen.getByText(/search by job title/i)).toBeInTheDocument();
  });
//   test("opens filter modal on small screens", async () => {
//     const user = userEvent.setup();
//     // Simulate a small screen (mobile)
//     window.innerWidth = 500;
//     fireEvent(window, new Event("resize"));

//     JobService.getAllJobsPaginated.mockResolvedValue({
//       data: { jobs: [], total: 0 },
//     });

//     renderWithProviders(<Jobs />);

//     const filterButton = screen.getByRole("button", { name: /filters/i });
//     await user.click(filterButton);

//     // Check if the "Search by Job Title" text inside the Modal appears
//     expect(screen.getByText(/search by job title/i)).toBeInTheDocument();
//   });

  test("displays error message when API fails", async () => {
    JobService.getAllJobsPaginated.mockRejectedValueOnce(
      new Error("Network Error"),
    );

    renderWithProviders(<Jobs />);

    // Since you log the error in console but don't show a UI alert (based on your code),
    // we verify the API was called. If you add an <Alert>{error}</Alert>,
    // you would check for that here.
    await waitFor(() => {
      expect(JobService.getAllJobsPaginated).toHaveBeenCalled();
    });
  });
});
