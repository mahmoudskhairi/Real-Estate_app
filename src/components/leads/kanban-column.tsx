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
  onConvert: (leadId: string, leadName?: string) => void;
}

export function KanbanColumn({ id, title, items, onConvert }: Props) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="flex h-full w-80 min-w-[20rem] flex-col rounded-xl border-2 border-indigo-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-950/30 dark:backdrop-blur-sm"
    >
      <div className="p-4 font-bold text-indigo-700 border-b-2 border-indigo-200 flex justify-between items-center bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:text-slate-200 dark:border-slate-800 dark:bg-transparent dark:from-transparent dark:via-transparent dark:to-transparent">
        {title}
        <span className="text-xs bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-1 rounded-full text-white font-bold shadow-md dark:bg-slate-800 dark:text-slate-400 dark:from-transparent dark:to-transparent dark:shadow-none">
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
            <KanbanCard key={lead.id} lead={lead} onConvert={onConvert} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
