import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { appConfig } from "@/config/appConfig";
import { RootState } from "@/lib/store/store";
import { IEmployee, IEmployeeList } from "@/types/Employee";

export const employeeApi = createApi({
  reducerPath: "employeeApi",
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
  tagTypes: ["employees"],
  endpoints: (builder) => ({
    getEmployees: builder.query<IEmployeeList[], void>({
      query: () => "/employee",
      providesTags: ["employees"],
    }),

    addEmployee: builder.mutation<void, Omit<IEmployee, "id">>({
      query: (request) => ({
        url: `/employee`,
        method: "POST",
        body: request,
      }),
      invalidatesTags: ["employees"],
    }),

    updateEmployee: builder.mutation<void, Omit<IEmployee, "id">>({
      query: (request) => ({
        url: `/employee`,
        method: "PUT",
        body: request,
      }),
      invalidatesTags: ["employees"],
    }),

    deleteEmployee: builder.mutation<void, string>({
      query: (id) => ({
        url: `/employee/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["employees"],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi;
