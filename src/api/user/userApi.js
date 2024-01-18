import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../intex";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/api/v1/user`,
    prepareHeaders: async (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    },
  }),
  tagTypes: ["user", "job"],
  endpoints: (builder) => ({
    checkAuth: builder.mutation({
      query: () => ({
        url: "/check-auth",
        method: "POST",
      }),
      invalidatesTags: ["user"],
    }),
    updateUser: builder.mutation({
      query: (user) => ({
        url: `/${user.username}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["user"],
    }),
    jobApply: builder.mutation({
      query: (data) => ({
        url: `/apply`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user", "job"],
    }),
    cvApplied: builder.query({
      query: () => ({
        url: `/cv-applied`,
        method: "GET",
      }),
      providesTags: ["user", "job"],
    }),
    getNotifications: builder.query({
      query: () => ({
        url: `/notifications`,
        method: "GET",
      }),
      providesTags: ["user", "notification"],
    }),
    pushNotification: builder.mutation({
      query: (data) => ({
        url: `/notifications`,
        method: "POST",
        body: data,
      }),
    }),
    deleteNotification: builder.mutation({
      query: (data) => ({
        url: `/notifications`,
        method: "DELETE",
        body: data,
      }),
    }),
    getJobsApplied: builder.query({
      query: () => ({
        url: `/job-applied`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCheckAuthMutation,
  useUpdateUserMutation,
  useJobApplyMutation,
  useCvAppliedQuery,
  useGetJobsAppliedQuery,
  useGetNotificationsQuery,
  usePushNotificationMutation,
  useDeleteNotificationMutation,
} = userApi;
