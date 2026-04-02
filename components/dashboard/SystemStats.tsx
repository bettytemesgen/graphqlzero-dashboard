'use client';

import React from 'react';

const Bar = ({ h, active }: { h: string, active?: boolean }) => (
  <div className="flex-1 flex items-end h-full">
    <div className={`w-full rounded-t-sm ${active ? 'bg-blue-600' : 'bg-slate-100'}`} style={{ height: `${h}%` }} />
  </div>
);

export function SystemStats() {
  return (
    <div className="grid grid-cols-12 gap-6 mt-10">
      {/* Posting Frequency Card */}
      <div className="col-span-4 bg-white border border-slate-100 rounded-[24px] p-8 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-sm font-bold text-slate-900">Posting Frequency</h3>
          <svg className="text-blue-500" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
        </div>
        <div className="flex items-end justify-between gap-2 h-24 mb-6">
          <Bar h="40" /><Bar h="55" /><Bar h="75" active /><Bar h="45" /><Bar h="65" /><Bar h="85" active /><Bar h="30" />
        </div>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[2px] text-center">Last 7 Node Updates</p>
      </div>

      {/* Dark System Status Card */}
      <div className="col-span-8 bg-[#020617] rounded-[24px] p-10 flex relative overflow-hidden">
        <div className="relative z-10 flex-1">
          <span className="bg-blue-600 text-white text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded mb-6 inline-block">System Status</span>
          <h2 className="text-white text-2xl font-bold mb-4">API Performance is optimal at 99.8% uptime</h2>
          <p className="text-slate-400 text-sm mb-8 max-w-md">The GraphQL resolver for Posts entity is responding with sub-200ms latency across global clusters.</p>
          <button className="bg-[#1E293B] text-white text-[10px] font-bold uppercase tracking-wider px-6 py-3 rounded-xl border border-slate-700">Check Detailed Logs</button>
        </div>
        <div className="relative z-10 w-44 h-28 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm flex flex-col items-center justify-center gap-2 self-center">
          <svg className="text-blue-400" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path></svg>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Live Schema Stream</span>
        </div>
      </div>
    </div>
  );
}