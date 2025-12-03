"use client";

import { useState, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { KanbanColumn } from "./kanban-column";
import { KanbanCard } from "./kanban-card";
import { toast } from "sonner";
import { Lead } from "@prisma/client";

const defaultCols = [
  { id: "NEW", title: "New" },
  { id: "CONTACTED", title: "Contacted" },
  { id: "QUALIFIED", title: "Qualified" },
  { id: "PROPOSAL", title: "Proposal" },
  { id: "NEGOTIATION", title: "Negotiation" },
  { id: "WON", title: "Won" },
  { id: "LOST", title: "Lost" },
];

export function KanbanBoard() {
  const [items, setItems] = useState<Lead[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/leads');
      if (response.ok) {
        const data = await response.json();
        // Validate that data is an array
        if (Array.isArray(data)) {
          // API returns leads with name, email, phone directly
          const leads = data.map((item: any) => ({
            id: item.id,
            name: item.name,
            email: item.email,
            phone: item.phone || '',
            status: item.status,
            operatorId: item.operatorId,
            createdAt: new Date(item.createdAt),
            updatedAt: new Date(item.updatedAt),
          }));
          setItems(leads as Lead[]);
        } else {
          console.error('Invalid data format:', data);
          setItems([]);
          toast.error('Invalid data format received');
        }
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Failed to load leads' }));
        console.error('API error:', errorData);
        setItems([]);
        toast.error(errorData.message || 'Failed to load leads');
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
      setItems([]);
      toast.error('Error loading leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);
    
    if (!over) return;
    
    const activeId = active.id as string;
    const overId = over.id as string;
    
    // Find the lead being dragged
    const lead = items.find(item => item.id === activeId);
    if (!lead) return;
    
    // Check if dropped on a column (status change)
    const newStatus = defaultCols.find(col => col.id === overId)?.id;
    if (newStatus && newStatus !== lead.status) {
      try {
        const response = await fetch(`/api/leads/${lead.id}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus }),
        });
        
        if (response.ok) {
          // Update local state
          setItems(items.map(item => 
            item.id === lead.id ? { ...item, status: newStatus } : item
          ));
          toast.success(`Lead moved to ${defaultCols.find(col => col.id === newStatus)?.title}`);
        } else {
          toast.error('Failed to update lead status');
        }
      } catch (error) {
        console.error('Error updating lead:', error);
        toast.error('Error updating lead');
      }
    }
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-slate-400">
        Loading leads...
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-full gap-4 overflow-x-auto pb-4">
        {defaultCols.map((col) => (
          <KanbanColumn
            key={col.id}
            id={col.id}
            title={col.title}
            items={items.filter((i) => i.status === col.id)}
          />
        ))}
      </div>
      <DragOverlay>
        {activeId ? (
          <KanbanCard lead={items.find((i) => i.id === activeId)!} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
