import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { appConfig } from "@/config/appConfig";
import { RootState } from "@/lib/store/store";
import { IRole } from "@/types/Role";

export const roleApi = createApi({
  reducerPath: "roleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: appConfig.baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["roles"],
  endpoints: (builder) => ({
    getRoles: builder.query<IRole[], void>({
      query: () => "/roles",
      providesTags: ["roles"],
    }),
    getRoleNames: builder.query<string[], void>({
      query: () => "/roles/getnames",
    }),
  }),
});

export const { useGetRolesQuery, useGetRoleNamesQuery } = roleApi;
