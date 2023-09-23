import { apiSlice } from "../apiSlice";

const ebl365Api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createEbl365: builder.mutation({
      query: (ebl365Data) => ({
        url: "/ebl-365",
        method: "POST",
        body: ebl365Data,
      }),
      invalidatesTags: ["ebl365"],
    }),

    getAllEbl365: builder.query({
      query: () => "/ebl-365",
    }),

    getSingleEbl365: builder.query({
      query: (id) => `/ebl-365/${id}`,
    }),

    updateEbl365: builder.mutation({
      query: ({ ebl365Data }) => ({
        url: `/ebl-365/${ebl365Data.id}`,
        method: "PATCH",
        body: ebl365Data,
      }),
      invalidatesTags: ["ebl365"],
    }),

    deleteEbl365: builder.mutation({
      query: (id) => ({
        url: `/ebl-365/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ebl365"],
    }),
  }),
});

export const {
  useCreateEbl365Mutation,
  useGetAllEbl365Query,
  useGetSingleEbl365Query,
  useUpdateEbl365Mutation,
  useDeleteEbl365Mutation,
} = ebl365Api;
