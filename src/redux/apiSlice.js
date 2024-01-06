import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://db-data-harbor-server-side.vercel.app/api/v1",

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
    "assetBookValue",
    "bookValueReports",
  ],

  endpoints: () => ({}),
});
