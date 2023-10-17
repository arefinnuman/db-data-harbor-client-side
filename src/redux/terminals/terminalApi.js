import { apiSlice } from "../apiSlice";

const terminalApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTerminal: builder.mutation({
      query: (terminalData) => ({
        url: "/terminals",
        method: "POST",
        body: terminalData,
      }),
      invalidatesTags: ["terminals"],
    }),

    getAllTerminals: builder.query({
      query: () => "/terminals",
    }),

    getSingleTerminal: builder.query({
      query: (id) => `/terminals/${id}`,
    }),

    updateTerminal: builder.mutation({
      query: (terminalData) => ({
        url: `/terminals/${terminalData.id}`,
        method: "PATCH",
        body: terminalData,
      }),
      invalidatesTags: ["terminals"],
    }),

    deleteTerminal: builder.mutation({
      query: (id) => ({
        url: `/terminals/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["terminals"],
    }),
  }),
});

export const {
  useCreateTerminalMutation,
  useGetAllTerminalsQuery,
  useGetSingleTerminalQuery,
  useUpdateTerminalMutation,
  useDeleteTerminalMutation,
} = terminalApi;
