'use client';

import React, { useState, useEffect } from 'react';

export default function CommentManager() {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState('All'); // New filter state
  
  const itemsPerPage = 5;
  const totalItems = 500; 
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        // Fetching data - in a real app, you might send the filter to the API
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/comments?_page=${currentPage}&_limit=${itemsPerPage}`
        );
        let data = await response.json();

        // SIMULATION: If filter isn't 'All', we manipulate the data to simulate "Unread" or "Flagged"
        if (activeFilter === 'Unread') {
          data = data.filter((_: any, i: number) => i % 2 === 0);
        } else if (activeFilter === 'Flagged') {
          data = data.filter((_: any, i: number) => i % 3 === 0);
        }

        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [currentPage, activeFilter]); // Refetch when page OR filter changes

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-[32px] font-black text-slate-900 tracking-tight">
            Comments <span className="text-blue-600 font-medium text-lg ml-2">/ {totalItems} total</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1 max-w-md">
            Manage and curate community feedback across all editorial posts. Utilize inline inspection for content moderation.
          </p>
        </div>
        
        {/* TAB FILTERS */}
        <div className="flex bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
          {['All', 'Unread', 'Flagged'].map((tab) => (
            <button 
              key={tab} 
              onClick={() => {
                setActiveFilter(tab);
                setCurrentPage(1); // Reset to page 1 when filtering
              }}
              className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
                activeFilter === tab 
                ? 'bg-blue-600 text-white' 
                : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-8">
        {/* Left Sidebar Filters */}
        <aside className="w-64 flex flex-col gap-6">
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
             <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">Post Association</label>
             <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 outline-none focus:ring-2 ring-blue-100">
                <option>All Post IDs</option>
             </select>

             <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mt-6 mb-3">Date Range</label>
             <div className="space-y-2">
                {['Last 24 Hours', 'Last 7 Days', 'Custom Range'].map(range => (
                  <button key={range} className="w-full text-left p-3 border border-slate-100 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors">
                    {range}
                  </button>
                ))}
             </div>

             <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mt-6 mb-3">Quick Stats</label>
             <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50/50 p-4 rounded-xl text-center border border-blue-50">
                   <p className="text-[8px] font-bold text-blue-400 uppercase mb-1">Avg/Day</p>
                   <p className="text-xl font-black text-blue-600">42.8</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl text-center border border-slate-100">
                   <p className="text-[8px] font-bold text-slate-400 uppercase mb-1">Sentiment</p>
                   <p className="text-xl font-black text-slate-700">92%</p>
                </div>
             </div>
          </div>

          <div className="bg-slate-950 rounded-2xl p-6 text-white relative overflow-hidden">
             <div className="relative z-10">
               <h4 className="text-sm font-bold mb-2">Need a custom query?</h4>
               <p className="text-[10px] text-slate-400 mb-4 leading-relaxed">Use the GraphQL Explorer to build complex filters on comments.</p>
               <button className="text-[10px] font-bold flex items-center gap-2 hover:gap-3 transition-all">
                 Open Explorer <span className="text-lg">→</span>
               </button>
             </div>
             <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-slate-800 rounded-full blur-2xl opacity-50" />
          </div>
        </aside>

        {/* Main Table Content */}
        <div className="flex-1 bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm flex flex-col">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <tr>
                <th className="px-8 py-5">ID</th>
                <th className="px-8 py-5">Author</th>
                <th className="px-8 py-5">Email Address</th>
                <th className="px-8 py-5">Excerpt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={4} className="px-8 py-7"><div className="h-4 bg-slate-100 rounded w-full"></div></td>
                  </tr>
                ))
              ) : comments.length > 0 ? (
                comments.map((comment, index) => (
                  <CommentRow 
                    key={comment.id}
                    id={`#${comment.id}`} 
                    author={comment.name.split(' ')[0]} 
                    email={comment.email} 
                    excerpt={comment.body.substring(0, 35) + "..."}
                    fullBody={comment.body}
                    isOpen={index === 0 && currentPage === 1} 
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center text-slate-400 text-sm font-medium">
                    No {activeFilter.toLowerCase()} comments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
          {/* PAGINATION FOOTER */}
          <div className="mt-auto px-8 py-6 flex justify-between items-center bg-slate-50/20 border-t border-slate-50">
            <span className="text-xs text-slate-400 font-medium">
              Showing {startItem} - {endItem} of {totalItems} comments
            </span>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1 || loading}
                className="p-2 text-slate-400 hover:text-slate-600 disabled:opacity-20 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M15 18l-6-6 6-6"/></svg>
              </button>

              {[currentPage, currentPage + 1, currentPage + 2].filter(p => p <= totalPages).map(page => (
                <button 
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                    currentPage === page 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-110' 
                    : 'hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  {page}
                </button>
              ))}

              <span className="text-slate-300 px-1 text-xs font-bold">...</span>

              <button 
                onClick={() => setCurrentPage(totalPages)}
                className={`w-10 h-8 rounded-lg text-xs font-bold transition-all ${
                  currentPage === totalPages 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                  : 'hover:bg-slate-100 text-slate-600'
                }`}
              >
                {totalPages}
              </button>

              <button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages || loading}
                className="p-2 text-slate-400 hover:text-slate-600 disabled:opacity-20 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommentRow({ id, author, email, excerpt, fullBody, isOpen = false }: any) {
  const [open, setOpen] = React.useState(isOpen);
  
  return (
    <>
      <tr 
        onClick={() => setOpen(!open)}
        className={`hover:bg-slate-50/30 transition-colors cursor-pointer ${open ? 'bg-slate-50/50' : ''}`}
      >
        <td className="px-8 py-7 text-[11px] font-mono text-slate-400">{id}</td>
        <td className="px-8 py-7 text-sm font-bold text-slate-900">{author}</td>
        <td className="px-8 py-7 text-sm font-bold text-blue-600 underline underline-offset-4 decoration-blue-100">{email}</td>
        <td className="px-8 py-7 text-xs text-slate-400 font-medium">{excerpt}</td>
      </tr>
      {open && (
        <tr className="animate-in fade-in slide-in-from-top-2 duration-300">
          <td colSpan={4} className="px-8 pb-8 pt-0 bg-slate-50/50">
            <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm flex gap-6">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <div className="flex-1">
                 <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Full Message Body</p>
                 <p className="text-sm text-slate-600 leading-relaxed italic mb-4">
                   "{fullBody}"
                 </p>
                 <div className="flex gap-4">
                    <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-800 transition-colors">Approve</button>
                    <button className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:text-red-800 transition-colors">Delete</button>
                    <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors">Mark as Spam</button>
                 </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}