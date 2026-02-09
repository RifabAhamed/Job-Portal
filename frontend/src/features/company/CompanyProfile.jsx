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
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  Snackbar,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CompanyService from "../company/CompanyService.js";
import JobService from "../jobs/JobService.js";
import JobApplicationService from "../jobs/JobApplicationService.js";

const CompanyProfile = () => {
  const navigate = useNavigate();
  const { companyId } = useParams(); // get company ID from URL
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal states
  const [selectedJob, setSelectedJob] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [applicationsModalOpen, setApplicationsModalOpen] = useState(false);
  const [applications, setApplications] = useState([]);
  const [applicationsLoading, setApplicationsLoading] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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

  // Handle View Details
  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setDetailsModalOpen(true);
  };

  // Handle View Applications
  const handleViewApplications = async (job) => {
    setSelectedJob(job);
    setApplicationsLoading(true);
    try {
      const res = await JobApplicationService.getApplicationsForJob(job._id);
      console.log("Applications response:", res);
      console.log("Response data:", res?.data);

      // Handle pagination object response: { applications: [...], total: X, page: Y, pages: Z }
      let appData = [];
      if (res?.data?.applications) {
        // If data contains pagination object
        appData = res.data.applications;
      } else if (Array.isArray(res?.data)) {
        // If data is directly an array
        appData = res.data;
      } else if (Array.isArray(res)) {
        // If response is directly an array
        appData = res;
      }

      console.log("Extracted applications:", appData);
      setApplications(Array.isArray(appData) ? appData : []);
    } catch (err) {
      console.error("Failed to fetch applications", err);
      setSnackbarMessage(`Failed to load applications: ${err}`);
      setSnackbarOpen(true);
      setApplications([]);
    } finally {
      setApplicationsLoading(false);
    }
    setApplicationsModalOpen(true);
  };

  // Handle Edit Job
  const handleEditJob = (job) => {
    setSelectedJob(job);
    setEditFormData({ ...job });
    setEditModalOpen(true);
  };

  // Handle Save Edit
  const handleSaveEdit = async () => {
    try {
      await JobService.updateJob(selectedJob._id, editFormData);
      setSnackbarMessage("Job updated successfully");
      setSnackbarOpen(true);
      setEditModalOpen(false);
      fetchJobs();
    } catch {
      setSnackbarMessage("Failed to update job");
      setSnackbarOpen(true);
    }
  };

  // Handle Delete Job
  const handleDeleteJob = async () => {
    try {
      await JobService.deleteJob(selectedJob._id);
      setSnackbarMessage("Job deleted successfully");
      setSnackbarOpen(true);
      setDeleteConfirmOpen(false);
      fetchJobs();
    } catch {
      setSnackbarMessage("Failed to delete job");
      setSnackbarOpen(true);
    }
  };

  // Close all modals
  const closeDetailsModal = () => {
    setDetailsModalOpen(false);
    setSelectedJob(null);
  };

  const closeApplicationsModal = () => {
    setApplicationsModalOpen(false);
    setSelectedJob(null);
    setApplications([]);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedJob(null);
    setEditFormData({});
  };

  const closeDeleteConfirm = () => {
    setDeleteConfirmOpen(false);
    setSelectedJob(null);
  };

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
          <Typography variant="h5" mb={2}>
            Jobs Posted
          </Typography>
          {jobs.length === 0 ? (
            <Typography variant="body1" color="text.secondary">
              No jobs posted yet.
            </Typography>
          ) : (
            <List sx={{ width: "100%" }}>
              {jobs.map((job, index) => (
                <React.Fragment key={job._id}>
                  <ListItem
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      py: 2,
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" fontWeight="bold">
                        {job.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 1 }}
                      >
                        {job.description?.substring(0, 100)}...
                      </Typography>
                      <Box
                        sx={{
                          mt: 1,
                          display: "flex",
                          gap: 1,
                          flexWrap: "wrap",
                        }}
                      >
                        <Chip label={job.location} size="small" />
                        <Chip
                          label={`$${job.salary || "Not specified"}`}
                          size="small"
                        />
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        flexWrap: "wrap",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleViewDetails(job)}
                      >
                        Details
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleViewApplications(job)}
                      >
                        Applications
                      </Button>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => handleEditJob(job)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => {
                          setSelectedJob(job);
                          setDeleteConfirmOpen(true);
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </ListItem>
                  {index < jobs.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          )}
        </Box>

        {/* Job Details Modal */}
        <Dialog
          open={detailsModalOpen}
          onClose={closeDetailsModal}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Job Details</DialogTitle>
          <DialogContent sx={{ pt: 2 }}>
            {selectedJob && (
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {selectedJob.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  <strong>Location:</strong> {selectedJob.location}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  <strong>Salary:</strong> $
                  {selectedJob.salary || "Not specified"}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  <strong>Employment Type:</strong>{" "}
                  {selectedJob.employmentType || "Not specified"}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  <strong>Experience Level:</strong>{" "}
                  {selectedJob.experienceLevel || "Not specified"}
                </Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  <strong>Description:</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedJob.description}
                </Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  <strong>Requirements:</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedJob.requirements || "Not specified"}
                </Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDetailsModal}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* Applications Modal */}
        <Dialog
          open={applicationsModalOpen}
          onClose={closeApplicationsModal}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Applications for {selectedJob?.title}</DialogTitle>
          <DialogContent sx={{ pt: 2 }}>
            {applicationsLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            ) : applications.length === 0 ? (
              <Typography color="text.secondary">
                No applications yet.
              </Typography>
            ) : (
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Applicant</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Cover Letter</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {applications.map((app) => (
                      <TableRow key={app._id}>
                        <TableCell>
                          {app.applicant?.name ||
                            app.applicant?.fullName ||
                            "N/A"}
                        </TableCell>
                        <TableCell>{app.applicant?.email || "N/A"}</TableCell>
                        <TableCell
                          sx={{
                            maxWidth: 200,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {app.coverLetter || "No cover letter"}
                        </TableCell>
                        <TableCell>
                          <Chip label={app.status || "Pending"} size="small" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={closeApplicationsModal}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* Edit Job Modal */}
        <Dialog
          open={editModalOpen}
          onClose={closeEditModal}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Edit Job</DialogTitle>
          <DialogContent sx={{ pt: 2 }}>
            {selectedJob && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  label="Job Title"
                  value={editFormData.title || ""}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, title: e.target.value })
                  }
                  fullWidth
                />
                <TextField
                  label="Location"
                  value={editFormData.location || ""}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      location: e.target.value,
                    })
                  }
                  fullWidth
                />
                <TextField
                  label="Salary"
                  type="number"
                  value={editFormData.salary || ""}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, salary: e.target.value })
                  }
                  fullWidth
                />
                <TextField
                  label="Description"
                  multiline
                  rows={4}
                  value={editFormData.description || ""}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      description: e.target.value,
                    })
                  }
                  fullWidth
                />
                <TextField
                  label="Requirements"
                  multiline
                  rows={3}
                  value={editFormData.requirements || ""}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      requirements: e.target.value,
                    })
                  }
                  fullWidth
                />
                <TextField
                  label="Employment Type"
                  value={editFormData.employmentType || ""}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      employmentType: e.target.value,
                    })
                  }
                  fullWidth
                />
                <TextField
                  label="Experience Level"
                  value={editFormData.experienceLevel || ""}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      experienceLevel: e.target.value,
                    })
                  }
                  fullWidth
                />
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={closeEditModal}>Cancel</Button>
            <Button
              onClick={handleSaveEdit}
              variant="contained"
              color="primary"
            >
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <Dialog open={deleteConfirmOpen} onClose={closeDeleteConfirm}>
          <DialogTitle>Delete Job</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete &quot;{selectedJob?.title}&quot;?
              This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDeleteConfirm}>Cancel</Button>
            <Button onClick={handleDeleteJob} variant="contained" color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert onClose={() => setSnackbarOpen(false)} severity="success">
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default CompanyProfile;
