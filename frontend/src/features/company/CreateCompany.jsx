import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Alert,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import countryCityMap from "../../data/CountryCityData";
import { useNavigate } from "react-router-dom";
import CompanyService from "../company/CompanyService.js";

const steps = ["Company Info", "Details"];

const CreateCompany = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    logo: null,
    description: "",
    city: "",
    country: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");

  const handleNext = () => {
    // Step validation
    if (activeStep === 0) {
      if (!formData.name || !formData.email) {
        setError("Please fill all required fields in Company Info");
        return;
      }
    }
    if (activeStep === 1) {
      if (!formData.country || !formData.city) {
        setError("Please select both country and city");
        return;
      }
    }

    setError(""); // clear error if validation passes
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    setError("");
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setError("");

      // Prepare FormData for multipart submission (for logo file)
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("email", formData.email);
      submitData.append("phone", formData.phone);
      submitData.append("address", formData.address);
      submitData.append("description", formData.description);
      // Combine city and country into location
      const location =
        formData.city && formData.country
          ? `${formData.city}, ${formData.country}`
          : "";
      submitData.append("location", location);
      submitData.append("country", formData.country);
      submitData.append("city", formData.city);

      // Append logo if selected
      if (formData.logo instanceof File) {
        submitData.append("logo", formData.logo);
      }

      // Call API to create company
      const response = await CompanyService.createCompany(submitData);

      if (response?.data?._id || response?.status === 201) {
        alert("Company created successfully!");
        // Navigate to employer dashboard
        navigate("/employer-dashboard");
      }
    } catch (err) {
      setError(
        typeof err === "string"
          ? err
          : "Failed to create company. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const selectCountry = (e) => {
    const { name, value } = e.target;

    // If country changes, reset city
    if (name === "country") {
      setFormData({ country: value, city: "" });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField
              size="small"
              fullWidth
              name="name"
              label="Company Name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              size="small"
              fullWidth
              name="email"
              type="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              size="small"
              fullWidth
              name="phone"
              type="tel"
              label="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              margin="normal"
            />
          </>
        );
      case 1:
        return (
          <>
            <Button
              size="small"
              variant="outlined"
              component="label"
              fullWidth
              sx={{ my: 2 }}
            >
              Upload Logo
              <input
                type="file"
                hidden
                name="logo"
                accept="image/*"
                onChange={handleChange}
              />
            </Button>
            <TextField
              size="small"
              fullWidth
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={3}
            />
            <TextField
              size="small"
              select
              fullWidth
              name="country"
              label="Country"
              value={formData.country}
              onChange={handleChange}
              margin="normal"
            >
              <MenuItem value="">
                <em>Select Country</em>
              </MenuItem>
              {Object.keys(countryCityMap).map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </TextField>

            {/* City Select */}
            <TextField
              size="small"
              select
              fullWidth
              name="city"
              label="City"
              value={formData.city}
              onChange={selectCountry}
              margin="normal"
              disabled={!formData.country} // disable until country is selected
            >
              <MenuItem value="">
                <em>Select City</em>
              </MenuItem>
              {formData.country &&
                countryCityMap[formData.country].map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
            </TextField>
          </>
        );
      default:
        return null;
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
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 600,
          p: 4,
          borderRadius: 4,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
          Create Company
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ my: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Show error if validation fails */}
        {error && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {renderStepContent(activeStep)}

        <Box
          size="small"
          sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}
        >
          <Button
            disabled={activeStep === 0 || submitting}
            onClick={handleBack}
          >
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Creating...
                </>
              ) : (
                "Create Company"
              )}
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              disabled={submitting}
            >
              Next
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default CreateCompany;
