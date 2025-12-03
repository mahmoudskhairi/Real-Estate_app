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
      <Card className="cursor-grab active:cursor-grabbing border-2 border-indigo-200 bg-gradient-to-br from-white to-indigo-50/30 hover:border-purple-400 hover:shadow-xl hover:scale-105 transition-all dark:border-slate-800 dark:bg-slate-900/50 dark:from-transparent dark:to-transparent dark:hover:border-indigo-500/50 dark:hover:scale-100">
        <CardHeader className="p-3 pb-0">
          <CardTitle className="text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:text-slate-200 dark:bg-none">
            {lead.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <p className="text-xs text-blue-600 font-medium dark:text-slate-500">{lead.email}</p>
        </CardContent>
      </Card>
    </div>
  );
}
