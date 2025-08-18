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
 
} from "@mui/material";
import countryCityMap from "../../data/CountryCityData";
import { useNavigate } from "react-router-dom";

const steps = ["Company Info", "Details", "Account Setup"];

const CreateCompany = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phone: "",
    address: "",
    logo: null,
    description: "",
    city: "",
    country: "",
    password: "",
    confirmPassword:"",
  });



  const [error, setError] = useState("");

  const handleNext = () => {
    // Step validation
    if (activeStep === 0) {
      if (!formData.companyName || !formData.email) {
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

  const handleSubmit = () => {
    if (!formData.password || !formData.confirmPassword) {
      setError("Please fill in your password and confirm it");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    console.log("Form submitted:", formData);
    // TODO: send data to backend API

    navigate("/companyProfile");
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
              name="companyName"
              label="Company Name"
              value={formData.companyName}
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
      case 2:
        return (
          <>
            <TextField
              size="small"
              fullWidth
              name="password"
              type="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              size="small"
              fullWidth
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              margin="normal"
              required
            />
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
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default CreateCompany;
