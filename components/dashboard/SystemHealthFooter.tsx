'use client';

import React from 'react';

const SystemHealthSection = () => {
  return (
    <div className="grid grid-cols-12 gap-6 mt-10">
      {/* --- Left: System Health & Latency Card --- */}
      <div className="col-span-8 bg-white border border-slate-200 rounded-[32px] p-10 flex items-center justify-between shadow-sm relative overflow-hidden group">
        <div className="relative z-10">
          <h4 className="text-[22px] font-black text-slate-900 tracking-tight mb-8">
            System Health & Latency
          </h4>
          <div className="flex gap-16">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Avg. Response</p>
              <p className="text-[32px] font-black text-blue-600 tracking-tighter">124ms</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Uptime</p>
              <p className="text-[32px] font-black text-slate-900 tracking-tighter">99.9%</p>
            </div>
          </div>
        </div>

        {/* Abstract Chart Overlay */}
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-30 pointer-events-none group-hover:opacity-50 transition-opacity duration-700">
          <svg viewBox="0 0 400 200" className="h-full w-full">
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path 
              d="M0 150 Q 50 130, 100 140 T 200 100 T 300 120 T 400 80" 
              fill="none" 
              stroke="#2563eb" 
              strokeWidth="2.5" 
            />
            <path 
              d="M0 150 Q 50 130, 100 140 T 200 100 T 300 120 T 400 80 V 200 H 0 Z" 
              fill="url(#chartGradient)" 
            />
          </svg>
        </div>
      </div>

      {/* --- Right: Developer Tip (Dark Card) --- */}
      <div className="col-span-4 bg-[#0A0A0B] border border-zinc-800 rounded-[32px] p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4">
            Developer Tip
          </p>
          <h4 className="text-[20px] font-bold leading-tight tracking-tight mb-10">
            Optimize your queries by <br /> 
            using <span className="text-blue-400">targeted fragments</span>.
          </h4>
          
          <a 
            href="#" 
            className="flex items-center gap-3 text-[13px] font-black text-blue-400 hover:text-blue-300 transition-all group"
          >
            Read Documentation 
            <span className="text-xl group-hover:translate-x-2 transition-transform">→</span>
          </a>
        </div>

        {/* Animated Corner Blur */}
        
        {/* <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-blue-600/20 rounded-full blur-[60px]" /> */}
      <div className="absolute -right-4 -bottom-4">
          <button className="w-14 h-14 bg-[#0062FF] text-white rounded-2xl shadow-2xl shadow-blue-400/50 flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
            {/* Custom SVG for the check-mark + circle icon seen in image */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default SystemHealthSection;