import { apiSlice } from "../apiSlice";

const issueFormApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createIssueForm: builder.mutation({
      query: (issueFormData) => ({
        url: "/issue-form",
        method: "POST",
        body: issueFormData,
      }),
      invalidatesTags: ["issueForm"],
    }),

    getAllIssueForm: builder.query({
      query: () => "/issue-form",
    }),

    getSingleIssueForm: builder.query({
      query: (id) => `/issue-form/${id}`,
    }),

    updateIssueForm: builder.mutation({
      query: ({ issueFormData }) => ({
        url: `/issue-form/${issueFormData.id}`,
        method: "PATCH",
        body: issueFormData,
      }),
      invalidatesTags: ["issueForm"],
    }),

    deleteIssueForm: builder.mutation({
      query: (id) => ({
        url: `/issue-form/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["issueForm"],
    }),

    updateIssueToResolve: builder.mutation({
      query: (id) => ({
        url: `/issue-form/resolved/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["issueForm"],
    }),

    updateIssueToPending: builder.mutation({
      query: (id) => ({
        url: `/issue-form/pending/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["issueForm"],
    }),

    getPendingIssues: builder.query({
      query: () => "/issue-form/pending",
    }),

    getResolvedIssues: builder.query({
      query: () => "/issue-form/resolved",
    }),

    getPendingIssuesByEbl3656: builder.query({
      query: (id) => `/issue-form/pending/${id}`,
    }),

    getResolvedIssuesByEbl365: builder.query({
      query: () => `/issue-form/resolved/${id}`,
    }),
  }),
});

export const {
  useCreateIssueFormMutation,
  useGetAllIssueFormQuery,
  useGetSingleIssueFormQuery,
  useUpdateIssueFormMutation,
  useDeleteIssueFormMutation,
} = issueFormApi;
