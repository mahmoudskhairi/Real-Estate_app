"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Lead } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  lead: Lead;
}

export function KanbanCard({ lead }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: lead.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card className="cursor-grab active:cursor-grabbing border-slate-800 bg-slate-900/50 hover:border-indigo-500/50 transition-colors">
        <CardHeader className="p-3 pb-0">
          <CardTitle className="text-sm font-medium text-slate-200">
            {lead.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <p className="text-xs text-slate-500">{lead.email}</p>
        </CardContent>
      </Card>
    </div>
  );
}
