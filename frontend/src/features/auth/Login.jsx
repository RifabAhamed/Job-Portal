import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleLogin = () => {
    if (!formData.email || !formData.password) {
      setError("Please fill in both email and password.");
      return;
    }

    console.log("Login data:", formData);
    // TODO: call backend API for login

    // Navigate to home or dashboard after successful login
    navigate("/dashboard");
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
      <Paper sx={{ width: "100%", maxWidth: 400, p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
          Login
        </Typography>

        {error && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

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
          name="password"
          type="password"
          label="Password"
          value={formData.password}
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
          onClick={handleLogin}
        >
          Login
        </Button>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Don’t have an account?{" "}
          <Button variant="text" onClick={() => navigate("/signup")}>
            Sign Up
          </Button>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
