import { apiSlice } from "../api";

const terminalApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTerminals: builder.query({
      query: () => "/terminals",
    }),
  }),
});

export const { useGetAllTerminalsQuery } = terminalApi;

