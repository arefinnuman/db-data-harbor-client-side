import { apiSlice } from "../api";

const terminalApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTerminals: builder.query({
      query: () => "/terminals",
    }),

    getSingleTerminal: builder.query({
      query: (id) => `/terminals/${id}`,
    }),
  }),
});

export const { useGetAllTerminalsQuery, useGetSingleTerminalQuery } =
  terminalApi;

