"use client";

import React from "react";
import Header from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import TaskDashboard from "@/components/dashboard/TaskManagement";
import SystemHealthFooter from "@/components/dashboard/SystemHealthFooter";
// import ApolloWrapper from "@/app/ApolloWrapper";
import ApolloProviderWrapper from "@/components/ApolloProviderWrapper";
export default function DashboardPage() {
  return (
    <ApolloProviderWrapper>
      <div className="flex min-h-screen bg-[#F8FAFC] font-manrope text-slate-900">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="p-12">
            <TaskDashboard />
            <SystemHealthFooter />
          </main>
        </div>
      </div>
    </ApolloProviderWrapper>
  );
}