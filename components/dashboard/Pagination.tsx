'use client';
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalEntries: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsChange: (rows: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalEntries,
  rowsPerPage,
  onPageChange,
  onRowsChange,
}: PaginationProps) {
  const startEntry = (currentPage - 1) * rowsPerPage + 1;
  const endEntry = Math.min(currentPage * rowsPerPage, totalEntries);

  const pages = [1, 2, 3, '...', totalPages];

  return (
    <div className="px-8 py-6 bg-[#F8FAFC] border-t border-slate-100 flex items-center justify-between font-manrope">
      {/* Left: Showing entries */}
      <div className="text-[13px] text-slate-500 font-medium">
        Showing <span className="text-slate-900 font-bold">{startEntry} - {endEntry}</span> of <span className="text-slate-900 font-bold">{totalEntries}</span> entries
      </div>

      {/* Center & Right Wrapper */}
      <div className="flex items-center gap-8">
        {/* Navigation Controls */}
        <div className="flex items-center gap-1">
          {/* First Page */}
          <NavButton 
            onClick={() => onPageChange(1)} 
            disabled={currentPage === 1}
            icon={<path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" />} 
          />
          {/* Prev */}
          <NavButton 
            onClick={() => onPageChange(Math.max(1, currentPage - 1))} 
            disabled={currentPage === 1}
            icon={<polyline points="15 18 9 12 15 6" />} 
          />

          {/* Numbers */}
          <div className="flex items-center gap-1 mx-2">
            {pages.map((p, i) => (
              typeof p === 'number' ? (
                <button
                  key={i}
                  onClick={() => onPageChange(p)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                    currentPage === p 
                      ? 'bg-white text-blue-600 shadow-sm border border-slate-200' 
                      : 'text-slate-500 hover:bg-slate-200/50'
                  }`}
                >
                  {p}
                </button>
              ) : (
                <span key={i} className="px-2 text-slate-400 text-xs font-bold">...</span>
              )
            ))}
          </div>

          {/* Next */}
          <NavButton 
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} 
            disabled={currentPage === totalPages}
            icon={<polyline points="9 18 15 12 9 6" />} 
          />
          {/* Last */}
          <NavButton 
            onClick={() => onPageChange(totalPages)} 
            disabled={currentPage === totalPages}
            icon={<path d="M13 17l5-5-5-5M6 17l5-5-5-5" />} 
          />
        </div>

        {/* Right: Rows Selection */}
        <div className="flex items-center gap-3 border-l border-slate-200 pl-8">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Rows per page</span>
          <div className="relative">
            <select
              value={rowsPerPage}
              onChange={(e) => onRowsChange(Number(e.target.value))}
              className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold text-slate-900 outline-none cursor-pointer shadow-sm"
            >
              {[10, 25, 50].map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6"></path></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavButton({ icon, disabled, onClick }: { icon: React.ReactNode; disabled: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-2 rounded-lg transition-colors ${
        disabled ? 'opacity-20 cursor-not-allowed' : 'text-slate-400 hover:bg-white hover:text-blue-600 hover:shadow-sm'
      }`}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {icon}
      </svg>
    </button>
  );
}