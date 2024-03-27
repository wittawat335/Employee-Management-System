import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { appConfig } from "@/config/appConfig";
import { IRegister } from "@/types/Register";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: appConfig.baseUrl,
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (request: { email: string; password: string }) => {
        return {
          url: "/Authenticate/login",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: request,
        };
      },
    }),
    
    register: builder.mutation({
      query: (request: IRegister) => {
        return {
          url: "/Authenticate/register",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: request,
        };
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
