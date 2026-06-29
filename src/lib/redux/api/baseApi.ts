import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base configuration for RTK Query
const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    credentials: 'include', // Include cookies in requests
  }),
  tagTypes: ['Loans', 'Users', 'Transactions', 'RepaymentSchedules'],
  endpoints: () => ({}),
});

export default baseApi;
