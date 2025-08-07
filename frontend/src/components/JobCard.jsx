import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";
import SaveIcon from "../assets/icons/SaveIcon.jsx"
import JobFieldIcon from "../assets/icons/JobFieldIcon.jsx";
import React from "react";
import { JobTimeIcon } from "../assets/icons/JobTimeIcon.jsx";
import { JobLocationIcon } from "../assets/icons/JobLocationIcon.jsx";
import { JobSalaryIcon } from "../assets/icons/JobSalaryIcon.jsx";

// Expected job object structure
const JobCard = ({ job }) => {
  return (
    <Card sx={{ p: 2, mb: 2, boxShadow: 3 }} width="100%">
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
      <Stack direction="row" alignItems="center" spacing={2} mb={2}>
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
        mb={1}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            width: "25%",
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
            width: "15%",
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
            width: "23%",
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
        <Box
          sx={{
            width: "17%",
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
            width: "20%",
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
    </Card>
  );
};

export default JobCard;
