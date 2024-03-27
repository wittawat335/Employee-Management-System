import { useState } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  MenuItemStyles,
  menuClasses,
} from "react-pro-sidebar";
import { Box, IconButton, Typography, Switch } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import TableViewIcon from "@mui/icons-material/TableView";
import { FaReact } from "react-icons/fa";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/hooks";
import { selectAuth } from "@/features/auth/services/authSlice";
import ManageAccountsOutlined from "@mui/icons-material/ManageAccountsOutlined";
import AdminPanelSettingsOutlined from "@mui/icons-material/AdminPanelSettingsOutlined";

type SideBarProps = {
  //collapsed: boolean;
};
type Theme = "light" | "dark";

const themes = {
  light: {
    sidebar: {
      backgroundColor: "#fbfcfd",
      color: "#607489",
    },
    menu: {
      menuContent: "#fbfcfd",
      icon: "#0098e5",
      hover: {
        backgroundColor: "#c5e4ff",
        color: "#44596e",
      },
      disabled: {
        color: "#9fb6cf",
      },
    },
  },
  dark: {
    sidebar: {
      backgroundColor: "#0b2948",
      color: "#8ba1b7",
    },
    menu: {
      menuContent: "#082440",
      icon: "#59d0ff",
      hover: {
        backgroundColor: "#00458b",
        color: "#b6c8d9",
      },
      disabled: {
        color: "#3e5e7e",
      },
    },
  },
};

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const SideBar = (props: SideBarProps) => {
  const { user } = useAppSelector(selectAuth);
  const navigate = useNavigate();
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  const menuItemStyles: MenuItemStyles = {
    root: {
      fontSize: "13px",
      fontWeight: 400,
    },
    icon: {
      color: themes[theme].menu.icon,
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
    },
    SubMenuExpandIcon: {
      color: "#b6b7b9",
    },
    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0
          ? hexToRgba(
              themes[theme].menu.menuContent,
              hasImage && !collapsed ? 0.4 : 1
            )
          : "transparent",
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
      "&:hover": {
        backgroundColor: hexToRgba(
          themes[theme].menu.hover.backgroundColor,
          hasImage ? 0.8 : 1
        ),
        color: themes[theme].menu.hover.color,
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
      }}
    >
      <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        onBreakPoint={setBroken}
        breakPoint="sm"
        backgroundColor={hexToRgba(
          themes[theme].sidebar.backgroundColor,
          hasImage ? 0.9 : 1
        )}
        rootStyles={{
          color: themes[theme].sidebar.color,
        }}
        style={{ height: "100%" }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div style={{ flex: 1, marginBottom: "32px" }}>
            <Menu menuItemStyles={menuItemStyles}>
              {/* LOGO */}
              <MenuItem
                onClick={() => setCollapsed(!collapsed)}
                icon={
                  collapsed ? (
                    <FaReact className="logo-icon" size={50} />
                  ) : undefined
                }
                style={{
                  margin: "10px 0 20px 0",
                }}
              >
                {!collapsed && (
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    ml="15px"
                  >
                    <div className="logo">
                      <FaReact className="logo-icon" size={30} />{" "}
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
                      <Typography color={theme === "dark" ? "#fff" : "#000"}>
                        {" "}
                        React App
                      </Typography>
                    </div>
                    <IconButton onClick={() => setCollapsed(!collapsed)}>
                      <MenuOutlinedIcon color="primary" />
                    </IconButton>
                  </Box>
                )}
              </MenuItem>
              {!collapsed && (
                <Box mb="25px">
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <img
                      alt="profile-user"
                      width="100px"
                      height="100px"
                      src={`/assets/user.jpg`}
                      style={{ cursor: "pointer", borderRadius: "50%" }}
                    />
                  </Box>
                  <Box textAlign="center">
                    <Typography sx={{ m: "10px 0 0 0" }}>
                      {user?.fullname}
                    </Typography>
                  </Box>
                </Box>
              )}

              <MenuItem
                key="1"
                icon={<HomeOutlinedIcon />}
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </MenuItem>
              <MenuItem
                onClick={() => navigate("/employee")}
                icon={<TableViewIcon />}
              >
                {" "}
                Employee{" "}
              </MenuItem>
              <MenuItem
                onClick={() => navigate("/department")}
                icon={<TableViewIcon />}
              >
                {" "}
                Department{" "}
              </MenuItem>

              <SubMenu label="Manage" icon={<ManageAccountsOutlined />}>
                <MenuItem
                  onClick={() => navigate("/users")}
                  icon={<PeopleOutlinedIcon />}
                >
                  User
                </MenuItem>
                <MenuItem
                  onClick={() => navigate("/users")}
                  icon={<AdminPanelSettingsOutlined />}
                >
                  Role
                </MenuItem>
              </SubMenu>
            </Menu>

            <div
              style={{
                padding: "0 24px",
                marginBottom: "8px",
                marginTop: "32px",
              }}
            >
              <Typography
                variant="body2"
                fontWeight={600}
                style={{
                  opacity: collapsed ? 0 : 0.5,
                  letterSpacing: "0.5px",
                }}
              >
                Extra
              </Typography>
            </div>

            <Menu menuItemStyles={menuItemStyles}>
              <MenuItem icon={<CalendarTodayOutlinedIcon />}>Calendar</MenuItem>
              <MenuItem icon={<ReceiptOutlinedIcon />}>Documentation</MenuItem>
            </Menu>
          </div>
        </div>
        <div className="toggle-theme-btn">
          {broken && (
            <IconButton onClick={() => setToggled(!toggled)}>
              <MenuOutlinedIcon />
            </IconButton>
          )}
          <Switch
            id="theme"
            checked={theme === "dark"}
            onChange={handleThemeChange}
          />
          {theme === "dark" ? <HiOutlineSun /> : <HiOutlineMoon />}
        </div>
      </Sidebar>
      <main>
        <div style={{ padding: "16px 2px ", color: "#44596e" }}>
          <div style={{ marginBottom: "16px" }}>
            {broken && (
              <IconButton onClick={() => setToggled(!toggled)}>
                <MenuOutlinedIcon />
              </IconButton>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
export default SideBar;
