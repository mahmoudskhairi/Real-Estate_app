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
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent dark:text-white dark:bg-none">
          Claims Center
        </h2>
      </div>
      <div className="rounded-lg border-2 border-amber-200 bg-white shadow-lg overflow-hidden dark:border-slate-800 dark:bg-slate-950/50 dark:backdrop-blur-xl">
        <Table>
          <TableHeader>
            <TableRow className="border-amber-100 bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 dark:border-slate-800 dark:bg-slate-900 dark:from-slate-900 dark:to-slate-900">
              <TableHead className="text-amber-900 font-bold dark:text-slate-400 dark:font-medium">Title</TableHead>
              <TableHead className="text-orange-900 font-bold dark:text-slate-400 dark:font-medium">Client</TableHead>
              <TableHead className="text-rose-900 font-bold dark:text-slate-400 dark:font-medium">Status</TableHead>
              <TableHead className="text-red-900 font-bold text-right dark:text-slate-400 dark:font-medium">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {claims.map((claim) => (
              <TableRow
                key={claim.id}
                className="border-amber-50 hover:bg-gradient-to-r hover:from-amber-50/50 hover:to-orange-50/50 transition-all dark:border-slate-800 dark:hover:bg-slate-900/50 dark:hover:from-transparent dark:hover:to-transparent"
              >
                <TableCell className="font-semibold text-amber-700 flex items-center gap-2 dark:text-slate-200">
                  <FileText className="h-4 w-4 text-amber-600 dark:text-indigo-400" />
                  {claim.title}
                </TableCell>
                <TableCell className="text-orange-600 dark:text-slate-400">{claim.client}</TableCell>
                <TableCell className="dark:text-slate-400">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      claim.status === "Submitted"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-500"
                        : claim.status === "In Review"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-500"
                        : "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-500"
                    }`}
                  >
                    {claim.status}
                  </span>
                </TableCell>
                <TableCell className="text-right font-semibold text-red-700 dark:text-slate-200">
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
