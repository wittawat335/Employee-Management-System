import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { appConfig } from "@/config/appConfig";
import { RootState } from "@/lib/store/store";
import { IDepartment, IDepartmentList } from "@/types/Department";

export const departmentApi = createApi({
  reducerPath: "departmentApi",
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
  tagTypes: ["departments"],
  endpoints: (builder) => ({
    getDepartments: builder.query<IDepartmentList[], void>({
      query: () => "/Department",
      providesTags: ["departments"],
    }),

    addDepartment: builder.mutation<void, Omit<IDepartment, "id">>({
      query: (request) => ({
        url: "/Department",
        method: "POST",
        body: request,
      }),
      invalidatesTags: ["departments"],
    }),

    updateDepartment: builder.mutation<void, Omit<IDepartment, "id">>({
      query: (request) => ({
        url: "/Department",
        method: "PUT",
        body: request,
      }),
      invalidatesTags: ["departments"],
    }),

    deleteDepartment: builder.mutation<void, string>({
      query: (id) => ({
        url: `/Department/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["departments"],
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useAddDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentApi;
