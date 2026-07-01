
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowUpRight, Clock, ShieldCheck, Sparkles, Receipt } from 'lucide-react';
import { memberLoanDashboardOverview } from '@/ai/flows/customer-loan-dashboard-overview-flow';

export default function MemberDashboard() {
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const loanData = {
    memberName: "John Doe",
    principalAmount: 5000,
    totalPaidAmount: 1250,
    remainingBalance: 3750,
    nextDueDate: "2024-06-15",
    nextDueAmount: 450,
    loanStatus: "active"
  };

  const progress = (loanData.totalPaidAmount / loanData.principalAmount) * 100;

  // useEffect(() => {
  //   async function fetchAiSummary() {
  //     try {
  //       const text = await memberLoanDashboardOverview(loanData);
  //       setSummary(text);
  //     } catch (error) {
  //       console.error("AI Summary Error:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchAiSummary();
  // }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Welcome Back, {loanData.memberName}</h1>
          <p className="text-muted-foreground mt-1">Here is a summary of your active loan status.</p>
        </div>
        <Button className="bg-accent hover:bg-accent/90">
          Make a Payment <ArrowUpRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2 shadow-sm border-none bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Current Loan Progress</CardTitle>
                <CardDescription>Personal Loan #LX-9902</CardDescription>
              </div>
              <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">
                Active
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>Repayment Progress</span>
                <span>{progress.toFixed(0)}% Complete</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-tighter mb-1">Total Loan</p>
                <p className="text-2xl font-bold font-headline">${loanData.principalAmount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-tighter mb-1">Paid to Date</p>
                <p className="text-2xl font-bold font-headline text-accent">${loanData.totalPaidAmount.toLocaleString()}</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-tighter mb-1">Remaining</p>
                <p className="text-2xl font-bold font-headline">${loanData.remainingBalance.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-none bg-primary text-white">
          <CardHeader>
            <CardTitle className="text-lg">Next Payment Due</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-3xl font-bold font-headline">${loanData.nextDueAmount}</p>
                <p className="text-sm text-primary-foreground/70">{new Date(loanData.nextDueDate).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-center gap-3">
              <Clock className="h-4 w-4 text-accent" />
              <span className="text-sm">Due in 12 days</span>
            </div>
            <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
              Schedule Autopay
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg border-none bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <Sparkles className="h-8 w-8 text-accent/20" />
        </div>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-accent" />
            AI Loan Insight
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2 animate-pulse">
              <div className="h-4 bg-slate-100 rounded w-3/4"></div>
              <div className="h-4 bg-slate-100 rounded w-1/2"></div>
            </div>
          ) : (
            <p className="text-lg leading-relaxed text-slate-700 italic">
              &quot;{summary}&quot;
            </p>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm border-none bg-white">
          <CardHeader>
            <CardTitle className="text-lg">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                      <Receipt className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Monthly Installment</p>
                      <p className="text-xs text-muted-foreground">May 15, 2024</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-accent">-$450.00</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-none bg-white">
          <CardHeader>
            <CardTitle className="text-lg">Important Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-100 flex gap-3">
                <ShieldCheck className="h-5 w-5 text-blue-600 shrink-0" />
                <p className="text-xs text-blue-800">Your quarterly financial statement is now available for download.</p>
              </div>
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-100 flex gap-3">
                <Clock className="h-5 w-5 text-amber-600 shrink-0" />
                <p className="text-xs text-amber-800">Friendly reminder: Your next payment is scheduled for June 15th.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
