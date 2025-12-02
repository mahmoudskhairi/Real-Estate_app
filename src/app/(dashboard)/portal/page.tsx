"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, FileText, Plus } from "lucide-react";

export default function ClientPortalPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-white">
          My Portal
        </h2>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <Plus className="mr-2 h-4 w-4" />
          New Claim
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-slate-800 bg-slate-950/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Building2 className="h-5 w-5 text-indigo-400" />
              My Properties
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-400">You have 1 active property.</p>
            <div className="mt-4 p-4 rounded-md bg-slate-900/50 border border-slate-800">
              <h4 className="font-semibold text-slate-200">
                Luxury Villa in Malibu
              </h4>
              <p className="text-sm text-slate-500">
                123 Ocean Drive, Malibu, CA
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-950/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="h-5 w-5 text-yellow-400" />
              Recent Claims
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-md bg-slate-900/50 border border-slate-800">
                <div>
                  <p className="font-medium text-slate-200">Leaking Roof</p>
                  <p className="text-xs text-slate-500">
                    Submitted on Oct 1, 2023
                  </p>
                </div>
                <span className="text-xs bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-full">
                  Submitted
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
