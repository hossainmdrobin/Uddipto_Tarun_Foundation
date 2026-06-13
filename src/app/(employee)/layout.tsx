"use client";

import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { LayoutDashboard, Users, Landmark, CreditCard, PieChart, Settings, LogOut, Search, Bell, User } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/employee/dashboard' },
  { icon: Users, label: 'Customers', href: '/employee/customers' },
  { icon: Landmark, label: 'Loans', href: '/employee/loans' },
  { icon: CreditCard, label: 'Payments', href: '/employee/payments' },
  { icon: PieChart, label: 'Reports', href: '/employee/reports' },
  { icon: Settings, label: 'Settings', href: '/employee/settings' },
];

export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r border-sidebar-border shadow-2xl">
          <SidebarHeader className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white font-headline font-bold">L</div>
              <span className="font-headline font-bold text-xl tracking-tight text-white">LedgeTrack</span>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-4 py-2">
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild tooltip={item.label} className="py-6 hover:bg-sidebar-accent transition-colors">
                    <a href={item.href} className="flex items-center gap-4">
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <SidebarMenuButton className="py-6 text-red-400 hover:bg-red-950/20 hover:text-red-300">
              <LogOut className="h-5 w-5 mr-3" />
              <span className="font-medium">Sign Out</span>
            </SidebarMenuButton>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="bg-background flex flex-col">
          <header className="h-16 border-b bg-white flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm">
            <div className="flex items-center gap-4 flex-1">
              <SidebarTrigger className="md:hidden" />
              <div className="relative max-w-md w-full hidden sm:block">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search customers, loans..." className="pl-10 bg-slate-50 border-none shadow-none focus-visible:ring-1 focus-visible:ring-accent" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-muted-foreground hover:bg-slate-100 rounded-full transition-colors relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-white"></span>
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 hover:bg-slate-50 p-1 pr-3 rounded-full transition-colors border">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://picsum.photos/seed/user1/40/40" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <div className="hidden lg:block text-left">
                      <p className="text-xs font-bold leading-tight">Admin User</p>
                      <p className="text-[10px] text-muted-foreground leading-tight">Administrator</p>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-2"><User className="h-4 w-4" /> Profile</DropdownMenuItem>
                  <DropdownMenuItem className="gap-2"><Settings className="h-4 w-4" /> Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive gap-2"><LogOut className="h-4 w-4" /> Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="p-8 flex-1 overflow-auto max-w-7xl mx-auto w-full">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
