import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SaveIcon from "../../assets/icons/SaveIcon";
import JobFieldIcon from "../../assets/icons/JobFieldIcon";
import { JobTimeIcon } from "../../assets/icons/JobTimeIcon";
import { JobLocationIcon } from "../../assets/icons/JobLocationIcon";
import { JobSalaryIcon } from "../../assets/icons/JobSalaryIcon";
import { useNavigate, useParams } from "react-router-dom";
import MarkImage from "../../assets/images/MarkImage.png";
import JobService from "../jobs/JobService.js";

const JobDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


 const fetchJobDetails = async (jobId) => {
   try {
     setLoading(true);
     setError("");
     const res = await JobService.getJob(jobId); // replace with your API
     if (res?.data) {
       setJob(res.data);
     } else {
       setError("Job not found");
     }
   } catch (err) {
     setError("Failed to fetch job details", err);
   } finally {
     setLoading(false);
   }
 };

 useEffect(() => {
   if (id) fetchJobDetails(id);
 }, [id]);


  const handleapply = () => {
     navigate(`/applyJob/${job._id}`); // dynamic route
   };


  return (
    <Box sx={{ mt: 8, padding: { xs: 2, md: 4 } }}>
      <Box sx={{ p: { xs: 1, md: 3 }, mb: { xs: 1, md: 2 } }} width="100%">
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
              {job?.createdAt}
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
          <Avatar src={job?.companyIcon} alt={job?.companyName} />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {job?.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {" "}
              {job?.company?.name}
            </Typography>
          </Box>
        </Stack>

        {/* Job Details */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
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
              width: { xs: "100%", sm: "80%" },
              gap: { xs: 1 },
            }}
          >
            <Box
              sx={{
                width: { xs: "100%", md: "63%" },
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
                  {job?.jobField}
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
                  {job?.type}
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
                  {job?.company?.location}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: { xs: "100%", md: "37%" },
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
                  {job?.workMode}
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
                  {job?.salary}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: { xs: "100%", sm: "100%", md: "20%" },
              maxWidth: { md: "150px" },
            }}
          >
            <Button
              variant="contained"
              color="primarygreen"
              sx={{ textTransform: "none", color: "#ffffff" }}
              fullWidth
              onClick={handleapply}
            >
              Apply Job
            </Button>
          </Box>
        </Box>
      </Box>
      <Box sx={{ backgroundColor: "lightgreen.main", borderRadius: "10px" }}>
        {/* Job Description */}
        <Box sx={{ p: 2 }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            mb={1}
            sx={{ color: "text.gray" }}
          >
            Job Description
          </Typography>
          <Typography variant="body1" sx={{ color: "text.gray" }}>
            {job?.description}
          </Typography>
        </Box>

        {/* Key Responsibilities */}
        <Box sx={{ p: 2 }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            mb={1}
            sx={{ color: "text.gray" }}
          >
            Key Responsibilities
          </Typography>
          <ul>
            {job?.keyResponsibilities.map((responsibility, index) => (
              <li
                key={index}
                style={{
                  listStyle: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <img
                  src={MarkImage}
                  alt=""
                  style={{ width: "20px", height: "20px" }}
                />
                <Typography variant="body1" sx={{ color: "text.gray" }}>
                  {responsibility}
                </Typography>
              </li>
            ))}
          </ul>
        </Box>

        {/* Professional Skills */}
        <Box sx={{ p: 2 }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            mb={1}
            sx={{ color: "text.gray" }}
          >
            Professional Skills
          </Typography>
          <ul>
            {job?.professionalSkills.map((skill, index) => (
              <li
                key={index}
                style={{
                  listStyle: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <img
                  src={MarkImage}
                  alt=""
                  style={{ width: "20px", height: "20px" }}
                />
                <Typography variant="body1" sx={{ color: "text.gray" }}>
                  {skill}
                </Typography>
              </li>
            ))}
          </ul>
        </Box>
      </Box>
    </Box>
  );
};

export default JobDetails;
