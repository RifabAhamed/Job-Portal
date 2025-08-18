import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthService from "./AuthService";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); // clear error on input
  };

  const handleSubmit = async () => {
    // Validate fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.role
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };

      const response = await AuthService.signup(userData);

      console.log("Signup successful:", response);

      // Redirect after signup
      navigate("/login");
    } catch (err) {
      setError(err); // error comes from AuthService
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f6f8",
        p: 2,
      }}
    >
      <Paper
        sx={{
          width: "100%",
          maxWidth: 400,
          p: { xs: 1, sm: 4 },
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
          Sign Up
        </Typography>

        {error && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          size="small"
          fullWidth
          name="name"
          label="Name"
          // type=""
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          size="small"
          fullWidth
          name="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          size="small"
          fullWidth
          name="role"
          select
          label="Select Role"
          value={formData.role}
          onChange={handleChange}
          margin="normal"
          required
        >
          <MenuItem value="">
            <em>Select Role</em>
          </MenuItem>
          <MenuItem value="employer">Employer</MenuItem>
          <MenuItem value="jobseeker">Job Seeker</MenuItem>
        </TextField>

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

        <Button
          size="small"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2, borderRadius: 2 }}
          onClick={handleSubmit}
        >
          Register
        </Button>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Button variant="text" onClick={() => navigate("/login")}>
            Login
          </Button>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Signup;
