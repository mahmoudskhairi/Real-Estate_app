"use client";

import { useState, useEffect } from "react";
import { KanbanBoard } from "@/components/leads/kanban-board";
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
import { Plus } from "lucide-react";
import { toast } from "sonner";

export default function LeadsPage() {
  const [open, setOpen] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ title: "", description: "", contactName: "", contactEmail: "" });

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/leads');
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setLeads(data);
        } else {
          toast.error('Invalid data format received');
          setLeads([]);
        }
      } else {
        toast.error('Failed to load leads');
        setLeads([]);
      }
    } catch (error) {
      toast.error('Error loading leads');
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleLeadCreated = () => {
    fetchLeads(); // Refetch all leads
  };

  const handleLeadConverted = (convertedLeadId: string) => {
    setLeads(prevLeads => prevLeads.filter(lead => lead.id !== convertedLeadId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          contactName: formData.contactName,
          contactEmail: formData.contactEmail,
          status: 'NEW',
        }),
      });

      if (response.ok) {
        toast.success(`Lead "${formData.title}" created successfully!`);
        setOpen(false);
        setFormData({ title: "", description: "", contactName: "", contactEmail: "" });
        handleLeadCreated(); // Trigger refresh
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to create lead');
      }
    } catch (error) {
      console.error('Error creating lead:', error);
      toast.error('Error creating lead');
    }
  };

  return (
    <div className="flex h-full flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent dark:text-white dark:bg-none">
          Leads Pipeline
        </h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <Plus className="mr-2 h-4 w-4" />
              New Lead
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white border-cyan-200 dark:bg-slate-950 dark:border-slate-800">
            <DialogHeader>
              <DialogTitle className="text-cyan-900 dark:text-white">Create New Lead</DialogTitle>
              <DialogDescription className="text-cyan-700 dark:text-slate-400">
                Add a new lead to the pipeline. Fill in the details below.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title" className="text-blue-900 font-semibold dark:text-slate-200 dark:font-normal">Lead Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="border-blue-300 bg-white text-blue-900 placeholder:text-blue-400 focus:border-blue-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white dark:placeholder:text-slate-500"
                    placeholder="Luxury Villa Interest"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description" className="text-cyan-900 font-semibold dark:text-slate-200 dark:font-normal">Description</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="border-cyan-300 bg-white text-cyan-900 placeholder:text-cyan-400 focus:border-cyan-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white dark:placeholder:text-slate-500"
                    placeholder="Interested in beachfront property"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contactName" className="text-teal-900 font-semibold dark:text-slate-200 dark:font-normal">Contact Name</Label>
                  <Input
                    id="contactName"
                    value={formData.contactName}
                    onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                    className="border-teal-300 bg-white text-teal-900 placeholder:text-teal-400 focus:border-teal-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white dark:placeholder:text-slate-500"
                    placeholder="Jane Smith"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contactEmail" className="text-blue-900 font-semibold dark:text-slate-200 dark:font-normal">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                    className="border-blue-300 bg-white text-blue-900 placeholder:text-blue-400 focus:border-blue-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white dark:placeholder:text-slate-500"
                    placeholder="jane@example.com"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)} className="border-cyan-300 text-cyan-700 hover:bg-cyan-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
                  Cancel
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:from-transparent dark:to-transparent">
                  Create Lead
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex-1 overflow-hidden">
        <KanbanBoard 
          leads={leads} 
          onConvertLead={handleLeadConverted}
          onUpdateLeads={setLeads}
        />
      </div>
    </div>
  );
}
