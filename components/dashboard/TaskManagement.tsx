'use client';

import React, { useState } from 'react';
// @ts-ignore
import { useQuery } from '@apollo/client/react/hooks';
import { GET_TODOS } from '@/graphql/queries';

// 1. Define the Shape of your API Response
interface TodoData {
  todos: {
    data: {
      id: string;
      title: string;
      completed: boolean;
      user: {
        name: string;
      };
    }[];
    meta: {
      totalCount: number;
    };
  };
}

// 2. Define the Props for the StatCard
interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  percentage?: string;
  icon: React.ReactNode;
  isProgress?: boolean;
}

// --- Sub-component for Stats ---
const StatCard: React.FC<StatCardProps> = ({ label, value, subtext, percentage, icon, isProgress }) => (
  <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden group h-full">
    <div className="flex justify-between items-start mb-6">
      <div className="w-12 h-12 bg-blue-50/50 rounded-2xl flex items-center justify-center border border-blue-100/50 text-blue-600">
        {icon}
      </div>
    </div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">{label}</p>
    <h3 className="text-4xl font-black text-slate-950 tracking-tighter mb-2">{value}</h3>

    {isProgress ? (
      <div className="mt-4 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
        <div
          className="bg-blue-600 h-full rounded-full transition-all duration-1000"
          style={{ width: typeof value === 'string' && value.includes('%') ? value : '0%' }}
        />
      </div>
    ) : (
      <p className="text-[11px] font-bold">
        {percentage && <span className="text-emerald-500">{percentage}</span>}
        {subtext && <span className="text-slate-400 ml-1">{subtext}</span>}
      </p>
    )}
  </div>
);

// --- Main Dashboard Component ---
const TaskDashboard: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Completed'>('All');
  const [page, setPage] = useState(1);
  const limit = 7;

  // 3. Apply the TodoData interface here <TodoData>
const { data, loading, error } = useQuery<TodoData>(GET_TODOS, {
  variables: {
    page,
    limit,
  },
});
const totalCount = data?.todos?.meta?.totalCount || 0;

const tasks = (data?.todos?.data || []).filter((task) => {
  if (filter === 'All') return true;
  if (filter === 'Completed') return task.completed;
  if (filter === 'Pending') return !task.completed;
});
  // const totalCount = data?.todos?.meta?.totalCount || 0;
  // const tasks = data?.todos?.data || [];

  if (error) return <div className="p-10 text-red-500 font-bold">Error: {error.message}</div>;

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-[32px] font-black text-slate-950 tracking-tight">Task Management</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            Curating the GraphQLZero Todos dataset with editorial precision.
          </p>
        </div>
        <div className="flex bg-slate-100/50 p-1 rounded-xl border border-slate-200 shadow-sm">
          {['All', 'Pending', 'Completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => { setFilter(tab as any); setPage(1); }}
              className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${
                filter === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-6">
        <StatCard
          label="Total Tasks"
          value={loading ? "..." : totalCount.toString()}
          percentage="+12%"
          subtext="from last sync"
          icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>}
        />
        <StatCard
          label="Volume Filtered"
          value={loading ? "..." : tasks.length.toString()}
          percentage="Current View"
          subtext="items loaded"
          icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /></svg>}
        />
        <StatCard
          label="Completion Rate"
          value="72%"
          isProgress
          icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>}
        />
      </div>

      {/* Main Table */}
      <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
            <tr>
              <th className="px-8 py-5">ID</th>
              <th className="px-8 py-5">Title</th>
              <th className="px-8 py-5">User</th>
              <th className="px-8 py-5">Status</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loading
              ? [...Array(limit)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={5} className="px-8 py-6 h-16 bg-slate-50/30"></td>
                  </tr>
                ))
              : tasks.map((task: any) => (
                  <tr key={task.id} className="hover:bg-slate-50/30 transition-colors group">
                    <td className="px-8 py-6 text-sm font-black text-blue-600">#{task.id}</td>
                    <td className="px-8 py-6 text-sm font-bold text-slate-700 tracking-tight capitalize">{task.title}</td>
                    <td className="px-8 py-6">
                      <span className="px-2.5 py-1 bg-slate-100 text-[10px] font-black text-slate-500 rounded-lg border border-slate-200 uppercase">
                        {task.user?.name || "Guest"}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-5 rounded-full relative transition-colors duration-300 flex items-center px-1 ${task.completed ? 'bg-blue-600' : 'bg-slate-200'}`}>
                          <div className={`w-3 h-3 bg-white rounded-full transition-all duration-300 ${task.completed ? 'translate-x-5' : 'translate-x-0'}`} />
                        </div>
                        <span className="text-xs font-bold text-slate-400">{task.completed ? 'Completed' : 'Pending'}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="text-slate-300 hover:text-blue-600 transition-colors">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>

        {/* Pagination Footer */}
        <div className="px-8 py-6 border-t border-slate-100 flex justify-between items-center bg-slate-50/20">
          <p className="text-xs text-slate-400 font-bold">
            Showing {(page - 1) * limit + 1} to {Math.min(page * limit, totalCount)} of {totalCount}
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-white disabled:opacity-30"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-black shadow-lg shadow-blue-100">{page}</button>
            <button
              disabled={page * limit >= totalCount}
              onClick={() => setPage(p => p + 1)}
              className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-white disabled:opacity-30"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDashboard;