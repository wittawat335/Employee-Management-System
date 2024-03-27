import { IUser } from "@/types/User";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { appConfig } from "@/config/appConfig";
import { RootState } from "@/lib/store/store";

export const userApi = createApi({
  reducerPath: "userApi",
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
  tagTypes: ["users"],
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => "/user",
      providesTags: ["users"],
    }),

    addUser: builder.mutation<void, Omit<IUser, "id">>({
      query: (request) => ({
        url: `/user`,
        method: "POST",
        body: request,
      }),
      invalidatesTags: ["users"],
    }),

    updateUser: builder.mutation<void, IUser>({
      query: (request) => ({
        url: `/user`,
        method: "PUT",
        body: request,
      }),
      invalidatesTags: ["users"],
    }),

    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
