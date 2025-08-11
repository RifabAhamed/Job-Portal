import React from "react";
import { AppBar, Box, Button, Link, Toolbar, Typography } from "@mui/material";
import {JobIcon} from "../assets/icons/JobIcon"
import { ThemeSwitchButton } from "../components/ThemeSwitchBotton";

const Header = () => {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(4px)",
        boxShadow: "none",
      }}
    >
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "20%",
            justifyContent: "start",
            gap: 3,
          }}
        >
          <JobIcon sx={{ color: "primary" }} />
          <Typography variant="h6" component="div">
            Job Portal
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 3,
            justifyContent: "center",
            width: "60%",
          }}
        >
          <Link href="/" underline="none" color="inherit">
            Home
          </Link>
          <Link href="/jobs" underline="none" color="inherit">
            Jobs
          </Link>
          <Link href="/about" underline="none" color="inherit">
            About
          </Link>

          <Link href="/contact" underline="none" color="inherit">
            Contact
          </Link>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: "20%",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="outlined"
            color="inherit"
            sx={{ textTransform: "none" }}
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="primarygreen"
            sx={{ textTransform: "none" }}
          >
            Register
          </Button>
        </Box>
        <ThemeSwitchButton />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
