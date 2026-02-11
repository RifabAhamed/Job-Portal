import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Modal,
  Pagination,
  Select,
  Typography,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import JobPic from "../../assets/images/JobPic.jpg";
import JobCard from "../../components/JobCard.jsx";
import JobsFilter from "../../components/JobsFilter.jsx"; // Import the new component
import JobService from "./JobService.js";
import { useDebounce } from "../../hooks/useDebounce.js"; // Import the hook

const Jobs = () => {
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("md"));

  // --- 1. Centralized State ---
  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);

  // The Master Filter Object
  const [filters, setFilters] = useState({
    page: 1,
    limit: 6,
    search: "",
    location: "",
    jobType: [], // Array for multiple checkboxes
    experienceLevel: [], // Array
    salaryRange: [0, 500000], // [min, max]
    sort: "newest",
  });

  // Debounce search text to prevent API spam (500ms delay)
  const debouncedSearch = useDebounce(filters.search, 500);
  const debouncedLocation = useDebounce(filters.location, 500);

  // --- 2. Fetch Logic ---
  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError("");

      // Prepare params for the Industry Standard Backend
      const params = {
        page: filters.page,
        limit: filters.limit,
        search: debouncedSearch,
        location: debouncedLocation,
        sort: filters.sort,
        // Convert arrays to comma-separated strings for the API
        jobType: filters.jobType.join(","),
        experienceLevel: filters.experienceLevel.join(","),
        // Extract slider values
        minSalary: filters.salaryRange[0],
        maxSalary: filters.salaryRange[1],
      };

      const res = await JobService.getAllJobsPaginated(params);

      if (res) {
        setJobs(res?.jobs);
        setTotal(res.total || 0);
      } else {
        setJobs([]);
        setTotal(0);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };
console.log(jobs);

  // --- 3. Effects ---
  // Trigger fetch when any filter changes
  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filters.page,
    filters.sort,
    filters.jobType,
    filters.experienceLevel,
    // Note: We use the *debounced* values here so we don't fetch on every keystroke
    debouncedSearch,
    debouncedLocation,
    // For slider, you might want to debounce this too if it lags,
    // but usually onMouseUp is enough. Here we fetch on change.
    filters.salaryRange,
  ]);

  // --- 4. Handlers ---
  const handlePageChange = (event, value) => {
    setFilters((prev) => ({ ...prev, page: value }));
  };

  const handleSortChange = (event) => {
    setFilters((prev) => ({ ...prev, sort: event.target.value, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({
      page: 1,
      limit: 6,
      search: "",
      location: "",
      jobType: [],
      experienceLevel: [],
      salaryRange: [0, 500000],
      sort: "newest",
    });
  };

  return (
    <Container maxWidth="" disableGutters sx={{ mt: 0 }}>
      {/* Header Image Section */}
      <Box
        sx={{
          position: "relative",
          height: "300px",
          backgroundImage: `url(${JobPic})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />
        <Container
          sx={{
            position: "relative",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h3" color="white" fontWeight="bold">
            Find Your Dream Job
          </Typography>
        </Container>
      </Box>

      {/* Main Content Area */}
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
          }}
        >
          {/* --- Sidebar / Filter Section --- */}
          {isSmScreen ? (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowFilterModal(true)}
                fullWidth
                sx={{ mb: 2 }}
              >
                Filters
              </Button>
              <Modal
                open={showFilterModal}
                onClose={() => setShowFilterModal(false)}
              >
                <Box
                  sx={{
                    height: "100vh",
                    bgcolor: "background.paper",
                    overflowY: "auto",
                  }}
                >
                  <JobsFilter
                    filters={filters}
                    setFilters={setFilters}
                    clearFilters={clearFilters}
                    closeFilters={() => setShowFilterModal(false)}
                    isSmScreen={true}
                  />
                </Box>
              </Modal>
            </>
          ) : (
            // Desktop Filter View
            <JobsFilter
              filters={filters}
              setFilters={setFilters}
              clearFilters={clearFilters}
              isSmScreen={false}
            />
          )}

          {/* --- Job List Section --- */}
          <Box sx={{ flex: 1 }}>
            {/* Sort & Count Header */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Typography variant="subtitle1" color="text.secondary">
                Showing <strong>{jobs.length}</strong> of{" "}
                <strong>{total}</strong> jobs
              </Typography>

              <Select
                value={filters.sort}
                onChange={handleSortChange}
                size="small"
                sx={{ minWidth: 200, bgcolor: "white" }}
              >
                <MenuItem value="newest">Newest First</MenuItem>
                <MenuItem value="oldest">Oldest First</MenuItem>
                <MenuItem value="salary_high">Salary: High to Low</MenuItem>
                <MenuItem value="salary_low">Salary: Low to High</MenuItem>
              </Select>
            </Box>

            {/* Content */}
            {loading ? (
              <Box display="flex" justifyContent="center" my={10}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Typography color="error" align="center">
                {error}
              </Typography>
            ) : jobs.length === 0 ? (
              <Box textAlign="center" py={5}>
                <Typography variant="h6" color="text.secondary">
                  No jobs found matching your criteria.
                </Typography>
                <Button onClick={clearFilters} sx={{ mt: 2 }}>
                  Clear Filters
                </Button>
              </Box>
            ) : (
              <>
                <Box display="flex" flexDirection="column" gap={2}>
                  {jobs.map((job) => (
                    <JobCard key={job._id} job={job} />
                  ))}
                </Box>

                {/* Pagination */}
                <Box mt={4} display="flex" justifyContent="center">
                  <Pagination
                    count={Math.ceil(total / filters.limit)}
                    page={filters.page}
                    onChange={handlePageChange}
                    color="primary"
                    shape="rounded"
                  />
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default Jobs;
