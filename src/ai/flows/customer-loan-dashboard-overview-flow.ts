'use server';
/**
 * @fileOverview This file implements a Genkit flow that generates a natural language summary of a member's loan status.
 *
 * - memberLoanDashboardOverview - A function that handles the generation of the loan overview.
 * - MemberLoanDashboardOverviewInput - The input type for the memberLoanDashboardOverview function.
 * - MemberLoanDashboardOverviewOutput - The return type for the memberLoanDashboardOverview function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MemberLoanDashboardOverviewInputSchema = z.object({
  memberName: z.string().describe("The name of the member."),
  principalAmount: z.number().describe("The total principal amount of the loan."),
  totalPaidAmount: z.number().describe("The total amount paid by the member so far.");
  remainingBalance: z.number().describe("The remaining balance on the loan."),
  nextDueDate: z.string().describe("The date of the next payment due."),
  nextDueAmount: z.number().describe("The amount due for the next payment."),
  loanStatus: z.string().describe("The current status of the loan (e.g., 'active', 'completed', 'overdue')."),
});
export type MemberLoanDashboardOverviewInput = z.infer<typeof MemberLoanDashboardOverviewInputSchema>;

const MemberLoanDashboardOverviewOutputSchema = z.string().describe("A concise natural language overview of the member's current loan status.");
export type MemberLoanDashboardOverviewOutput = z.infer<typeof MemberLoanDashboardOverviewOutputSchema>;

export async function memberLoanDashboardOverview(input: MemberLoanDashboardOverviewInput): Promise<MemberLoanDashboardOverviewOutput> {
  return memberLoanDashboardOverviewFlow(input);
}

const memberLoanDashboardOverviewPrompt = ai.definePrompt({
  name: 'memberLoanDashboardOverviewPrompt',
  input: {schema: MemberLoanDashboardOverviewInputSchema},
  output: {schema: MemberLoanDashboardOverviewOutputSchema},
  prompt: `Generate a concise, natural language overview of the member's loan status based on the provided details.
Focus on key information such as the next payment, remaining balance, and overall progress.

Member Name: {{{memberName}}}
Principal Loan Amount: $${{principalAmount}}
Total Amount Paid: $${{totalPaidAmount}}
Remaining Balance: $${{remainingBalance}}
Next Payment Due Date: {{{nextDueDate}}}
Next Payment Amount: $${{nextDueAmount}}
Loan Status: {{{loanStatus}}}

Example Output (if loan is active): "Hello {{memberName}}, your loan is currently active. Your next payment of $XX.XX is due on YYYY-MM-DD. You have a remaining balance of $XX.XX, and you have paid X% of your total loan amount."
Example Output (if loan is completed): "Hello {{memberName}}, great news! Your loan has been successfully completed. All payments have been made."
Example Output (if loan is overdue): "Hello {{memberName}}, your loan is currently overdue. Your next payment of $XX.XX was due on YYYY-MM-DD. You have a remaining balance of $XX.XX."

Based on the provided data, generate the overview now.`,
});

const memberLoanDashboardOverviewFlow = ai.defineFlow(
  {
    name: 'memberLoanDashboardOverviewFlow',
    inputSchema: MemberLoanDashboardOverviewInputSchema,
    outputSchema: MemberLoanDashboardOverviewOutputSchema,
  },
  async (input) => {
    const {output} = await memberLoanDashboardOverviewPrompt(input);
    return output!;
  }
);
