import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../intex";

export const notificationApi = createApi({
  reducerPath: "notificationAPi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/api/v1/notification`,
  }),
  tagTypes: ["notification"],
  endpoints: (builder) => ({
    updateSeen: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "PUT",
      }),
    }),
  }),
});

export const { useUpdateSeenMutation } = notificationApi;
