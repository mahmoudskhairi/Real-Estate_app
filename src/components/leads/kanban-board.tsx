"use client";

import { useState } from "react";
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
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { KanbanColumn } from "./kanban-column";
import { KanbanCard } from "./kanban-card";
import { toast } from "@/lib/toast";

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
  createdAt: Date;
  updatedAt: Date;
};

const defaultCols: { id: LeadStatus; title: string }[] = [
  { id: "NEW", title: "New" },
  { id: "CONTACTED", title: "Contacted" },
  { id: "QUALIFIED", title: "Qualified" },
  { id: "PROPOSAL", title: "Proposal" },
  { id: "NEGOTIATION", title: "Negotiation" },
  { id: "WON", title: "Won" },
  { id: "LOST", title: "Lost" },
];

interface KanbanBoardProps {
  leads: LeadItem[];
  onConvertLead: (convertedLeadId: string, leadName?: string) => void;
  onUpdateLeads: (updatedLeads: LeadItem[] | ((prev: LeadItem[]) => LeadItem[])) => void;
}

export function KanbanBoard({ leads, onConvertLead, onUpdateLeads }: KanbanBoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function findContainer(id: string): LeadStatus | undefined {
    // Check if it's a column ID
    if (defaultCols.find(col => col.id === id)) {
      return id as LeadStatus;
    }
    
    // Otherwise, find which column contains this lead
    const lead = leads.find(item => item.id === id);
    return lead?.status;
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);
    
    if (!over) return;
    
    const activeId = active.id as string;
    const overId = over.id as string;
    
    // Find the lead being dragged
    const lead = leads.find(item => item.id === activeId);
    if (!lead) return;
    
    // Find the target container (column)
    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);
    
    if (!overContainer || activeContainer === overContainer) {
      return; // No status change needed
    }
    
    // Update optimistically
    const updatedItems = leads.map(item => 
      item.id === lead.id ? { ...item, status: overContainer } : item
    );
    onUpdateLeads(updatedItems);
    
    // Update on server
    try {
      const response = await fetch(`/api/leads/${lead.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: overContainer }),
      });
      
      if (response.ok) {
        toast.success(`Lead moved to ${defaultCols.find(col => col.id === overContainer)?.title}`);
        
        // If moved to WON, auto-convert to client
        if (overContainer === 'WON') {
          console.log('[Kanban] Auto-converting lead to client:', lead.id, lead.name);
          
          // Wait a moment to ensure status update is processed
          setTimeout(async () => {
            try {
              const convertResponse = await fetch(`/api/leads/${lead.id}/convert`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
              });
              
              console.log('[Kanban] Convert response status:', convertResponse.status);
              
              if (convertResponse.ok) {
                const convertData = await convertResponse.json();
                console.log('[Kanban] Auto-conversion successful:', convertData);
                onConvertLead(lead.id, lead.name);
                
                // Remove from leads list
                onUpdateLeads(prev => prev.filter(item => item.id !== lead.id));
              } else {
                const error = await convertResponse.json().catch(() => ({ message: 'Failed to convert' }));
                console.error('[Kanban] Auto-conversion failed:', convertResponse.status, error);
                toast.error(`Conversion failed: ${error.message || 'Unknown error'}`);
              }
            } catch (error) {
              console.error('[Kanban] Auto-conversion error:', error);
              toast.error('An error occurred during auto-conversion');
            }
          }, 500);
        }
      } else {
        // Revert on error
        onUpdateLeads(leads);
        toast.error('Failed to update lead status');
      }
    } catch (error) {
      console.error('Error updating lead:', error);
      // Revert on error
      onUpdateLeads(leads);
      toast.error('An error occurred while updating lead status');
    }
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return;
    }

    onUpdateLeads((prev) =>
      prev.map((item) =>
        item.id === activeId ? { ...item, status: overContainer } : item
      )
    );
  }

  const activeLead = leads.find(item => item.id === activeId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-full items-start gap-4 overflow-x-auto p-4">
        {defaultCols.map((col) => (
          <KanbanColumn
            key={col.id}
            id={col.id}
            title={col.title}
            items={leads.filter((item) => item.status === col.id)}
            onConvert={onConvertLead}
          />
        ))}
      </div>
      <DragOverlay>
        {activeLead ? <KanbanCard lead={activeLead} onConvert={onConvertLead} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
