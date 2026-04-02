'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle Search Submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    console.log(`Searching for: ${searchQuery}`);
    // Replace with your search logic, e.g., router.push(`/search?q=${searchQuery}`)
  };

  // Keyboard shortcut listener (pressing '/' focuses the search bar)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="h-16 bg-white border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-50">
      
      {/* Search Section */}
      <form onSubmit={handleSearch} className="relative w-full max-w-sm group">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </span>
        <input 
          ref={inputRef}
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search across data architecture..." 
          className="w-full bg-[#F8FAFC] border border-slate-100 rounded-2xl pl-12 pr-12 py-2.5 text-sm focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 outline-none transition-all placeholder:text-slate-400 font-medium"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-bold text-slate-400 bg-white border border-slate-200 rounded-md">
            /
          </kbd>
        </div>
      </form>

      <div className="flex items-center gap-10">
        {/* Navigation Links */}
        <div className="flex gap-8 text-[13px] font-medium text-slate-600">
          <span className="cursor-pointer hover:text-blue-600 transition-colors">Docs</span>
          <span className="cursor-pointer hover:text-blue-600 transition-colors">API Status</span>
        </div>
        
        {/* Utilities & Profile */}
        <div className="flex items-center gap-6 border-l border-slate-100 pl-8">
          {/* Notification Bell */}
          <button className="text-slate-500 hover:text-slate-900 transition-colors relative">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></span>
          </button>

          {/* Help Circle */}
          <button className="text-slate-500 hover:text-slate-900 transition-colors">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </button>
          
          {/* Profile Section */}
          <div className="flex items-center gap-4 ml-2">
            <div className="text-right hidden sm:block">
              <p className="text-[13px] font-bold text-slate-900 leading-none">Ervin Howell</p>
              <p className="text-[11px] text-slate-400 font-medium mt-1.5">Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=256&h=256&q=80" 
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}