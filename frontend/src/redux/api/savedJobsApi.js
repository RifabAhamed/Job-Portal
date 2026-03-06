import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_URL = import.meta.env.VITE_BACKEND_API_URL;

export const savedJobsApi = createApi({
  reducerPath: "savedJobsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      // Assuming you store your JWT token in localStorage after login
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["SavedJobs"], // 👈 This is the magic caching tag

  endpoints: (builder) => ({
    // 1. Fetch saved jobs (For MyAccount.jsx)
    getSavedJobs: builder.query({
      query: () => "/user/getSavedJobs",
      providesTags: ["SavedJobs"], // Tells RTK: "This data belongs to the SavedJobs tag"
    }),

    // 2. Toggle save/unsave (For JobCard.jsx)
    toggleSaveJob: builder.mutation({
      query: (jobId) => ({
        url: `/job/toggleSaveJob/${jobId}`,
        method: "POST",
      }),
      invalidatesTags: ["SavedJobs"], // Tells RTK: "The SavedJobs data just changed! Go refetch it automatically!"
    }),
  }),
});

// RTK automatically generates these custom hooks for you!
export const { useGetSavedJobsQuery, useToggleSaveJobMutation } = savedJobsApi;
