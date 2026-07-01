"use client";

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Landmark, ArrowRight, ShieldCheck, PieChart, Users } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="px-6 h-20 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-headline font-bold text-xl">L</div>
          <span className="font-headline font-bold text-2xl tracking-tighter text-primary">LedgeTrack</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.push('/login')}>Sign In</Button>
          <Button onClick={() => router.push('/register')}>Get Started</Button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <div className="max-w-3xl space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent font-semibold text-sm border border-accent/20">
            <ShieldCheck className="h-4 w-4" />
            Next-Gen Loan Management
          </div>
          <h1 className="text-6xl font-headline font-bold tracking-tight text-primary leading-[1.1]">
            Empower Your Financial Operations with <span className="text-accent underline decoration-accent/30">Precision</span>.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The enterprise-grade platform for loan origination, repayment tracking, and advanced reporting. Built for trust and efficiency.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="h-14 px-10 text-lg font-semibold shadow-lg shadow-primary/20" onClick={() => router.push('/register')}>
              Become a Member <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-semibold bg-white" onClick={() => router.push('/login')}>
              Live Demo
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 max-w-6xl w-full">
          {[
            { icon: Users, title: 'Member Portal', desc: 'Secure self-service portal for loan tracking and payments.' },
            { icon: Landmark, title: 'Automated Billing', desc: 'Schedules and repayment logic handled automatically.' },
            { icon: PieChart, title: 'AI Insights', desc: 'Advanced analytics powered by GenAI for risk assessment.' }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow text-left">
              <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center mb-6">
                <feature.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="py-10 border-t bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} LedgeTrack Systems Inc. All rights reserved. Professional Financial Software.
        </div>
      </footer>
    </div>
  );
}
