import React, { useState } from "react";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "@/features/auth/services/authSlice";
import { useAppDispatch } from "@/hooks/hooks";
import { toast } from "react-toastify";

const HeaderBar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispacth = useAppDispatch();
  const navigate = useNavigate();

  const handleMenu = (event: {
    currentTarget: React.SetStateAction<HTMLElement | null>;
  }) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate("/login");
    dispacth(logout());
    toast.success("Logout Successfully");
  };
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* search  */}
      <Box display="flex" borderRadius="3px">
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* icons */}
      <Box display="flex">
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon onClick={handleMenu} />
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Link to="#" className="menu-bars">
              <MenuItem onClick={handleClose}>Profile</MenuItem>
            </Link>
            <Link to="#" className="menu-bars">
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Link>
            <Link to="#" className="menu-bars">
              <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
            </Link>
          </Menu>
        </IconButton>
      </Box>
    </Box>
  );
};

export default HeaderBar;
