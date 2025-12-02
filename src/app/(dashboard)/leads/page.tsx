"use client";

import { KanbanBoard } from "@/components/leads/kanban-board";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function LeadsPage() {
  return (
    <div className="flex h-full flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Leads Pipeline
        </h2>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <Plus className="mr-2 h-4 w-4" />
          New Lead
        </Button>
      </div>
      <div className="flex-1 overflow-hidden">
        <KanbanBoard />
      </div>
    </div>
  );
}
