import React from "react";
import { Box, Container, Typography, Button, Grid, Paper } from "@mui/material";
import DiscussingImage from "../assets/images/DiscussingImage.jpg"; // Adjust the path as necessary

const HomePage = () => {
  return (
    <Container maxWidth="" disableGutters sx={{ mt: 0 }}>
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: "center",
          py: 25,
          color: "primary.contrastText",
          backgroundImage: `url(${DiscussingImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(1px) brightness(0.5)", // blur + darken
          zIndex: 0,
        }}
      >
        <Typography variant="h3" gutterBottom>
          Find Your Dream Job
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }}>
          Explore thousands of job opportunities across different industries.
        </Typography>
        <Button variant="contained" size="large" color="secondary">
          Get Started
        </Button>
      </Box>

      {/* Featured Jobs */}
      <Box sx={{ mt: 10 }}>
        <Typography variant="h4" gutterBottom>
          Featured Jobs
        </Typography>
        <Grid container spacing={4}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  height: "100%",
                }}
              >
                <Typography variant="h6">Software Engineer</Typography>
                <Typography variant="body2" color="text.secondary">
                  ABC Tech - Colombo
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  ₹80,000 - ₹120,000/month
                </Typography>
                <Button
                  size="small"
                  variant="outlined"
                  sx={{ mt: 2 }}
                  fullWidth
                >
                  View Details
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Call to Action */}
      <Box
        sx={{
          mt: 10,
          textAlign: "center",
          py: 6,
          backgroundColor: "secondary.main",
          color: "secondary.contrastText",
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Ready to take the next step?
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Create an Account
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
