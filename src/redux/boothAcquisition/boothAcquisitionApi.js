import { apiSlice } from "../apiSlice";

const boothAcquisitionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBoothAcquisition: builder.mutation({
      query: (boothAcquisitionData) => ({
        url: "/booth-acquisition",
        method: "POST",
        body: boothAcquisitionData,
      }),
      invalidatesTags: ["boothacquisitions"],
    }),

    getAllBoothAcquisition: builder.query({
      query: () => "/booth-acquisition",
    }),

    getUnassignedBooth: builder.query({
      query: () => "/booth-acquisition/unassigned",
    }),

    getSingleBoothAcquisition: builder.query({
      query: (id) => `/booth-acquisition/${id}`,
    }),

    updateBoothAcquisition: builder.mutation({
      query: (boothAcquisitionData) => ({
        url: `/booth-acquisition/${boothAcquisitionData.id}`,
        method: "PATCH",
        body: boothAcquisitionData,
      }),
      invalidatesTags: ["boothacquisitions"],
    }),

    deleteBoothAcquisition: builder.mutation({
      query: (id) => ({
        url: `/booth-acquisition/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["boothacquisitions"],
    }),
  }),
});

export const {
  useCreateBoothAcquisitionMutation,
  useGetAllBoothAcquisitionQuery,
  useGetUnassignedBoothQuery,
  useGetSingleBoothAcquisitionQuery,
  useUpdateBoothAcquisitionMutation,
  useDeleteBoothAcquisitionMutation,
} = boothAcquisitionApi;
