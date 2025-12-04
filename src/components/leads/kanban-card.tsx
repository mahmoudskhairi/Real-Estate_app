"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "QUALIFIED"
  | "PROPOSAL"
  | "NEGOTIATION"
  | "WON"
  | "LOST";

type LeadItem = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  status: LeadStatus;
  operatorId: string | null;
  createdAt?: Date;
  updatedAt?: Date;
};
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/lib/toast";
import { UserPlus } from "lucide-react";

interface Props {
  lead: LeadItem;
  onConvert: (leadId: string) => void;
}

export function KanbanCard({ lead, onConvert }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: lead.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleConvert = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent dnd-kit drag from triggering
    if (confirm(`Are you sure you want to convert "${lead.name}" to a client?`)) {
      try {
        const response = await fetch(`/api/leads/${lead.id}/convert`, {
          method: 'POST',
        });

        if (response.ok) {
          await response.json();
          toast.success(`Lead "${lead.name}" converted to client successfully!`);
          onConvert(lead.id); // Notify parent to refetch or update state
        } else {
          const error = await response.json();
          toast.error(error.message || 'Failed to convert lead.');
        }
      } catch (error) {
        console.error("Conversion error:", error);
        toast.error('An error occurred during conversion.');
      }
    }
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card className="cursor-grab active:cursor-grabbing border-2 border-indigo-200 bg-gradient-to-br from-white to-indigo-50/30 hover:border-purple-400 hover:shadow-xl hover:scale-105 transition-all dark:border-slate-800 dark:bg-slate-900/50 dark:from-transparent dark:to-transparent dark:hover:border-indigo-500/50 dark:hover:scale-100">
        <CardHeader className="p-3 pb-0">
          <CardTitle className="text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:text-slate-200 dark:bg-none">
            {lead.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 space-y-2">
          <p className="text-xs text-blue-600 font-medium dark:text-slate-500">{lead.email}</p>
          {lead.status === 'WON' && (
            <Button
              size="xs"
              className="w-full bg-green-500 hover:bg-green-600 text-white text-xs"
              onClick={handleConvert}
            >
              <UserPlus className="h-3 w-3 mr-1.5" />
              Convert to Client
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
