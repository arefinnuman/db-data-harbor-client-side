import { apiSlice } from "../apiSlice";

const boothAcquisitionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBoothAcquisition: builder.mutation({
      query: (boothAcquisitionData) => ({
        url: "/booth-acquisition",
        method: "POST",
        body: boothAcquisitionData,
      }),
      invalidatesTags: ["boothAcquisition"],
    }),

    getAllBoothAcquisition: builder.query({
      query: () => "/booth-acquisition",
    }),

    getSingleBoothAcquisition: builder.query({
      query: (id) => `/booth-acquisition/${id}`,
    }),

    updateBoothAcquisition: builder.mutation({
      query: ({ boothAcquisitionData }) => ({
        url: `/booth-acquisition/${boothAcquisitionData.id}`,
        method: "PATCH",
        body: boothAcquisitionData,
      }),
      invalidatesTags: ["boothAcquisition"],
    }),

    deleteBoothAcquisition: builder.mutation({
      query: (id) => ({
        url: `/booth-acquisition/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["boothAcquisition"],
    }),
  }),
});

export const {} = boothAcquisitionApi;
