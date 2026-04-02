import React from 'react'
import Header from '@/components/dashboard/Header'
import { Sidebar } from '@/components/dashboard/Sidebar';
import UserManager from '@/components/dashboard/UserManager';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-manrope text-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="p-12">
            <UserManager />
        </main>
      </div>
    </div>
  )
}