import { apiSlice } from "../apiSlice";

const boothManagementApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBoothManagement: builder.mutation({
      query: (boothManagementData) => ({
        url: "/booth-management",
        method: "POST",
        body: boothManagementData,
      }),
      invalidatesTags: ["boothManagement"],
    }),

    getAllBoothManagement: builder.query({
      query: () => "/booth-management",
    }),

    getSingleBoothManagement: builder.query({
      query: (id) => `/booth-management/${id}`,
    }),

    updateBoothManagement: builder.mutation({
      query: ({ boothManagementData }) => ({
        url: `/booth-management/${boothManagementData.id}`,
        method: "PATCH",
        body: boothManagementData,
      }),
      invalidatesTags: ["boothManagement"],
    }),

    deleteBoothManagement: builder.mutation({
      query: (id) => ({
        url: `/booth-management/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["boothManagement"],
    }),
  }),
});

export const {
  useCreateBoothManagementMutation,
  useGetAllBoothManagementQuery,
  useGetSingleBoothManagementQuery,
  useUpdateBoothManagementMutation,
  useDeleteBoothManagementMutation,
} = boothManagementApi;
