import authReducer from "../../features/auth/services/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import { appConfig } from "@/config/appConfig";
import { authApi } from "@/features/auth/services/authApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "@/features/users/services/userApi";
import { roleApi } from "@/features/roles/roleApi";
import { employeeApi } from "@/features/employees/services/employeeApi";
import { departmentApi } from "@/features/department/services/departmentApi";
import { environments } from "@/config/constants";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [roleApi.reducerPath]: roleApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      userApi.middleware,
      roleApi.middleware,
      employeeApi.middleware,
      departmentApi.middleware,
    ]),

  devTools: appConfig.environments == environments.Development ? true : false,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;
setupListeners(store.dispatch);

export default store;
