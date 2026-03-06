import { configureStore } from "@reduxjs/toolkit";
import { savedJobsApi } from "./api/savedJobsApi";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [savedJobsApi.reducerPath]: savedJobsApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, etc.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(savedJobsApi.middleware),
});
