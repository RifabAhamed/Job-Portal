import React from "react";
import { AppBar, Box, Button, FormControl, InputLabel, Link, MenuItem, Select, Toolbar, Typography } from "@mui/material";
import {JobIcon} from "../assets/icons/JobIcon"
import { ThemeSwitchButton } from "../components/ThemeSwitchBotton";
import { useTheme, useMediaQuery } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ProfileMenu from "../components/ProfileMenu";

const Header = () => {
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("md"));
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
                  // justifyContent: "center",
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
          <Button
            variant="outlined"
            color="inherit"
            sx={{ textTransform: "none" }}
            size={isSmScreen ? "small" : "medium"}
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="primarygreen"
            sx={{ textTransform: "none" }}
            size={isSmScreen ? "small" : "medium"}
          >
            Register
          </Button>
          <ProfileMenu />
        </Box>
        {/* <ThemeSwitchButton /> */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
