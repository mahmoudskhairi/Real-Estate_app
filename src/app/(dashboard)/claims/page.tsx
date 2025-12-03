"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { hasPermission } from "@/lib/auth";

interface Claim {
  id: string;
  title: string;
  description: string;
  status: "SUBMITTED" | "IN_REVIEW" | "RESOLVED";
  createdAt: string;
  client: {
    user: {
      name: string;
    };
  };
  operator?: {
    name: string;
  };
}

export default function ClaimsPage() {
  const [open, setOpen] = useState(false);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const { user } = useAuth();

  const canAddClaim = user?.role === 'CLIENT';
  const fetchClaims = async () => {
    try {
      console.log('Fetching claims for user:', user?.email, 'role:', user?.role);
      const response = await fetch('/api/claims');
      if (response.ok) {
        const data = await response.json();
        console.log('Claims data received:', data);
        if (Array.isArray(data)) {
          setClaims(data);
        } else {
          console.error('Invalid data format:', data);
          setClaims([]);
          toast.error('Invalid data format received');
        }
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Failed to load claims' }));
        console.error('API error:', response.status, errorData);
        setClaims([]);
        toast.error(errorData.message || 'Failed to load claims');
      }
    } catch (error) {
      console.error('Error fetching claims:', error);
      setClaims([]);
      toast.error('Error loading claims');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('User not authenticated');
      return;
    }

    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      // For CLIENT users, the server will automatically find their client profile
      const response = await fetch('/api/claims', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title.trim(),
          description: formData.description.trim(),
        }),
      });

      if (response.ok) {
        const newClaim = await response.json();
        toast.success(`Claim "${formData.title}" submitted successfully!`);
        setOpen(false);
        setFormData({ title: "", description: "" });
        fetchClaims(); // Refresh the claims list
      } else {
        const error = await response.json();
        console.error('Server error:', error);
        toast.error(error.message || 'Failed to submit claim');
      }
    } catch (error) {
      console.error('Error creating claim:', error);
      toast.error('Error submitting claim');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatStatus = (status: string) => {
    switch (status) {
      case 'SUBMITTED': return 'Submitted';
      case 'IN_REVIEW': return 'In Review';
      case 'RESOLVED': return 'Resolved';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent dark:text-white dark:bg-none">
          Claims Center
        </h2>
        {canAddClaim && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white dark:bg-amber-600 dark:hover:bg-amber-700 dark:from-transparent dark:to-transparent">
                <Plus className="mr-2 h-4 w-4" />
                New Claim
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white border-amber-200 dark:bg-slate-950 dark:border-slate-800">
              <DialogHeader>
                <DialogTitle className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent dark:text-white dark:bg-none">Submit New Claim</DialogTitle>
                <DialogDescription className="text-amber-700 dark:text-slate-400">
                  Describe your issue and we'll review it promptly.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title" className="text-amber-900 font-semibold dark:text-slate-200 dark:font-normal">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="border-amber-300 bg-white text-amber-900 placeholder:text-amber-400 focus:border-amber-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white dark:placeholder:text-slate-500"
                      placeholder="Brief title for your claim"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description" className="text-orange-900 font-semibold dark:text-slate-200 dark:font-normal">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="border-orange-300 bg-white text-orange-900 placeholder:text-orange-400 focus:border-orange-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white dark:placeholder:text-slate-500"
                      placeholder="Detailed description of the issue..."
                      rows={4}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setOpen(false)} className="border-amber-300 text-amber-700 hover:bg-amber-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white dark:bg-amber-600 dark:hover:bg-amber-700 dark:from-transparent dark:to-transparent">
                    Submit Claim
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <div className="rounded-lg border-2 border-amber-200 bg-white shadow-lg overflow-hidden dark:border-slate-800 dark:bg-slate-950/50 dark:backdrop-blur-xl">
        <Table>
          <TableHeader>
            <TableRow className="border-amber-100 bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 dark:border-slate-800 dark:bg-slate-900 dark:from-slate-900 dark:to-slate-900">
              <TableHead className="text-amber-900 font-bold dark:text-slate-400 dark:font-medium">Title</TableHead>
              {!canAddClaim && (
                <TableHead className="text-orange-900 font-bold dark:text-slate-400 dark:font-medium">Client</TableHead>
              )}
              <TableHead className="text-rose-900 font-bold dark:text-slate-400 dark:font-medium">Status</TableHead>
              <TableHead className="text-red-900 font-bold text-right dark:text-slate-400 dark:font-medium">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {claims.length === 0 ? (
              <TableRow>
                <TableCell colSpan={canAddClaim ? 3 : 4} className="text-center py-8 text-amber-600 dark:text-slate-400">
                  {canAddClaim ? "No claims submitted yet. Click 'New Claim' to get started." : "No claims to display."}
                </TableCell>
              </TableRow>
            ) : (
              claims.map((claim) => (
                <TableRow
                  key={claim.id}
                  className="border-amber-50 hover:bg-gradient-to-r hover:from-amber-50/50 hover:to-orange-50/50 transition-all dark:border-slate-800 dark:hover:bg-slate-900/50 dark:hover:from-transparent dark:hover:to-transparent"
                >
                  <TableCell className="font-semibold text-amber-700 flex items-center gap-2 dark:text-slate-200">
                    <FileText className="h-4 w-4 text-amber-600 dark:text-indigo-400" />
                    <div>
                      <div>{claim.title}</div>
                      <div className="text-xs text-amber-500 dark:text-slate-500 font-normal mt-1">
                        {claim.description.substring(0, 80)}{claim.description.length > 80 ? '...' : ''}
                      </div>
                    </div>
                  </TableCell>
                  {!canAddClaim && (
                    <TableCell className="text-orange-600 dark:text-slate-400">
                      {claim.client.user.name}
                    </TableCell>
                  )}
                  <TableCell className="dark:text-slate-400">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        claim.status === "SUBMITTED"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-500"
                          : claim.status === "IN_REVIEW"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-500"
                          : "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-500"
                      }`}
                    >
                      {formatStatus(claim.status)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-red-700 dark:text-slate-200">
                    {formatDate(claim.createdAt)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
