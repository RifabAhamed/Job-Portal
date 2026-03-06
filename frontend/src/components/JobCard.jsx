import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Stack,
  Button,
  CircularProgress,
  IconButton,
} from "@mui/material";
import SaveIcon from "../assets/icons/SaveIcon.jsx";
import JobFieldIcon from "../assets/icons/JobFieldIcon.jsx";
import React from "react";
import { JobTimeIcon } from "../assets/icons/JobTimeIcon.jsx";
import { JobLocationIcon } from "../assets/icons/JobLocationIcon.jsx";
import { JobSalaryIcon } from "../assets/icons/JobSalaryIcon.jsx";
import { useNavigate } from "react-router-dom";
import {
  useGetSavedJobsQuery,
  useToggleSaveJobMutation,
} from "../../src/redux/api/savedJobsApi";
import { useAuth } from "../../src/context/AuthContext";

// Expected job object structure
const JobCard = ({ job }) => {
  console.log("Job Details:", job);

  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: savedJobsData } = useGetSavedJobsQuery(undefined, {
    skip: !user || user.role === "employer", // Don't fetch if not logged in or is employer
  });

  // 3. Setup the mutation hook
  const [toggleSaveJob, { isLoading: isToggling }] = useToggleSaveJobMutation();

  // Determine if this specific job is in the saved list
  const isSaved = savedJobsData?.data?.some(
    (savedJob) => savedJob._id === job._id,
  );
  const goToDetails = () => {
    navigate(`/jobDetails/${job._id}`); // dynamic route
  };

  const handleToggleSave = async (e) => {
    e.stopPropagation(); // Prevents clicking the card background if you have an onClick there

    if (!user) {
      alert("Please log in to save jobs!");
      return;
    }

    if (user.role === "employer") {
      alert("Employers cannot save jobs.");
      return;
    }

    try {
      await toggleSaveJob(job._id).unwrap();
    } catch (error) {
      console.error("Failed to toggle save:", error);
      alert("Something went wrong while saving the job.");
    }
  };
  return (
    <Card
      sx={{ p: { xs: 1, md: 3 }, mb: { xs: 1, md: 2 }, boxShadow: 2 }}
      width="100%"
    >
      {/* Posted Date Label */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box
          sx={{
            backgroundColor: "lightgreen.main",
            fontSize: 16,
            px: 1,
            py: 0.1,
            borderRadius: "4px",
            width: "fit-content",
          }}
        >
          <Typography variant="caption" color="text.green">
            {job.createdAt}
          </Typography>
        </Box>
        <IconButton
          onClick={handleToggleSave}
          disabled={isToggling}
          sx={{
            // Use a highly visible color when saved (e.g., green or blue)
            color: isSaved ? "primary.main" : "text.secondary",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.04)",
            },
          }}
        >
          {isToggling ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            <Box
              sx={{
                display: "flex",
                transform: isSaved ? "scale(1.1)" : "scale(1)", // Slight pop effect
                transition: "transform 0.2s",
              }}
            >
              {/* Pass the isSaved prop to your custom icon */}
              <SaveIcon isFilled={isSaved} />
            </Box>
          )}
        </IconButton>
      </Box>

      {/* Company Info */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        spacing={2}
        mb={2}
      >
        <Avatar src={job.companyIcon} alt={job.companyName} />
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {job.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {" "}
            {job.company.name}
          </Typography>
        </Box>
      </Stack>

      {/* Job Details */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box
          mb={1}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            width: { xs: "100%", lg: "80%" },
            gap: { xs: 1 },
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", lg: "63%" },
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 1,
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: { xs: "100%", md: "35%" },
                display: "flex",
                flexDirection: "row",
                gap: 1,
                alignItems: "center",
              }}
            >
              <JobFieldIcon />
              <Typography
                variant="body2"
                sx={{ color: "text.gray", fontWeight: "bold" }}
              >
                {job.jobField}
              </Typography>
            </Box>
            <Box
              sx={{
                width: { xs: "100%", md: "30%" },
                display: "flex",
                flexDirection: "row",
                gap: 1,
                alignItems: "center",
              }}
            >
              <JobTimeIcon />
              <Typography
                variant="body2"
                sx={{ color: "text.gray", fontWeight: "bold" }}
              >
                {job.type}
              </Typography>
            </Box>
            <Box
              sx={{
                width: { xs: "100%", md: "35%" },
                display: "flex",
                flexDirection: "row",
                gap: 1,
                alignItems: "center",
              }}
            >
              <JobLocationIcon />
              <Typography
                variant="body2"
                sx={{ color: "text.gray", fontWeight: "bold" }}
              >
                {job.location}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: { xs: "100%", lg: "37%" },
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 1,
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: { xs: "100%", md: "40%" },
                display: "flex",
                flexDirection: "row",
                gap: 1,
                alignItems: "center",
              }}
            >
              <JobFieldIcon />
              <Typography
                variant="body2"
                sx={{ color: "text.gray", fontWeight: "bold" }}
              >
                {job.workMode}
              </Typography>
            </Box>
            <Box
              sx={{
                width: { xs: "100%", md: "60%" },
                display: "flex",
                flexDirection: "row",
                gap: 1,
                alignItems: "center",
              }}
            >
              <JobSalaryIcon />
              <Typography
                variant="body2"
                sx={{ color: "text.gray", fontWeight: "bold" }}
              >
                {job.salary}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: { xs: "100%", sm: "100%", md: "100%", lg: "20%" },
            maxWidth: { lg: "150px" },
          }}
        >
          <Button
            variant="contained"
            color="primarygreen"
            sx={{ textTransform: "none", color: "#ffffff" }}
            fullWidth
            onClick={goToDetails}
          >
            Job Details
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default JobCard;
