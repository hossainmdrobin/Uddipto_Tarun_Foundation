'use client';

import { useGetLoansQuery, useGetCurrentUserQuery } from '@/lib/redux';

/**
 * Example Component: DashboardExample
 * Shows how to use RTK Query hooks in the /src/app/app directory
 * 
 * This component demonstrates:
 * - Fetching user profile data
 * - Fetching loans list
 * - Loading and error states
 * 
 * To use this, import it in your customer dashboard or employee dashboard
 */
export function DashboardExample() {
  // Fetch current user profile
  const { data: user, isLoading: userLoading, error: userError } = useGetCurrentUserQuery();

  // Fetch all loans
  const { data: loans, isLoading: loansLoading, error: loansError } = useGetLoansQuery();

  if (userLoading || loansLoading) {
    return <div className="p-4">Loading dashboard data...</div>;
  }

  if (userError || loansError) {
    return (
      <div className="p-4 text-red-600">
        Error loading dashboard data. Please try again.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* User Profile Section */}
      {user && (
        <div className="bg-white rounded-lg border p-4">
          <h2 className="text-lg font-semibold mb-2">Welcome, {user.name}!</h2>
          <p className="text-gray-600">Email: {user.email}</p>
          <p className="text-gray-600 capitalize">Role: {user.role}</p>
        </div>
      )}

      {/* Loans Overview */}
      <div className="bg-white rounded-lg border p-4">
        <h2 className="text-lg font-semibold mb-4">Your Loans ({loans?.length || 0})</h2>
        {loans && loans.length > 0 ? (
          <div className="space-y-3">
            {loans.map((loan) => (
              <div key={loan._id} className="border rounded p-3 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Principal: ${loan.principal}</p>
                    <p className="text-sm text-gray-600">
                      Interest Rate: {loan.interestRate}% | Term: {loan.loanTerm} months
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded text-sm font-medium ${
                    loan.status === 'active' ? 'bg-green-100 text-green-800' :
                    loan.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    loan.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {loan.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No loans found.</p>
        )}
      </div>
    </div>
  );
}
