"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Calculator, Send, Sparkles, Calendar as CalendarIcon } from 'lucide-react';
import { employeeLoanSummaryGenerator } from '@/ai/flows/employee-loan-summary-generator-flow';

export default function NewLoanPage() {
  const [formData, setFormData] = useState({
    customerId: '',
    principal: 1000,
    interest: 5,
    term: 12,
    startDate: new Date().toISOString().split('T')[0]
  });
  const [aiSummary, setAiSummary] = useState<any>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulate = async () => {
    setIsSimulating(true);
    try {
      // Mock repayment schedule for AI processing
      const mockSchedule = Array.from({ length: formData.term }).map((_, i) => ({
        dueDate: new Date(new Date(formData.startDate).setMonth(new Date(formData.startDate).getMonth() + i + 1)).toISOString(),
        amount: (formData.principal * (1 + (formData.interest / 100))) / formData.term,
        status: 'unpaid'
      }));

      const result = await employeeLoanSummaryGenerator({
        principalAmount: formData.principal,
        interestRate: formData.interest,
        termMonths: formData.term,
        startDate: formData.startDate,
        repaymentSchedule: mockSchedule
      });
      setAiSummary(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-primary">Originate New Loan</h1>
        <p className="text-muted-foreground mt-1 text-lg">Configure loan terms and verify repayment schedules.</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <Card className="shadow-sm border-none bg-white">
            <CardHeader>
              <CardTitle>Loan Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Select Customer</Label>
                <Select onValueChange={(v) => setFormData({ ...formData, customerId: v })}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Search existing customer..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Sarah Jenkins (sj@example.com)</SelectItem>
                    <SelectItem value="2">Mark Thompson (mt@example.com)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Principal Amount ($)</Label>
                  <Input 
                    type="number" 
                    className="h-11"
                    value={formData.principal}
                    onChange={(e) => setFormData({ ...formData, principal: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Interest Rate (%)</Label>
                  <Input 
                    type="number" 
                    className="h-11"
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Term (Months)</Label>
                  <Input 
                    type="number" 
                    className="h-11"
                    value={formData.term}
                    onChange={(e) => setFormData({ ...formData, term: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input 
                    type="date" 
                    className="h-11"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full h-11 border-accent text-accent hover:bg-accent hover:text-white"
                onClick={handleSimulate}
                disabled={isSimulating}
              >
                {isSimulating ? "Running Simulation..." : "Simulate Repayment Terms"}
                <Calculator className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
            <Separator />
            <CardFooter className="p-6">
              <Button className="w-full h-12 text-lg font-bold" disabled={!aiSummary}>
                Finalize & Disburse Loan
                <Send className="ml-2 h-5 w-5" />
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="shadow-xl border-none bg-primary text-primary-foreground sticky top-24">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-accent" />
                  AI Analysis
                </CardTitle>
                {aiSummary && <div className="text-[10px] uppercase font-bold tracking-widest bg-accent/20 px-2 py-1 rounded">Verified</div>}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {aiSummary ? (
                <>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-xs text-primary-foreground/60 mb-1">Monthly Payment</p>
                      <p className="text-3xl font-headline font-bold text-accent">${aiSummary.monthlyPayment.toFixed(2)}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-[10px] text-primary-foreground/60 uppercase">Total Interest</p>
                        <p className="text-lg font-bold">${aiSummary.totalInterestPaid.toFixed(2)}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-[10px] text-primary-foreground/60 uppercase">Final Payment</p>
                        <p className="text-lg font-bold">{new Date(aiSummary.lastDueDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                  <Separator className="bg-white/10" />
                  <div>
                    <p className="text-sm italic text-primary-foreground/80 leading-relaxed">
                      &quot;{aiSummary.summary}&quot;
                    </p>
                  </div>
                </>
              ) : (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                    <Calculator className="h-8 w-8 text-primary-foreground/30" />
                  </div>
                  <p className="text-sm text-primary-foreground/60 px-4">
                    Configure the loan terms and click simulate to see the AI-powered financial summary.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
