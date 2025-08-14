import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Stack,
  Button,
} from "@mui/material";
import SaveIcon from "../assets/icons/SaveIcon.jsx";
import JobFieldIcon from "../assets/icons/JobFieldIcon.jsx";
import React from "react";
import { JobTimeIcon } from "../assets/icons/JobTimeIcon.jsx";
import { JobLocationIcon } from "../assets/icons/JobLocationIcon.jsx";
import { JobSalaryIcon } from "../assets/icons/JobSalaryIcon.jsx";
import { useNavigate } from "react-router-dom";

// Expected job object structure
const JobCard = ({ job }) => {
    console.log("Job Details:", job);

  const navigate = useNavigate();
   const goToDetails = () => {
     navigate(`/jobDetails/${job.id}`); // dynamic route
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
            {job.postedDate}
          </Typography>
        </Box>
        <SaveIcon />
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
            {job.jobTitle} — {job.jobField}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {" "}
            {job.companyName}
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
                {job.jobType}
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
                {job.jobLocation}
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
