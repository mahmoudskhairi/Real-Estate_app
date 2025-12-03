"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
}

export default function ClientsPage() {
  const [open, setOpen] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  const fetchClients = async () => {
    try {
      const response = await fetch('/api/clients');
      if (response.ok) {
        const data = await response.json();
        // Validate that data is an array
        if (Array.isArray(data)) {
          setClients(data);
        } else {
          console.error('Invalid data format:', data);
          setClients([]);
          toast.error('Invalid data format received');
        }
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Failed to load clients' }));
        console.error('API error:', errorData);
        setClients([]);
        toast.error(errorData.message || 'Failed to load clients');
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
      setClients([]);
      toast.error('Error loading clients');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(`Client "${formData.name}" added successfully!`);
        setOpen(false);
        setFormData({ name: "", email: "", phone: "" });
        fetchClients(); // Refresh the list
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to add client');
      }
    } catch (error) {
      console.error('Error creating client:', error);
      toast.error('Error adding client');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent dark:text-white dark:bg-none">
          Clients
        </h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white border-indigo-200 dark:bg-slate-950 dark:border-slate-800">
            <DialogHeader>
              <DialogTitle className="text-indigo-900 dark:text-white">Add New Client</DialogTitle>
              <DialogDescription className="text-indigo-700 dark:text-slate-400">
                Create a new client profile. Fill in the details below.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-indigo-900 font-semibold dark:text-slate-200 dark:font-normal">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="border-indigo-300 bg-white text-indigo-900 placeholder:text-indigo-400 focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white dark:placeholder:text-slate-500"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-purple-900 font-semibold dark:text-slate-200 dark:font-normal">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="border-purple-300 bg-white text-purple-900 placeholder:text-purple-400 focus:border-purple-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white dark:placeholder:text-slate-500"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone" className="text-pink-900 font-semibold dark:text-slate-200 dark:font-normal">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9+\-() ]/g, '');
                      setFormData({...formData, phone: value});
                    }}
                    pattern="[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}"
                    className="border-pink-300 bg-white text-pink-900 placeholder:text-pink-400 focus:border-pink-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white dark:placeholder:text-slate-500"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)} className="border-indigo-300 text-indigo-700 hover:bg-indigo-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
                  Cancel
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:from-transparent dark:to-transparent">
                  Add Client
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="rounded-lg border border-indigo-200 bg-white shadow-lg overflow-hidden dark:border-slate-800 dark:bg-slate-950/50 dark:backdrop-blur-xl">
        <Table>
          <TableHeader>
            <TableRow className="border-indigo-100 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:border-slate-800 dark:bg-slate-900 dark:from-slate-900 dark:to-slate-900">
              <TableHead className="text-indigo-900 font-bold dark:text-slate-400 dark:font-medium">Name</TableHead>
              <TableHead className="text-purple-900 font-bold dark:text-slate-400 dark:font-medium">Email</TableHead>
              <TableHead className="text-pink-900 font-bold dark:text-slate-400 dark:font-medium">Phone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-indigo-600 py-8 dark:text-slate-400">
                  Loading clients...
                </TableCell>
              </TableRow>
            ) : clients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-purple-600 py-8 dark:text-slate-400">
                  No clients found. Add your first client!
                </TableCell>
              </TableRow>
            ) : (
              clients.map((client) => (
                <TableRow
                  key={client.id}
                  className="border-indigo-50 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-all dark:border-slate-800 dark:hover:bg-slate-900/50 dark:hover:from-transparent dark:hover:to-transparent"
                >
                  <TableCell className="font-semibold text-indigo-700 dark:text-slate-200">
                    {client.name}
                  </TableCell>
                  <TableCell className="text-purple-600 dark:text-slate-400">{client.email}</TableCell>
                  <TableCell className="text-pink-600 dark:text-slate-400">
                    {client.phone || 'N/A'}
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
