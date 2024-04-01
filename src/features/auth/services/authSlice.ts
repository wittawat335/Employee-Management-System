import { IAuth } from "@/types/Auth";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../lib/store/store";

type AuthState = {
  user: IAuth | null;
  token: string;
  refreshToken: string;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  user: null,
  token: "",
  refreshToken: "",
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IAuth>) => {
      state.user = action.payload;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    isAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = "";
      state.refreshToken = "";
      state.isAuthenticated = false;
      localStorage.clear();
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;
export const { logout, setUser, isAuthenticated } = authSlice.actions;

export default authSlice.reducer;
