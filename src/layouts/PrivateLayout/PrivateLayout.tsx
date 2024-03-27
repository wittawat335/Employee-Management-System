import { HeaderBar, SideBar } from "@/layouts/PrivateLayout";
import { Box, CssBaseline } from "@mui/material";
import { Outlet, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useEffect } from "react";
import { setUser } from "@/features/auth/services/authSlice";
import "../../styles/index.css";

const PrivateLayout = () => {
  const dispatch = useAppDispatch();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    dispatch(setUser(user));
  }, []);

  const login = useAppSelector((state) => state.auth.isAuthenticated);
  return login ? (
    <>
      <CssBaseline />
      <div className="app">
        <SideBar />
        <main className="content">
          <HeaderBar />
          <div className="content_body">
            <Box m="20px">
              <Outlet />
            </Box>
          </div>
        </main>
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateLayout;
