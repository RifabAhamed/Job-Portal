import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CompanyService from "../company/CompanyService.js";
import countryCityMap from "../../data/CountryCityData";

const EditCompany = () => {
  const navigate = useNavigate();
  const { companyId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    logo: null,
    description: "",
    city: "",
    country: "",
    website: "",
    industry: "",
    companySize: "",
  });

  const [logoPreview, setLogoPreview] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch company details on mount
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);
        const res = await CompanyService.getCompany(companyId);
        const company = res.data || res;

        setFormData({
          name: company.name || "",
          email: company.email || "",
          phone: company.phone || "",
          address: company.address || "",
          logo: null, // Keep null, we'll handle display separately
          description: company.description || "",
          city: company.city || "",
          country: company.country || "",
          website: company.website || "",
          industry: company.industry || "",
          companySize: company.companySize || "",
        });

        // Set logo preview from URL
        if (company.logo) {
          setLogoPreview(company.logo);
        }
      } catch (err) {
        setError(err?.toString() || "Failed to fetch company details");
      } finally {
        setLoading(false);
      }
    };

    if (companyId) {
      fetchCompany();
    }
  }, [companyId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
      // Preview the image
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target.result);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    setError("");
  };

  const handleCountryChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      country: value,
      city: "", // Reset city when country changes
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email) {
      setError("Company name and email are required");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      // Prepare form data for submission
      const updateData = new FormData();
      updateData.append("name", formData.name);
      updateData.append("email", formData.email);
      updateData.append("phone", formData.phone);
      updateData.append("address", formData.address);
      updateData.append("description", formData.description);
      updateData.append("city", formData.city);
      updateData.append("country", formData.country);
      updateData.append("website", formData.website);
      updateData.append("industry", formData.industry);
      updateData.append("companySize", formData.companySize);

      // Only append logo if a new file was selected
      if (formData.logo instanceof File) {
        updateData.append("logo", formData.logo);
      }

      await CompanyService.updateCompany(companyId, updateData);

      // Success - navigate back to dashboard
      alert("Company updated successfully!");
      navigate("/employer-dashboard");
    } catch (err) {
      setError(
        typeof err === "string"
          ? err
          : "Failed to update company. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
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
  }

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
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 700,
          p: 4,
          borderRadius: 4,
          backgroundColor: "#fff",
          mt: 3,
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
          Edit Company
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          {/* Company Name */}
          <TextField
            size="small"
            fullWidth
            name="name"
            label="Company Name *"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />

          {/* Email */}
          <TextField
            size="small"
            fullWidth
            name="email"
            type="email"
            label="Email *"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />

          {/* Phone */}
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

          {/* Address */}
          <TextField
            size="small"
            fullWidth
            name="address"
            label="Address"
            value={formData.address}
            onChange={handleChange}
            margin="normal"
          />

          {/* Logo */}
          <Box sx={{ my: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Company Logo
            </Typography>
            {logoPreview && (
              <Box
                sx={{
                  width: 150,
                  height: 150,
                  mb: 2,
                  borderRadius: 2,
                  overflow: "hidden",
                  bgcolor: "#f0f0f0",
                }}
              >
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
            )}
            <Button size="small" variant="outlined" component="label" fullWidth>
              Upload New Logo
              <input
                type="file"
                hidden
                name="logo"
                accept="image/*"
                onChange={handleChange}
              />
            </Button>
          </Box>

          {/* Description */}
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

          {/* Website */}
          <TextField
            size="small"
            fullWidth
            name="website"
            label="Website"
            value={formData.website}
            onChange={handleChange}
            margin="normal"
            placeholder="https://example.com"
          />

          {/* Industry */}
          <TextField
            size="small"
            fullWidth
            name="industry"
            label="Industry"
            value={formData.industry}
            onChange={handleChange}
            margin="normal"
            placeholder="e.g., Technology, Finance, etc."
          />

          {/* Company Size */}
          <TextField
            size="small"
            fullWidth
            name="companySize"
            label="Company Size"
            value={formData.companySize}
            onChange={handleChange}
            margin="normal"
            placeholder="e.g., 1-50, 51-200, etc."
          />

          {/* Country */}
          <TextField
            size="small"
            select
            fullWidth
            name="country"
            label="Country"
            value={formData.country}
            onChange={handleCountryChange}
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

          {/* City */}
          <TextField
            size="small"
            select
            fullWidth
            name="city"
            label="City"
            value={formData.city}
            onChange={handleChange}
            margin="normal"
            disabled={!formData.country}
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

          {/* Buttons */}
          <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate("/employer-dashboard")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={submitting}
            >
              {submitting ? "Updating..." : "Update Company"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default EditCompany;
