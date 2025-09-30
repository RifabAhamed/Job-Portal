import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import JobService from "../jobs/JobService.js"; // adjust path

const CreateJob = () => {
  const navigate = useNavigate();
  const { companyId } = useParams(); // get company ID from URL
console.log("companyId:", companyId);

  const [jobData, setJobData] = useState({
    title: "",
    position: "",
    description: "",
    location: "",
    salary: "",
    type: "full-time",
    jobField: "",
    keyResponsibilities: [""],
    professionalSkills: [""],
    workMode: "onsite",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleArrayChange = (e, index, field) => {
    const values = [...jobData[field]];
    values[index] = e.target.value;
    setJobData({ ...jobData, [field]: values });
  };

  const addArrayField = (field) => {
    setJobData({ ...jobData, [field]: [...jobData[field], ""] });
  };

  const removeArrayField = (field, index) => {
    const values = [...jobData[field]];
    values.splice(index, 1);
    setJobData({ ...jobData, [field]: values });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await JobService.createJob(companyId, jobData);
      setSuccess("Job created successfully!");
      setTimeout(() => {
        navigate(`/companyProfile/${companyId}`);
      }, 1500);
    } catch (err) {
      setError(err?.toString() || "Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        p: 4,
      }}
    >
      <Paper sx={{ width: "100%", maxWidth: 700, p: 4, borderRadius: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Create Job Posting
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Job Title"
            name="title"
            value={jobData.title}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Position"
            name="position"
            value={jobData.position}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={jobData.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
            required
          />
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={jobData.location}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Salary"
            name="salary"
            value={jobData.salary}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            select
            fullWidth
            label="Job Type"
            name="type"
            value={jobData.type}
            onChange={handleChange}
            margin="normal"
          >
            <MenuItem value="full-time">Full-time</MenuItem>
            <MenuItem value="part-time">Part-time</MenuItem>
          </TextField>

          <TextField
            fullWidth
            label="Job Field"
            name="jobField"
            value={jobData.jobField}
            onChange={handleChange}
            margin="normal"
          />

          {/* Key Responsibilities */}
          <Typography variant="subtitle1" mt={2}>
            Key Responsibilities
          </Typography>
          {jobData.keyResponsibilities.map((item, index) => (
            <Box key={index} display="flex" gap={1} mb={1}>
              <TextField
                fullWidth
                value={item}
                onChange={(e) =>
                  handleArrayChange(e, index, "keyResponsibilities")
                }
                placeholder="Responsibility"
              />
              <Button
                color="error"
                onClick={() => removeArrayField("keyResponsibilities", index)}
              >
                Remove
              </Button>
            </Box>
          ))}
          <Button
            variant="outlined"
            onClick={() => addArrayField("keyResponsibilities")}
          >
            Add Responsibility
          </Button>

          {/* Professional Skills */}
          <Typography variant="subtitle1" mt={2}>
            Professional Skills
          </Typography>
          {jobData.professionalSkills.map((item, index) => (
            <Box key={index} display="flex" gap={1} mb={1}>
              <TextField
                fullWidth
                value={item}
                onChange={(e) =>
                  handleArrayChange(e, index, "professionalSkills")
                }
                placeholder="Skill"
              />
              <Button
                color="error"
                onClick={() => removeArrayField("professionalSkills", index)}
              >
                Remove
              </Button>
            </Box>
          ))}
          <Button
            variant="outlined"
            onClick={() => addArrayField("professionalSkills")}
          >
            Add Skill
          </Button>

          <TextField
            select
            fullWidth
            label="Work Mode"
            name="workMode"
            value={jobData.workMode}
            onChange={handleChange}
            margin="normal"
          >
            <MenuItem value="onsite">Onsite</MenuItem>
            <MenuItem value="remote">Remote</MenuItem>
            <MenuItem value="hybrid">Hybrid</MenuItem>
          </TextField>

          <Box mt={3} textAlign="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Create Job"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateJob;
