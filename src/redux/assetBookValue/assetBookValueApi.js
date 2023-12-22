import { apiSlice } from "../apiSlice";

const assetBookValueApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAssetBookValue: builder.mutation({
      query: (assetBookValueData) => ({
        url: "/asset-book-value",
        method: "POST",
        body: assetBookValueData,
      }),
      invalidatesTags: ["assetBookValue"],
    }),

    getAllAssetBookValue: builder.query({
      query: () => "/asset-book-value",
    }),

    getSingleAssetBookValue: builder.query({
      query: (id) => `/asset-book-value/${id}`,
    }),

    updateAssetBookValue: builder.mutation({
      query: ({ assetBookValueData }) => ({
        url: `/asset-book-value/${assetBookValueData.id}`,
        method: "PATCH",
        body: assetBookValueData,
      }),
      invalidatesTags: ["assetBookValue"],
    }),

    deleteAssetBookValue: builder.mutation({
      query: (id) => ({
        url: `/asset-book-value/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["assetBookValue"],
    }),

    getAssetBookValueByTerminal: builder.query({
      query: (id) => `/asset-book-value/terminal/${id}`,
    }),

    getUnAssignedTerminalsInAssetBookValue: builder.query({
      query: () => "/asset-book-value/unassigned-terminals",
    }),
  }),
});

export const {
  useCreateAssetBookValueMutation,
  useGetAllAssetBookValueQuery,
  useGetSingleAssetBookValueQuery,
  useUpdateAssetBookValueMutation,
  useDeleteAssetBookValueMutation,
  useGetAssetBookValueByTerminalQuery,
  useGetUnAssignedTerminalsInAssetBookValueQuery,
} = assetBookValueApi;
