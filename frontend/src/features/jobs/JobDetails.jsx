import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Modal,
  TextField,
  Input,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SaveIcon from "../../assets/icons/SaveIcon";
import JobFieldIcon from "../../assets/icons/JobFieldIcon";
import { JobTimeIcon } from "../../assets/icons/JobTimeIcon";
import { JobLocationIcon } from "../../assets/icons/JobLocationIcon";
import { JobSalaryIcon } from "../../assets/icons/JobSalaryIcon";
import { useParams } from "react-router-dom";
import MarkImage from "../../assets/images/MarkImage.png";
import JobService from "../jobs/JobService.js";
import Skeleton from "@mui/material/Skeleton";

const JobDetails = () => {
  // const navigate = useNavigate();
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  // const [application, setApplication] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  // Form input states
  const [coverLetter, setCoverLetter] = useState("");
  const [newResumeFile, setNewResumeFile] = useState(null);

  // Loading states
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", sm: 400 }, // Responsive width
    bgcolor: "lightgreen.main", // Using your color
    borderRadius: "10px",
    boxShadow: 24,
    p: 4, // Add some padding
  };
  // const handleapply = () => {
  //    navigate(`/applyJob/${job._id}`); // dynamic route

  //  };
const handleOpen = async () => {
  setOpen(true);
  setModalLoading(true);

  // Clear old form state
  setNewResumeFile(null);
  setCoverLetter("");

  try {
    // *** IMPORTANT: Fetch the CURRENT USER's profile data ***
    // This should return their default saved resume URL.
    // Replace this with your actual API call.
    // const res = await UserService.getUserProfile();

    // MOCK DATA (Remove this and use your API)
    const mockApiCall = () =>
      new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              data: {
                // This is the user's currently saved resume
                resumeUrl:
                  "https://res.cloudinary.com/demo/image/upload/default_resume.pdf",
              },
            }),
          1000
        )
      );
    const res = await mockApiCall();
    // MOCK DATA END

    if (res?.data) {
      setUserProfile(res.data);
    }
  } catch (err) {
    console.error("Failed to fetch user profile", err);
  } finally {
    setModalLoading(false);
  }
};

const handleClose = () => {
  if (isSubmitting) return; // Don't close while submitting
  setOpen(false);
  setUserProfile(null); // Clear data
};

const handleFileChange = (event) => {
  if (event.target.files && event.target.files[0]) {
    setNewResumeFile(event.target.files[0]);
  }
};

const handleSubmitApplication = async () => {
  setIsSubmitting(true);
  let finalResumeUrl = userProfile.resumeUrl; // Start with the default

  try {
    // 1. If a new file is selected, upload it
    if (newResumeFile) {
      console.log("Uploading new resume...", newResumeFile.name);
      // --- YOU MUST IMPLEMENT THIS ---
      // This function needs to upload 'newResumeFile' to Cloudinary
      // and return the new URL.
      // const uploadRes = await FileUploadService.upload(newResumeFile);
      // finalResumeUrl = uploadRes.data.secure_url;

      // MOCK UPLOAD (replace this)
      await new Promise((res) => setTimeout(res, 1500)); // fake network delay
      finalResumeUrl = `https://res.cloudinary.com/demo/image/upload/${newResumeFile.name}`;
      // --- END MOCK UPLOAD ---
    }

    // 2. Submit the application
    const applicationData = {
      jobId: id,
      resumeUrl: finalResumeUrl,
      coverLetter: coverLetter,
    };

    console.log("Submitting application:", applicationData);
    // const submitRes = await ApplicationService.submit(applicationData);

    // MOCK SUBMIT (replace this)
    await new Promise((res) => setTimeout(res, 1000));
    // --- END MOCK SUBMIT ---

    // Success
    setIsSubmitting(false);
    handleClose();
    // You should show a success message here (e.g., Snackbar)
  } catch (err) {
    console.error("Failed to submit application", err);
    setIsSubmitting(false);
    // Show an error to the user
  }
};

  return error ? (
    error
  ) : (
    <Box sx={{ mt: 8, padding: { xs: 2, md: 4 } }}>
      {loading ? (
        <Box sx={{ width: 300 }}>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>
      ) : (
        <>
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
                  // onClick={handleapply}
                  aria-describedby="apply-job-modal" // Good for accessibility
                  onClick={handleOpen}
                >
                  Apply Job
                </Button>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{ backgroundColor: "lightgreen.main", borderRadius: "10px" }}
          >
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
        </>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="apply-job-modal-title"
      >
        <Box sx={modalStyle}>
          <Typography id="apply-job-modal-title" variant="h6" fontWeight="bold">
            Apply for: {job?.title}
          </Typography>

          {modalLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
              <CircularProgress />
            </Box>
          ) : userProfile ? (
            // --- Application Form ---
            <Box
              component="form"
              sx={{ mt: 2, maxHeight: "70vh", overflowY: "auto" }}
            >
              {/* --- Resume Section --- */}
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Resume
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Your current resume is on file. You can upload a new one for
                this application.
              </Typography>
              <Link href={userProfile.resumeUrl} target="_blank" rel="noopener">
                View Current Resume
              </Link>

              <Button
                variant="outlined"
                component="label" // This is key
                fullWidth
                sx={{ mt: 2, mb: 1 }}
              >
                Upload New Resume
                <Input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                />
              </Button>
              {newResumeFile && (
                <Typography variant="body2" color="text.secondary">
                  Selected: {newResumeFile.name}
                </Typography>
              )}

              {/* --- Cover Letter Section --- */}
              <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3 }}>
                Cover Letter
              </Typography>
              <TextField
                label="Cover Letter (Optional)"
                multiline
                rows={6}
                fullWidth
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                variant="outlined"
                sx={{ mt: 1 }}
              />
            </Box>
          ) : (
            <Typography sx={{ mt: 2 }}>Could not load user profile.</Typography>
          )}

          {/* --- Action Buttons --- */}
          <Box
            sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 1 }}
          >
            <Button onClick={handleClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmitApplication}
              disabled={modalLoading || isSubmitting}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Submit Application"
              )}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default JobDetails;
