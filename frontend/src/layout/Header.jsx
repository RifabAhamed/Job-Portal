import { AppBar, Box, Button, Link, Toolbar, Typography } from "@mui/material";
import { JobIcon } from "../assets/icons/JobIcon";
import { useTheme, useMediaQuery } from "@mui/material";
import ProfileMenu from "../components/ProfileMenu";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const { user } = useAuth();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login state on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // true if token exists
  }, []);

  // Check if user is employer
  const isEmployer = user?.role === "employer";

  const handleLogin = () => navigate("/login");
  const handleSignup = () => navigate("/signup");
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
      <Toolbar
        sx={{ paddingX: { xs: 1, sm: 3 }, justifyContent: "space-between" }}
      >
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            width: "20%",
            justifyContent: "start",
            gap: { xs: 1, sm: 3 },
            minWidth: "150px",
          }}
        >
          <JobIcon sx={{ color: "primary" }} />
          <Typography
            variant="h6"
            component="div"
            sx={{ fontSize: { xs: "14px", sm: "20px" } }}
          >
            Job Portal
          </Typography>
          {isSmScreen && (
            <Box
              sx={{
                position: "absolute",
                top: "50px",
                left: "0px",
                display: "flex",
                flexDirection: "row",
                gap: 2,
              }}
            >
              <Link href="/" underline="none" color="inherit">
                Home
              </Link>
              {!isEmployer && (
                <Link href="/jobs" underline="none" color="inherit">
                  Jobs
                </Link>
              )}
              {!isEmployer && (
                <Link href="/companyList" underline="none" color="inherit">
                  Companies
                </Link>
              )}
              <Link href="/about" underline="none" color="inherit">
                About
              </Link>

              <Link href="/contact" underline="none" color="inherit">
                Contact
              </Link>
            </Box>
          )}
        </Box>

        {!isSmScreen && (
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
            {!isEmployer && (
              <Link href="/jobs" underline="none" color="inherit">
                Jobs
              </Link>
            )}
            {!isEmployer && (
              <Link href="/companyList" underline="none" color="inherit">
                Companies
              </Link>
            )}
            <Link href="/about" underline="none" color="inherit">
              About
            </Link>
            <Link href="/contact" underline="none" color="inherit">
              Contact
            </Link>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            gap: { xs: 1, sm: 2 },
            width: "20%",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {!isLoggedIn && (
            <>
              <Button
                variant="outlined"
                color="inherit"
                sx={{ textTransform: "none" }}
                size={isSmScreen ? "small" : "medium"}
                onClick={handleLogin}
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="primarygreen"
                sx={{ textTransform: "none" }}
                size={isSmScreen ? "small" : "medium"}
                onClick={handleSignup}
              >
                Register
              </Button>
            </>
          )}

          <ProfileMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
