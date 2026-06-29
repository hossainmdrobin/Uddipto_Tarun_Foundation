import baseApi from './baseApi';

export interface Loan {
  _id: string;
  borrowerId: string;
  lenderId: string;
  principal: number;
  interestRate: number;
  loanTerm: number;
  status: 'pending' | 'active' | 'completed' | 'defaulted';
  createdAt: string;
  updatedAt: string;
}

export const loanApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all loans for the current user
    getLoans: builder.query<Loan[], void>({
      query: () => '/loans',
      providesTags: ['Loans'],
    }),

    // Get a specific loan by ID
    getLoanById: builder.query<Loan, string>({
      query: (id) => `/loans/${id}`,
      providesTags: ['Loans'],
    }),

    // Create a new loan
    createLoan: builder.mutation<Loan, Partial<Loan>>({
      query: (loan) => ({
        url: '/loans',
        method: 'POST',
        body: loan,
      }),
      invalidatesTags: ['Loans'],
    }),

    // Update a loan
    updateLoan: builder.mutation<Loan, { id: string; data: Partial<Loan> }>({
      query: ({ id, data }) => ({
        url: `/loans/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Loans'],
    }),

    // Delete a loan
    deleteLoan: builder.mutation<void, string>({
      query: (id) => ({
        url: `/loans/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Loans'],
    }),
  }),
});

export const {
  useGetLoansQuery,
  useGetLoanByIdQuery,
  useCreateLoanMutation,
  useUpdateLoanMutation,
  useDeleteLoanMutation,
} = loanApi;
