import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5555/api/v1",

    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `${token}`);
      }
      return headers;
    },
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
