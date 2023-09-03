import { apiSlice } from "../api";

const ebl365Api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllEbl365: builder.query({
      query: () => "/ebl-365",
    }),

    getSingleEbl365: builder.query({
      query: (id) => `/ebl-365/${id}`,
    }),
  }),
});

export const { useGetAllEbl365Query, useGetSingleEbl365Query } = ebl365Api;

