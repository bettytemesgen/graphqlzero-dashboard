'use client';

import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '@/graphql/queries'; // Ensure this query exists
import { Sidebar } from '@/components/dashboard/Sidebar';
import Pagination from '@/components/dashboard/Pagination';
import Header from '@/components/dashboard/Header';
import { SystemStats } from '@/components/dashboard/SystemStats';

export default function PostsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Fetch data from API
  const { data, loading, error } = useQuery(GET_POSTS, {
    variables: {
      options: {
        paginate: { page: currentPage, limit: rowsPerPage },
        search: { q: searchQuery }
      }
    }
  });

  const posts = data?.posts?.data || [];
  const totalRecords = data?.posts?.meta?.totalCount || 0;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  if (error) return <div className="p-20 text-red-500 font-bold">Error: {error.message}</div>;

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-manrope">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="p-12">
          {/* Page Title Section */}
          <div className="flex justify-between items-end mb-10">
            <div>
              <h1 className="text-[36px] font-black text-slate-900 tracking-[-1.5px] leading-tight">
                Editorial Posts
              </h1>
              <p className="text-slate-500 text-[16px] mt-1">
                Managing the foundational data nodes of GraphQLZero.
              </p>
            </div>
            
            <div className="flex bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
              <button className="px-5 py-2 text-xs font-bold text-blue-600 bg-blue-50 rounded-md shadow-sm">
                Table View
              </button>
              <button className="px-5 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 transition-colors">
                Grid View
              </button>
            </div>
          </div>

          {/* Filtering & Stats Row */}
          <div className="grid grid-cols-12 gap-6 mb-10">
            <div className="col-span-8 bg-white border border-slate-200 rounded-[20px] p-8 grid grid-cols-2 gap-8 shadow-sm">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[1.5px] block mb-3">Title Query</label>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search post titles..." 
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all" 
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[1.5px] block mb-3">Author Entity</label>
                <select className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm bg-white outline-none focus:border-blue-500 transition-all cursor-pointer">
                  <option>All Users</option>
                </select>
              </div>
            </div>
            
            <div className="col-span-4 bg-blue-50 border border-blue-100 rounded-[20px] p-8 relative overflow-hidden group flex flex-col justify-center shadow-sm">
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-[1.5px] relative z-10">Total Records</span>
              <div className="flex items-baseline gap-3 mt-1 relative z-10">
                <span className="text-4xl font-black text-blue-700 tracking-[-1px]">
                  {loading ? "..." : totalRecords.toLocaleString()}
                </span>
                <span className="text-[9px] font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-md uppercase">
                  Live Sync
                </span>
              </div>
              <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-blue-200/20 rounded-full group-hover:scale-110 transition-transform duration-500" />
            </div>
          </div>

          {/* Table Architecture */}
          <div className="bg-white border border-slate-200 rounded-[24px] overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/70 border-b border-slate-200 text-[9px] font-bold text-slate-400 uppercase tracking-[1.5px]">
                <tr>
                  <th className="px-8 py-5 w-20">ID</th>
                  <th className="px-8 py-5">Content Architecture</th>
                  <th className="px-8 py-5">Author</th>
                  <th className="px-8 py-5 text-center">Interactions</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr><td colSpan={5} className="py-20 text-center text-slate-400 italic">Data stream connecting...</td></tr>
                ) : (
                  posts.map((post: any) => (
                    <TableRow 
                      key={post.id}
                      id={`#${post.id.padStart(3, '0')}`}
                      title={post.title}
                      body={post.body}
                      author={post.user?.name || "Guest Author"}
                      email={post.user?.email || "no-reply@zero.io"}
                      initials={post.user?.name?.split(' ').map((n: string) => n[0]).join('') || "GA"}
                      comments={post.comments?.meta?.totalCount || 0}
                      // For UI variety, we show preview only for the first item
                      showCommentsPreview={posts.indexOf(post) === 0}
                      topComments={post.comments?.data?.slice(0, 2) || []}
                    />
                  ))
                )}
              </tbody>
            </table>

            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              totalEntries={totalRecords}
              rowsPerPage={rowsPerPage}
              onPageChange={setCurrentPage}
              onRowsChange={(val) => {
                setRowsPerPage(val);
                setCurrentPage(1);
              }}
            />
          </div>
          
          <SystemStats />
        </main>
      </div>
    </div>
  );
}

function TableRow({ id, title, body, author, email, initials, comments, tags, showCommentsPreview, topComments }: any) {
  return (
    <tr className="hover:bg-slate-50/50 transition-colors group">
      <td className="px-8 py-10 align-top font-mono text-[10px] text-slate-400">{id}</td>
      <td className="px-8 py-10 align-top max-w-lg">
        <h4 className="font-extrabold text-slate-900 mb-2 leading-snug text-[15px] tracking-tight group-hover:text-blue-600 transition-colors capitalize">
          {title}
        </h4>
        <p className="text-slate-500 text-[13px] line-clamp-2 leading-relaxed mb-5 font-medium">{body}</p>
        
        {showCommentsPreview && topComments?.length > 0 && (
          <div className="mt-6 bg-[#F8FAFC] border border-slate-100 rounded-xl p-6">
            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[1.5px] block mb-4">Top Comments Preview</span>
            <div className="space-y-4 border-l-2 border-blue-200 pl-4 ml-1">
              {topComments.map((comment: any) => (
                <div key={comment.id}>
                  <p className="text-[12px] font-bold text-slate-900 line-clamp-1">{comment.name}</p>
                  <p className="text-[10px] text-slate-400 font-medium">by {comment.email}</p>
                </div>
              ))}
            </div>
            <button className="mt-4 text-[10px] font-bold text-blue-600 uppercase tracking-wider hover:underline">
              View all {comments} comments →
            </button>
          </div>
        )}
      </td>
      <td className="px-8 py-10 align-top">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-[11px] border border-indigo-100 shadow-sm">
            {initials}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900 leading-none">{author}</p>
            <p className="text-[10px] text-slate-400 mt-1 font-medium">{email}</p>
          </div>
        </div>
      </td>
      <td className="px-8 py-10 align-top text-center">
        <div className="flex flex-col items-center justify-center">
          <span className="text-xl font-black text-slate-900 leading-none">{comments}</span>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Comments</span>
        </div>
      </td>
      <td className="px-8 py-10 align-top text-right">
        <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <circle cx="12" cy="5" r="1"></circle>
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="12" cy="19" r="1"></circle>
          </svg>
        </button>
      </td>
    </tr>
  );
}