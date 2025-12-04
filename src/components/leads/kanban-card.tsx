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
import { toast } from "sonner";
import { UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  lead: LeadItem;
  onConvert: (leadId: string) => void;
}

export function KanbanCard({ lead, onConvert }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: lead.id });
  const router = useRouter();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleConvert = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('[Kanban] Convert button clicked for lead:', lead.id, lead.name);
    
    if (confirm(`Are you sure you want to convert "${lead.name}" to a client?`)) {
      console.log('[Kanban] User confirmed conversion');
      try {
        console.log('[Kanban] Fetching /api/leads/' + lead.id + '/convert');
        const response = await fetch(`/api/leads/${lead.id}/convert`, {
          method: 'POST',
        });
        
        console.log('[Kanban] Response status:', response.status);

        if (response.ok) {
          const data = await response.json();
          console.log('[Kanban] Conversion successful:', data);
          toast.success(`Lead "${lead.name}" converted to client successfully!`);
          onConvert(lead.id);
          console.log('[Kanban] Navigating to /clients');
          setTimeout(() => router.push('/clients'), 1000);
        } else {
          const error = await response.json().catch(() => ({ message: 'Failed to convert lead.' }));
          console.log('[Kanban] Conversion failed:', response.status, error);
          toast.error(error.message || 'Failed to convert lead.');
        }
      } catch (error) {
        console.error('[Kanban] Conversion error:', error);
        toast.error('An error occurred during conversion.');
      }
    } else {
      console.log('[Kanban] User cancelled conversion');
    }
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card className="cursor-grab active:cursor-grabbing border-2 border-indigo-200 bg-gradient-to-br from-white to-indigo-50/30 hover:border-purple-400 hover:shadow-xl transition-all dark:border-slate-800 dark:bg-slate-900/50 dark:from-transparent dark:to-transparent dark:hover:border-indigo-500/50" {...attributes} {...listeners}>
        <CardHeader className="p-3 pb-0">
          <CardTitle className="text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:text-slate-200 dark:bg-none">
            {lead.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 space-y-2">
          <p className="text-xs text-blue-600 font-medium dark:text-slate-500">{lead.email}</p>
          {lead.status === 'WON' && (
            <button
              type="button"
              className="w-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white text-xs px-2 py-1.5 rounded font-medium inline-flex items-center justify-center gap-1 cursor-pointer transition-colors z-50 relative"
              onClick={handleConvert}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
            >
              <UserPlus className="h-3 w-3" />
              Convert to Client
            </button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
}
