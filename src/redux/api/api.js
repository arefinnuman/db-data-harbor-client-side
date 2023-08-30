import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dbdataharbor-server.vercel.app/api/v1",
  }),
  endpoints: (builder) => ({}),
});

