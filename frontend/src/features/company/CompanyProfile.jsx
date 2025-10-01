import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CompanyService from "../company/CompanyService.js";
import JobService from "../jobs/JobService.js"; // optional, for listing jobs

const CompanyProfile = () => {
  const navigate = useNavigate();
  const { companyId } = useParams(); // get company ID from URL
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch company details
  const fetchCompany = async () => {
    try {
      setLoading(true);
      const res = await CompanyService.getCompany(companyId);
      setCompany(res.data || res);
    } catch (err) {
      setError(err?.toString() || "Failed to fetch company");
    } finally {
      setLoading(false);
    }
  };

  // Fetch jobs posted by the company
  const fetchJobs = async () => {
    try {
      const res = await JobService.getJobsByCompany(companyId);
      setJobs(res.data.jobs || res);
      console.log(jobs);
      
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    }
  };

  useEffect(() => {
    if (!companyId) {
      navigate("/createCompany");
      return;
    }
    fetchCompany();
    fetchJobs();
  }, [companyId, navigate]);

  if (loading)
    return (
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (error) return <Alert severity="error">{error}</Alert>;
  if (!company) return null;

  const logoSrc =
    typeof company.logo === "string"
      ? company.logo
      : company.logo
      ? URL.createObjectURL(company.logo)
      : "";

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        p: 2,
      }}
    >
      <Paper
        sx={{
          width: "100%",
          maxWidth: 800,
          p: 4,
          borderRadius: 4,
          backgroundColor: "#fff",
        }}
      >
        {/* Company Header */}
        <Box textAlign="center" mb={3}>
          <Avatar
            src={logoSrc}
            alt={company.name}
            sx={{
              width: 100,
              height: 100,
              margin: "0 auto",
              mb: 2,
              bgcolor: "#1976d2",
              fontSize: "2rem",
            }}
          >
            {!logoSrc && company.name?.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="h4" fontWeight="bold">
            {company.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {company.location || "Location not provided"}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Company Details */}
        <List>
          <ListItem>
            <ListItemText
              primary="Email"
              secondary={company.createdBy?.email || "N/A"}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Description"
              secondary={company.description || "No description"}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Website"
              secondary={company.website || "N/A"}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Industry"
              secondary={company.industry || "-"}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Company Size"
              secondary={company.companySize || "-"}
            />
          </ListItem>
        </List>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/editCompany/${company._id}`)}
          >
            Edit Profile
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate(`/createJob/${company._id}`)}
          >
            Post a Job
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Jobs Posted */}
        <Box>
          <Typography variant="h5" mb={1}>
            Jobs Posted
          </Typography>
          {jobs.length === 0 ? (
            <Typography variant="body1" color="text.secondary">
              No jobs posted yet.
            </Typography>
          ) : (
            <List>
              {jobs.map((job) => (
                <ListItem key={job._id}>
                  <ListItemText
                    primary={job.title}
                    secondary={job.description}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default CompanyProfile;
