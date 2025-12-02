"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText } from "lucide-react";

// Mock data
const claims = [
  {
    id: "1",
    title: "Leaking Roof",
    client: "Alice Johnson",
    status: "Submitted",
    date: "2023-10-01",
  },
  {
    id: "2",
    title: "Broken HVAC",
    client: "Bob Smith",
    status: "In Review",
    date: "2023-09-28",
  },
];

export default function ClaimsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Claims Center
        </h2>
      </div>
      <div className="rounded-md border border-slate-800 bg-slate-950/50 backdrop-blur-xl">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-800 hover:bg-slate-900/50">
              <TableHead className="text-slate-400">Title</TableHead>
              <TableHead className="text-slate-400">Client</TableHead>
              <TableHead className="text-slate-400">Status</TableHead>
              <TableHead className="text-slate-400 text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {claims.map((claim) => (
              <TableRow
                key={claim.id}
                className="border-slate-800 hover:bg-slate-900/50"
              >
                <TableCell className="font-medium text-slate-200 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-indigo-400" />
                  {claim.title}
                </TableCell>
                <TableCell className="text-slate-400">{claim.client}</TableCell>
                <TableCell className="text-slate-400">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      claim.status === "Submitted"
                        ? "bg-yellow-500/10 text-yellow-500"
                        : claim.status === "In Review"
                        ? "bg-blue-500/10 text-blue-500"
                        : "bg-green-500/10 text-green-500"
                    }`}
                  >
                    {claim.status}
                  </span>
                </TableCell>
                <TableCell className="text-right text-slate-200">
                  {claim.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
