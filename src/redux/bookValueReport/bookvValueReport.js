const { apiSlice } = require("../apiSlice");

const bookValueReport = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBookValueReport: builder.mutation({
      query: (bookValueReportData) => ({
        url: "/book-value-report",
        method: "POST",
        body: bookValueReportData,
      }),
      invalidatesTags: ["bookValueReports"],
    }),

    createAllBookValueReport: builder.mutation({
      query: (bookValueReportData) => ({
        url: "/book-value-report/all",
        method: "POST",
        body: bookValueReportData,
      }),
      invalidatesTags: ["bookValueReports"],
    }),

    createSelectedBookValueReport: builder.mutation({
      query: (bookValueReportData) => ({
        url: "/book-value-report/selected",
        method: "POST",
        body: bookValueReportData,
      }),
      invalidatesTags: ["bookValueReports"],
    }),
  }),
});

export const {
  useCreateBookValueReportMutation,
  useCreateAllBookValueReportMutation,
  useCreateSelectedBookValueReportMutation,
} = bookValueReport;
