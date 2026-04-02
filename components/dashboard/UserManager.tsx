'use client';

import React, { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '@/graphql/queries';

export default function UserManager() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeRole, setActiveRole] = useState('ALL ROLES');
  const limit = 10;

  const { data, loading, error } = useQuery(GET_USERS, {
    variables: {
      options: {
        paginate: { page: currentPage, limit: limit }
      }
    }
  });

  const rawUsers = data?.users?.data || [];

  // --- CLIENT-SIDE FILTER LOGIC ---
  // We simulate roles based on ID for the demo since the API doesn't provide them.
  const filteredUsers = useMemo(() => {
    if (activeRole === 'ALL ROLES') return rawUsers;
    
    return rawUsers.filter((user: any) => {
      const isEven = parseInt(user.id) % 2 === 0;
      if (activeRole === 'ADMINS') return isEven;
      if (activeRole === 'EDITORS') return !isEven;
      return true;
    });
  }, [rawUsers, activeRole]);

  const totalCount = data?.users?.meta?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / limit);

  if (error) return <div className="p-20 text-red-500 font-bold">Error loading directory: {error.message}</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-700 font-manrope">
      {/* Search & Filter Header */}
      <div className="bg-white rounded-[32px] border border-slate-100 p-6 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-2xl text-[10px] font-black text-slate-500 uppercase tracking-wider hover:bg-slate-50 shadow-sm transition-all">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M3 6h18M6 12h12M10 18h4"/></svg>
            Advanced Filters
          </button>

          <div className="flex bg-slate-100/50 p-1 rounded-2xl border border-slate-100">
            {['ALL ROLES', 'ADMINS', 'EDITORS'].map((role) => (
              <button
                key={role}
                onClick={() => { setActiveRole(role); setCurrentPage(1); }}
                className={`px-6 py-2 text-[10px] font-black rounded-xl transition-all ${
                  activeRole === role ? 'bg-white text-blue-600 shadow-md' : 'text-slate-400'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-widest mr-2">Export:</span>
            <button className="p-2 border border-slate-100 rounded-lg hover:bg-slate-50"><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg></button>
            <button className="p-2 border border-slate-100 rounded-lg hover:bg-slate-50"><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4"/></svg></button>
        </div>
      </div>

      {/* Main Data Table */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="text-[10px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-50">
            <tr>
              <th className="px-10 py-6">ID</th>
              <th className="px-6 py-6">Curator / Username</th>
              <th className="px-6 py-6">Contact Points</th>
              <th className="px-6 py-6">Website</th>
              <th className="px-6 py-6">Affiliation & Locale</th>
              <th className="px-10 py-6 text-center">Engagement</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loading ? (
              <tr><td colSpan={6} className="py-20 text-center text-slate-400 font-bold italic">Refreshing Data Architecture...</td></tr>
            ) : filteredUsers.length === 0 ? (
              <tr><td colSpan={6} className="py-20 text-center text-slate-400 font-bold italic">No matching curators found on this page.</td></tr>
            ) : (
              filteredUsers.map((user: any) => (
                <tr key={user.id} className="group hover:bg-slate-50/50 transition-all cursor-pointer">
                  <td className="px-10 py-8 text-[11px] font-mono text-blue-500 font-bold">
                    #{user.id.padStart(3, '0')}
                  </td>
                  <td className="px-6 py-8">
                    <div className="flex items-center gap-4">
                      <img src={`https://i.pravatar.cc/150?u=${user.id}`} className="w-12 h-12 rounded-2xl object-cover shadow-sm ring-2 ring-white" alt="" />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">{user.name}</p>
                          <span className={`text-[8px] px-1.5 py-0.5 rounded-md font-black uppercase ${parseInt(user.id) % 2 === 0 ? 'bg-indigo-50 text-indigo-500' : 'bg-emerald-50 text-emerald-500'}`}>
                            {parseInt(user.id) % 2 === 0 ? 'Admin' : 'Editor'}
                          </span>
                        </div>
                        <p className="text-[11px] font-bold text-slate-400 tracking-tight">@{user.username}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-8">
                    <div className="space-y-1 text-slate-500 font-bold text-xs">
                      <div className="flex items-center gap-2">
                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="opacity-40"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                        {user.email}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400">
                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="opacity-40"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                        {user.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-8">
                    <span className="text-xs font-black text-blue-500 hover:underline">{user.website}</span>
                  </td>
                  <td className="px-6 py-8">
                    <div className="text-xs font-bold text-slate-600">
                      Romaguera-Crona
                      <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <svg width="10" height="10" fill="currentColor" viewBox="0 0 24 24" className="opacity-30"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/></svg>
                        Gwenborough
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex justify-center gap-6 text-center">
                      <div><p className="text-sm font-black text-slate-900">{user.posts?.meta?.totalCount || 0}</p><p className="text-[9px] font-bold text-slate-400 uppercase">Posts</p></div>
                      <div><p className="text-sm font-black text-slate-900">{user.albums?.meta?.totalCount || 0}</p><p className="text-[9px] font-bold text-slate-400 uppercase">Albums</p></div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Footer Pagination */}
        <div className="px-10 py-8 border-t border-slate-50 flex items-center justify-between bg-slate-50/20">
          <span className="text-[11px] text-slate-400 font-bold italic">
            Showing {(currentPage - 1) * limit + 1}-{Math.min(currentPage * limit, totalCount)} of {totalCount.toLocaleString()} curators
          </span>

          <div className="flex items-center gap-4">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="text-slate-300 hover:text-blue-600 disabled:opacity-20 transition-all">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <div className="flex gap-2">
              {[1, 2, 3].map(p => (
                <button 
                  key={p} 
                  onClick={() => setCurrentPage(p)}
                  className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${currentPage === p ? 'bg-blue-600 text-white shadow-xl shadow-blue-200' : 'text-slate-400 hover:bg-slate-100'}`}
                >
                  {p}
                </button>
              ))}
              <span className="text-slate-200 self-center font-black">...</span>
              <button className="w-10 h-10 rounded-xl text-xs font-black text-slate-400 hover:bg-slate-100">129</button>
            </div>
            <button disabled={currentPage >= totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className="text-slate-400 hover:text-blue-600 disabled:opacity-20 transition-all">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}