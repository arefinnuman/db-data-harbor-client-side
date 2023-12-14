import { apiSlice } from "../apiSlice";

const boothManagementApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBoothManagement: builder.mutation({
      query: (boothManagementData) => ({
        url: "/booth-management",
        method: "POST",
        body: boothManagementData,
      }),
      invalidatesTags: ["boothmanagements"],
    }),

    getAllBoothManagement: builder.query({
      query: () => "/booth-management",
    }),

    getUnassignedBooth: builder.query({
      query: () => "/booth-management/unassigned",
    }),

    getSingleBoothManagement: builder.query({
      query: (id) => `/booth-management/${id}`,
    }),

    getBoothManagementByEbl365Id: builder.query({
      query: (ebl365Id) => `/booth-management/ebl-365/${ebl365Id}`,
    }),

    updateBoothManagement: builder.mutation({
      query: (boothManagementData) => ({
        url: `/booth-management/${boothManagementData.id}`,
        method: "PATCH",
        body: boothManagementData,
      }),
      invalidatesTags: ["boothmanagements"],
    }),

    deleteBoothManagement: builder.mutation({
      query: (id) => ({
        url: `/booth-management/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["boothmanagements"],
    }),
  }),
});

export const {
  useCreateBoothManagementMutation,
  useGetAllBoothManagementQuery,
  useGetUnassignedBoothQuery,
  useGetSingleBoothManagementQuery,
  useGetBoothManagementByEbl365IdQuery,
  useUpdateBoothManagementMutation,
  useDeleteBoothManagementMutation,
} = boothManagementApi;
