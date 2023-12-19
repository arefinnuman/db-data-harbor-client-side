import { apiSlice } from "../apiSlice";

const issueFormApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createIssueForm: builder.mutation({
      query: (issueFormData) => ({
        url: "/issue-form",
        method: "POST",
        body: issueFormData,
      }),
      invalidatesTags: ["issueforms"],
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
      invalidatesTags: ["issueforms"],
    }),

    deleteIssueForm: builder.mutation({
      query: (id) => ({
        url: `/issue-form/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["issueforms"],
    }),

    updateIssueToResolve: builder.mutation({
      query: (id) => ({
        url: `/issue-form/resolve/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["issueforms"],
    }),

    updateIssueToPending: builder.mutation({
      query: (id) => ({
        url: `/issue-form/pending/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["issueforms"],
    }),

    updateToInProgress: builder.mutation({
      query: (id) => ({
        url: `/issue-form/in-progress/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["issueforms"],
    }),

    getPendingIssues: builder.query({
      query: () => "/issue-form/pending",
    }),

    getResolvedIssues: builder.query({
      query: () => "/issue-form/resolved",
    }),

    getPendingIssuesByEbl365: builder.query({
      query: (ebl365Id) => `/issue-form/pending/${ebl365Id}`,
    }),

    getResolvedIssuesByEbl365: builder.query({
      query: (ebl365Id) => `/issue-form/resolved/${ebl365Id}`,
    }),

    getIssuesByEbl365: builder.query({
      query: (ebl365Id) => `/issue-form/ebl-365/${ebl365Id}`,
    }),
  }),
});

export const {
  useCreateIssueFormMutation,
  useGetAllIssueFormQuery,
  useGetSingleIssueFormQuery,
  useUpdateIssueFormMutation,
  useDeleteIssueFormMutation,
  useUpdateIssueToResolveMutation,
  useUpdateIssueToPendingMutation,
  useGetPendingIssuesQuery,
  useGetResolvedIssuesQuery,
  useGetPendingIssuesByEbl365Query,
  useGetResolvedIssuesByEbl365Query,
  useGetIssuesByEbl365Query,
  useUpdateToInProgressMutation,
} = issueFormApi;
