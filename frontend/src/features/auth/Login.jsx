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
import AuthService from "./AuthService";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

//  const handleLogin = async () => {
//    if (!formData.email || !formData.password) {
//      setError("Please fill in both email and password.");
//      return;
//    }

//    try {
//      const response = await AuthService.login(
//        formData.email,
//        formData.password
//      );

//      console.log("Login response:", response);

//      // Save token correctly
//      localStorage.setItem("token", response.data.token);

//      navigate("/");
//    } catch (err) {
//      setError(err);
//    }
//  };

const handleLogin = async () => {
  if (!formData.email || !formData.password) {
    setError("Please fill in both email and password.");
    return;
  }

  try {
    // <-- FIX 3: Use the context's login function
    await login(formData.email, formData.password);

    // The context now handles setting the token and user state.
    // We just need to navigate.
    navigate("/");
  } catch (err) {
    // The error message (string) is thrown from the service/context
    setError(err.toString());
  }
};

  const handleClose = () => {
    navigate("/");
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
          position: "relative",
        }}
      >
        <CloseIcon
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            padding: 0,
            margin: 0,
          }}
        />
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
