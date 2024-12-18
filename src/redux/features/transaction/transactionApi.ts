import { baseApi } from "@/redux/api/baseApi";

const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new transaction
    createTransaction: builder.mutation({
      query: (data) => ({
        url: "/transactions/create-transaction",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["transactions"],
    }),

    // Get all transactions (admin only)
    getAllTransactions: builder.query({
      query: () => ({
        url: "/transactions",
        method: "GET",
      }),
      providesTags: ["transactions"],
    }),

    // Get transaction by ID
    getTransactionById: builder.query({
      query: (id) => ({
        url: `/transactions/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "transactions", id }],
    }),

    // Get transactions by user email (current user)
    getUserTransactions: builder.query({
      query: () => ({
        url: "/transactions/user/my-transactions",
        method: "GET",
      }),
      providesTags: ["transactions"],
    }),

    // Get transactions by service ID
    getServiceTransactions: builder.query({
      query: (serviceId) => ({
        url: `/transactions/service/${serviceId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, serviceId) => [
        { type: "transactions", serviceId },
      ],
    }),

    // Get service-wise transaction calculations
    getServiceWiseTransactions: builder.query({
      query: () => ({
        url: "/transactions/calculate/service-wise",
        method: "GET",
      }),
      providesTags: ["transactions"],
    }),

    // Get date-wise transaction calculations
    getDateWiseTransactions: builder.query({
      query: ({ startDate, endDate, interval = 'day' }) => ({
        url: `/transactions/calculate/date-wise?startDate=${startDate}&endDate=${endDate}&interval=${interval}`,
        method: "GET",
      }),
      providesTags: ["transactions"],
    }),

    // Get status-wise transaction calculations
    getStatusWiseTransactions: builder.query({
      query: () => ({
        url: "/transactions/calculate/status-wise",
        method: "GET",
      }),
      providesTags: ["transactions"],
    }),

    // Update transaction status
    updateTransactionStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/transactions/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["transactions"],
    }),

    // Get transactions by customer ID
    // getCustomerTransactions: builder.query({
    //   query: (customerId) => ({
    //     url: `/transactions/customer/${customerId}`,
    //     method: "GET",
    //   }),
    //   providesTags: (_result, _error, customerId) => [
    //     { type: "transactions", customerId },
    //   ],
    // }),
  }),
});

export const {
  useCreateTransactionMutation,
  useGetAllTransactionsQuery,
  useGetTransactionByIdQuery,
  useGetUserTransactionsQuery,
  useGetServiceTransactionsQuery,
  useGetServiceWiseTransactionsQuery,
  useGetDateWiseTransactionsQuery,
  useGetStatusWiseTransactionsQuery,
  useUpdateTransactionStatusMutation,
} = transactionApi;
