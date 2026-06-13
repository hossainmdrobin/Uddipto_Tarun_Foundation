'use server';
/**
 * @fileOverview This file implements a Genkit flow that generates a natural language summary of a customer's loan status.
 *
 * - customerLoanDashboardOverview - A function that handles the generation of the loan overview.
 * - CustomerLoanDashboardOverviewInput - The input type for the customerLoanDashboardOverview function.
 * - CustomerLoanDashboardOverviewOutput - The return type for the customerLoanDashboardOverview function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CustomerLoanDashboardOverviewInputSchema = z.object({
  customerName: z.string().describe("The name of the customer."),
  principalAmount: z.number().describe("The total principal amount of the loan."),
  totalPaidAmount: z.number().describe("The total amount paid by the customer so far."),
  remainingBalance: z.number().describe("The remaining balance on the loan."),
  nextDueDate: z.string().describe("The date of the next payment due."),
  nextDueAmount: z.number().describe("The amount due for the next payment."),
  loanStatus: z.string().describe("The current status of the loan (e.g., 'active', 'completed', 'overdue')."),
});
export type CustomerLoanDashboardOverviewInput = z.infer<typeof CustomerLoanDashboardOverviewInputSchema>;

const CustomerLoanDashboardOverviewOutputSchema = z.string().describe("A concise natural language overview of the customer's current loan status.");
export type CustomerLoanDashboardOverviewOutput = z.infer<typeof CustomerLoanDashboardOverviewOutputSchema>;

export async function customerLoanDashboardOverview(input: CustomerLoanDashboardOverviewInput): Promise<CustomerLoanDashboardOverviewOutput> {
  return customerLoanDashboardOverviewFlow(input);
}

const customerLoanDashboardOverviewPrompt = ai.definePrompt({
  name: 'customerLoanDashboardOverviewPrompt',
  input: {schema: CustomerLoanDashboardOverviewInputSchema},
  output: {schema: CustomerLoanDashboardOverviewOutputSchema},
  prompt: `Generate a concise, natural language overview of the customer's loan status based on the provided details.
Focus on key information such as the next payment, remaining balance, and overall progress.

Customer Name: {{{customerName}}}
Principal Loan Amount: $${{principalAmount}}
Total Amount Paid: $${{totalPaidAmount}}
Remaining Balance: $${{remainingBalance}}
Next Payment Due Date: {{{nextDueDate}}}
Next Payment Amount: $${{nextDueAmount}}
Loan Status: {{{loanStatus}}}

Example Output (if loan is active): "Hello {{customerName}}, your loan is currently active. Your next payment of $XX.XX is due on YYYY-MM-DD. You have a remaining balance of $XX.XX, and you have paid X% of your total loan amount."
Example Output (if loan is completed): "Hello {{customerName}}, great news! Your loan has been successfully completed. All payments have been made."
Example Output (if loan is overdue): "Hello {{customerName}}, your loan is currently overdue. Your next payment of $XX.XX was due on YYYY-MM-DD. You have a remaining balance of $XX.XX."

Based on the provided data, generate the overview now.`,
});

const customerLoanDashboardOverviewFlow = ai.defineFlow(
  {
    name: 'customerLoanDashboardOverviewFlow',
    inputSchema: CustomerLoanDashboardOverviewInputSchema,
    outputSchema: CustomerLoanDashboardOverviewOutputSchema,
  },
  async (input) => {
    const {output} = await customerLoanDashboardOverviewPrompt(input);
    return output!;
  }
);
