"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { KanbanCard } from "./kanban-card";
import { Lead } from "@prisma/client";

interface Props {
  id: string;
  title: string;
  items: Lead[];
}

export function KanbanColumn({ id, title, items }: Props) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="flex h-full w-80 min-w-[20rem] flex-col rounded-lg border border-slate-800 bg-slate-950/30 backdrop-blur-sm"
    >
      <div className="p-4 font-semibold text-slate-200 border-b border-slate-800 flex justify-between items-center">
        {title}
        <span className="text-xs bg-slate-800 px-2 py-1 rounded-full text-slate-400">
          {items.length}
        </span>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        <SortableContext
          id={id}
          items={items}
          strategy={verticalListSortingStrategy}
        >
          {items.map((lead) => (
            <KanbanCard key={lead.id} lead={lead} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
