import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5555/api/v1",
  }),
  tagTypes: [
    "terminals",
    "issueforms",
    "boothacquisitions",
    "ebl365",
    "users",
    "boothmanagements",
  ],
  endpoints: () => ({}),
});
