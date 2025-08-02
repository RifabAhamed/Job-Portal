import React from "react";
import { AppBar, Box, Link, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: "transparent",
        backdropFilter: "blur(4px)", // Optional: for a blurred glass effect
        boxShadow: "none",
        color: "#000", // Adjust based on background
      }}
    >
      <Toolbar >
        <Typography variant="h6" component="div" sx={{ width: "20%", textAlign: "center" }}>
          My Website
        </Typography>
        <Box sx={{ display: "flex", gap: 3,  justifyContent: "space-between", width: "60%", px: 20 }}>
          <Link href="#" underline="none" color="inherit">
            Home
          </Link>
          <Link href="#" underline="none" color="inherit">
            About
          </Link>
          <Link href="#" underline="none" color="inherit">
            Services
          </Link>
          <Link href="#" underline="none" color="inherit">
            Contact
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
