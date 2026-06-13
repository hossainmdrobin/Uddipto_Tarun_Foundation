'use server';
/**
 * @fileOverview A Genkit flow that generates a natural language summary of a loan's repayment schedule and financial implications.
 *
 * - employeeLoanSummaryGenerator - A function that handles the loan summary generation process.
 * - EmployeeLoanSummaryGeneratorInput - The input type for the employeeLoanSummaryGenerator function.
 * - EmployeeLoanSummaryGeneratorOutput - The return type for the employeeLoanSummaryGenerator function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const EmployeeLoanSummaryGeneratorInputSchema = z.object({
  principalAmount: z.number().describe('The principal amount of the loan.'),
  interestRate: z
    .number()
    .describe('The annual interest rate of the loan in percentage.'),
  termMonths: z.number().describe('The loan term in months.'),
  startDate: z
    .string()
    .describe('The start date of the loan in YYYY-MM-DD format.'),
  repaymentSchedule: z
    .array(
      z.object({
        dueDate: z.string().describe('The due date of the installment.'),
        amount: z.number().describe('The amount of the installment.'),
        status: z
          .string()
          .describe(
            'The status of the installment (e.g., paid, unpaid, overdue).'
          ),
      })
    )
    .describe('The full repayment schedule of the loan.'),
});
export type EmployeeLoanSummaryGeneratorInput = z.infer<
  typeof EmployeeLoanSummaryGeneratorInputSchema
>;

const EmployeeLoanSummaryGeneratorOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A natural language summary of the loan terms and repayment schedule.'
    ),
  totalInterestPaid: z
    .number()
    .describe('The total interest paid over the life of the loan.'),
  monthlyPayment: z
    .number()
    .describe('The consistent monthly payment amount.'),
  firstDueDate: z.string().describe('The date of the first installment.'),
  lastDueDate: z.string().describe('The date of the last installment.'),
});
export type EmployeeLoanSummaryGeneratorOutput = z.infer<
  typeof EmployeeLoanSummaryGeneratorOutputSchema
>;

export async function employeeLoanSummaryGenerator(
  input: EmployeeLoanSummaryGeneratorInput
): Promise<EmployeeLoanSummaryGeneratorOutput> {
  return employeeLoanSummaryGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'employeeLoanSummaryGeneratorPrompt',
  input: { schema: EmployeeLoanSummaryGeneratorInputSchema },
  output: { schema: EmployeeLoanSummaryGeneratorOutputSchema },
  prompt: `You are an expert in accounting and financial analysis, specializing in loan repayment schedules. Your task is to provide a clear, concise natural language summary of a loan's terms, its repayment schedule, and key financial implications for a customer.

Given the following loan details:
Principal Amount: {{{principalAmount}}}
Annual Interest Rate: {{{interestRate}}}%
Loan Term (Months): {{{termMonths}}}
Loan Start Date: {{{startDate}}}

Repayment Schedule:
{{#each repaymentSchedule}}
- Due Date: {{{dueDate}}}, Amount: {{{amount}}}, Status: {{{status}}}
{{/each}}

Please calculate and extract the following:
1.  **Total Monthly Payment**: The consistent amount the customer pays each month for their installment. Assume all installments have the same 'amount' for this calculation.
2.  **Total Interest Paid**: The total interest paid over the life of the loan. This is the sum of all installment amounts minus the principal amount.
3.  **First Due Date**: The date of the very first installment from the repayment schedule.
4.  **Last Due Date**: The date of the very last installment from the repayment schedule.

Based on these calculations and the loan details, generate a natural language summary that an employee can use to explain the loan terms to a customer. Highlight the monthly payment, total interest, and the start and end dates of the repayment.

The output should strictly adhere to the following JSON schema:
\`\`\`json
{{jsonSchema output}}
\`\`\`
`,
});

const employeeLoanSummaryGeneratorFlow = ai.defineFlow(
  {
    name: 'employeeLoanSummaryGeneratorFlow',
    inputSchema: EmployeeLoanSummaryGeneratorInputSchema,
    outputSchema: EmployeeLoanSummaryGeneratorOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
