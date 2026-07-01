"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Plus,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Edit,
  Trash2,
  Mail,
  Phone,
  ShieldCheck,
  UserX,
  Filter,
  Download,
} from "lucide-react";

type MemberStatus = "approved" | "pending" | "rejected" | "suspended";

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: MemberStatus;
  joinDate: string;
  loansActive: number;
  totalBorrowed: number;
}

const members: Member[] = [
  { id: "M-001", name: "Sarah Jenkins", email: "sarah.j@email.com", phone: "+1 555-0101", status: "approved", joinDate: "2024-03-15", loansActive: 1, totalBorrowed: 5000 },
  { id: "M-002", name: "Michael Chen", email: "mchen@email.com", phone: "+1 555-0102", status: "approved", joinDate: "2024-02-20", loansActive: 2, totalBorrowed: 12000 },
  { id: "M-003", name: "Emily Rodriguez", email: "emily.r@email.com", phone: "+1 555-0103", status: "pending", joinDate: "2025-06-28", loansActive: 0, totalBorrowed: 0 },
  { id: "M-004", name: "David Okafor", email: "david.o@email.com", phone: "+1 555-0104", status: "pending", joinDate: "2025-06-29", loansActive: 0, totalBorrowed: 0 },
  { id: "M-005", name: "Lisa Thompson", email: "lisa.t@email.com", phone: "+1 555-0105", status: "approved", joinDate: "2023-11-10", loansActive: 1, totalBorrowed: 8000 },
  { id: "M-006", name: "James Park", email: "jpark@email.com", phone: "+1 555-0106", status: "rejected", joinDate: "2025-06-15", loansActive: 0, totalBorrowed: 0 },
  { id: "M-007", name: "Aisha Mohammed", email: "aisha.m@email.com", phone: "+1 555-0107", status: "approved", joinDate: "2024-08-05", loansActive: 0, totalBorrowed: 3000 },
  { id: "M-008", name: "Robert Kim", email: "rkim@email.com", phone: "+1 555-0108", status: "suspended", joinDate: "2024-05-22", loansActive: 1, totalBorrowed: 15000 },
  { id: "M-009", name: "Maria Santos", email: "msantos@email.com", phone: "+1 555-0109", status: "pending", joinDate: "2025-06-30", loansActive: 0, totalBorrowed: 0 },
  { id: "M-010", name: "Thomas Wright", email: "twright@email.com", phone: "+1 555-0110", status: "approved", joinDate: "2024-01-12", loansActive: 1, totalBorrowed: 7500 },
];

const statusConfig: Record<MemberStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: React.ElementType }> = {
  approved: { label: "Approved", variant: "default", icon: CheckCircle },
  pending: { label: "Pending", variant: "secondary", icon: Clock },
  rejected: { label: "Rejected", variant: "destructive", icon: XCircle },
  suspended: { label: "Suspended", variant: "outline", icon: UserX },
};

function MemberRow({ member, onApprove, onReject, onSuspend }: { member: Member; onApprove: (id: string) => void; onReject: (id: string) => void; onSuspend: (id: string) => void }) {
  const config = statusConfig[member.status];
  const StatusIcon = config.icon;

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`https://picsum.photos/seed/${member.id}/40/40`} />
            <AvatarFallback>{member.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{member.name}</p>
            <p className="text-xs text-muted-foreground">{member.id}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="space-y-0.5">
          <p className="text-sm flex items-center gap-1.5"><Mail className="h-3 w-3 text-muted-foreground" />{member.email}</p>
          <p className="text-xs text-muted-foreground flex items-center gap-1.5"><Phone className="h-3 w-3" />{member.phone}</p>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant={config.variant} className="gap-1">
          <StatusIcon className="h-3 w-3" />
          {config.label}
        </Badge>
      </TableCell>
      <TableCell className="text-sm text-muted-foreground">{member.joinDate}</TableCell>
      <TableCell className="text-sm">{member.loansActive}</TableCell>
      <TableCell className="text-sm font-medium">${member.totalBorrowed.toLocaleString()}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2"><Eye className="h-4 w-4" /> View Details</DropdownMenuItem>
            <DropdownMenuItem className="gap-2"><Edit className="h-4 w-4" /> Edit Member</DropdownMenuItem>
            {member.status === "pending" && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 text-emerald-600" onClick={() => onApprove(member.id)}>
                  <CheckCircle className="h-4 w-4" /> Approve
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 text-destructive" onClick={() => onReject(member.id)}>
                  <XCircle className="h-4 w-4" /> Reject
                </DropdownMenuItem>
              </>
            )}
            {member.status === "approved" && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 text-amber-600" onClick={() => onSuspend(member.id)}>
                  <ShieldCheck className="h-4 w-4" /> Suspend
                </DropdownMenuItem>
              </>
            )}
            {member.status !== "approved" && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 text-destructive">
                  <Trash2 className="h-4 w-4" /> Delete
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

function MemberTable({ data, onApprove, onReject, onSuspend }: { data: Member[]; onApprove: (id: string) => void; onReject: (id: string) => void; onSuspend: (id: string) => void }) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <Search className="h-12 w-12 mb-4 opacity-20" />
        <p className="text-lg font-medium">No members found</p>
        <p className="text-sm">Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Member</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Joined</TableHead>
          <TableHead>Active Loans</TableHead>
          <TableHead>Total Borrowed</TableHead>
          <TableHead className="w-12"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((member) => (
          <MemberRow key={member.id} member={member} onApprove={onApprove} onReject={onReject} onSuspend={onSuspend} />
        ))}
      </TableBody>
    </Table>
  );
}

export default function MembersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [memberData, setMemberData] = useState(members);

  const filterMembers = (status: MemberStatus | "all") => {
    let filtered = status === "all" ? memberData : memberData.filter(m => m.status === status);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.id.toLowerCase().includes(q)
      );
    }
    return filtered;
  };

  const handleApprove = (id: string) => {
    setMemberData(prev => prev.map(m => m.id === id ? { ...m, status: "approved" as MemberStatus } : m));
  };

  const handleReject = (id: string) => {
    setMemberData(prev => prev.map(m => m.id === id ? { ...m, status: "rejected" as MemberStatus } : m));
  };

  const handleSuspend = (id: string) => {
    setMemberData(prev => prev.map(m => m.id === id ? { ...m, status: "suspended" as MemberStatus } : m));
  };

  const counts = {
    all: memberData.length,
    approved: memberData.filter(m => m.status === "approved").length,
    pending: memberData.filter(m => m.status === "pending").length,
    rejected: memberData.filter(m => m.status === "rejected").length,
    suspended: memberData.filter(m => m.status === "suspended").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Members</h1>
          <p className="text-muted-foreground mt-1">Manage membership applications and member accounts.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button size="sm" className="bg-accent hover:bg-accent/90 gap-2">
            <Plus className="h-4 w-4" /> Add Member
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or ID..."
            className="pl-10 bg-slate-50 border-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="h-4 w-4" /> Filters
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="bg-slate-100 p-1">
          <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            All Members <span className="ml-1.5 text-xs bg-slate-200 px-1.5 py-0.5 rounded-full">{counts.all}</span>
          </TabsTrigger>
          <TabsTrigger value="approved" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Approved <span className="ml-1.5 text-xs bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">{counts.approved}</span>
          </TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            New Requests <span className="ml-1.5 text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">{counts.pending}</span>
          </TabsTrigger>
          <TabsTrigger value="suspended" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Suspended <span className="ml-1.5 text-xs bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-full">{counts.suspended}</span>
          </TabsTrigger>
          <TabsTrigger value="rejected" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Rejected <span className="ml-1.5 text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full">{counts.rejected}</span>
          </TabsTrigger>
        </TabsList>

        {(["all", "approved", "pending", "suspended", "rejected"] as const).map((tab) => (
          <TabsContent key={tab} value={tab}>
            <Card className="shadow-sm border-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">
                  {tab === "all" ? "All Members" : tab === "approved" ? "Approved Members" : tab === "pending" ? "New Membership Requests" : tab === "suspended" ? "Suspended Members" : "Rejected Applications"}
                </CardTitle>
                <CardDescription>
                  {tab === "all" && "Complete list of all registered members."}
                  {tab === "approved" && "Members with full access to loan services."}
                  {tab === "pending" && "Applications awaiting review and approval."}
                  {tab === "suspended" && "Temporarily restricted member accounts."}
                  {tab === "rejected" && "Applications that were not approved."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MemberTable
                  data={filterMembers(tab)}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  onSuspend={handleSuspend}
                />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
