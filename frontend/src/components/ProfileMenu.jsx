import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ThemeSwitchButton } from "./ThemeSwitchBotton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  // Check login status on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateToAccount = () =>{
    handleClose();
    navigate("/my-account");
  }

  const handleLogin = () => {
    handleClose();
    navigate("/login");
  };

  const handleSignup = () => {
    handleClose();
    navigate("/signup");
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // clear token
    setIsLoggedIn(false);
    handleClose();
    navigate("/login"); // redirect to login page
  };
  return (
    <>
      <IconButton
        size="large"
        onClick={handleClick}
        sx={{ color: "inherit", padding: 0 }} // optional styling
      >
        <AccountCircleIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {isLoggedIn
          ? [
              <MenuItem key="account" onClick={navigateToAccount}>
                My account
              </MenuItem>,
              <MenuItem key="theme" onClick={handleClose}>
                Theme <ThemeSwitchButton />
              </MenuItem>,
              <MenuItem key="logout" onClick={handleLogout}>
                Logout
              </MenuItem>,
            ]
          : [
              <MenuItem key="login" onClick={handleLogin}>
                Login
              </MenuItem>,
              <MenuItem key="register" onClick={handleSignup}>
                Register
              </MenuItem>,
              <MenuItem key="theme" onClick={handleClose}>
                Theme <ThemeSwitchButton />
              </MenuItem>,
            ]}
      </Menu>
    </>
  );
}
