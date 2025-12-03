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
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [formData, setFormData] = useState({ title: "", description: "", contactName: "", contactEmail: "" });

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
        setRefreshTrigger(prev => prev + 1); // Trigger Kanban refresh
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
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Lead</DialogTitle>
              <DialogDescription>
                Add a new lead to the pipeline. Fill in the details below.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title" className="text-slate-200">Lead Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="border-slate-800 bg-slate-900/50 text-white"
                    placeholder="Luxury Villa Interest"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description" className="text-slate-200">Description</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="border-slate-800 bg-slate-900/50 text-white"
                    placeholder="Interested in beachfront property"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contactName" className="text-slate-200">Contact Name</Label>
                  <Input
                    id="contactName"
                    value={formData.contactName}
                    onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                    className="border-slate-800 bg-slate-900/50 text-white"
                    placeholder="Jane Smith"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contactEmail" className="text-slate-200">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                    className="border-slate-800 bg-slate-900/50 text-white"
                    placeholder="jane@example.com"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)} className="border-slate-700 text-slate-300">
                  Cancel
                </Button>
                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                  Create Lead
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex-1 overflow-hidden">
        <KanbanBoard key={refreshTrigger} />
      </div>
    </div>
  );
}
