'use client';

import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALBUMS } from '@/graphql/queries';
import { Sidebar } from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

export default function AlbumsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;

  const { data, loading, error } = useQuery(GET_ALBUMS, {
    variables: {
      options: {
        paginate: { page: currentPage, limit: limit }
      }
    }
  });

  const albums = data?.albums?.data || [];
  const totalCount = data?.albums?.meta?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / limit);

  if (error) return <div className="p-20 text-red-500">Error: {error.message}</div>;

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-manrope text-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="p-12">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-[32px] font-black text-slate-900 tracking-tight">Albums</h1>
              <p className="text-slate-500 text-sm mt-1">
                Curating {totalCount.toLocaleString()} digital collections.
              </p>
            </div>
            <button className="px-5 py-2.5 bg-blue-600 rounded-xl text-xs font-bold text-white shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95">
              + Create Album
            </button>
          </div>

          {/* Stats Dashboard */}
          <div className="grid grid-cols-4 gap-6 mb-10">
            <StatCard label="Total Collections" value={loading ? "..." : totalCount} trend="+12%" trendColor="text-blue-500" />
            <StatCard label="Active Users" value={loading ? "..." : "89"} subtext="Real-time" />
            <StatCard label="Cloud Status" value="Online" subtext="All systems go" />
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
               <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest block mb-4">Storage</span>
               <span className="text-3xl font-black text-slate-900">84%</span>
               <div className="w-full h-2 bg-slate-100 rounded-full mt-3"><div className="h-full bg-blue-600 rounded-full w-[84%]"></div></div>
            </div>
          </div>

          {/* Album Table */}
          <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm mb-12">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <tr>
                  <th className="px-8 py-5 w-24">ID</th>
                  <th className="px-4 py-5 w-32 text-center">Preview</th>
                  <th className="px-8 py-5">Album Title</th>
                  <th className="px-8 py-5">Owner</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr><td colSpan={5} className="py-20 text-center text-slate-400 font-bold">Loading albums...</td></tr>
                ) : (
                  albums.map((album: any) => (
                    <AlbumRow 
                      key={album.id}
                      id={`#${album.id.padStart(3, '0')}`}
                      title={album.title}
                      owner={album.user?.name || "Unknown User"}
                      imagePreviews={album.photos.data.map((p: any) => p.thumbnailUrl)}
                    />
                  ))
                )}
              </tbody>
            </table>
            
            {/* Pagination */}
            <div className="px-8 py-6 border-t border-slate-50 flex justify-between items-center bg-slate-50/20">
              <span className="text-xs text-slate-400 font-medium">
                Showing {(currentPage - 1) * limit + 1} to {Math.min(currentPage * limit, totalCount)} of {totalCount.toLocaleString()} albums
              </span>
              
              <div className="flex items-center gap-2">
                <button 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  className="p-2 text-slate-400 disabled:opacity-20 hover:text-slate-600 transition-colors"
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>

                {Array.from({ length: Math.min(3, totalPages) }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                      currentPage === pageNum 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                        : 'hover:bg-slate-100 text-slate-600'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                {totalPages > 4 && <span className="text-slate-300 mx-1">...</span>}

                {totalPages > 3 && (
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                      currentPage === totalPages 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                        : 'hover:bg-slate-100 text-slate-600'
                    }`}
                  >
                    {totalPages}
                  </button>
                )}

                <button 
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="p-2 text-slate-400 disabled:opacity-20 hover:text-slate-600 transition-colors"
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Recent Gallery Activity */}
          <section className="mt-12">
            <h3 className="text-xl font-extrabold text-slate-900 mb-6 tracking-tight">Recent Gallery Activity</h3>
            <div className="grid grid-cols-4 gap-6">
              <GalleryCard 
                title="Architecture Weekly" 
                subtitle="Curated by Leanne Graham" 
                img="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600"
              />
              <GalleryCard img="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600" />
              <GalleryCard img="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600" />
              <GalleryCard 
                title="Interiors Collective" 
                subtitle="Updated 12 mins ago" 
                img="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=600" 
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

// --- Sub Components ---

function GalleryCard({ title, subtitle, img }: any) {
  return (
    <div className="relative rounded-[32px] overflow-hidden group cursor-pointer h-64 shadow-sm">
      <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Gallery" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
      {title && (
        <div className="absolute bottom-6 left-6 right-6">
          <p className="text-white font-bold text-base leading-tight">{title}</p>
          <p className="text-white/60 text-[10px] mt-1 font-medium">{subtitle}</p>
        </div>
      )}
    </div>
  );
}

function AlbumRow({ id, title, owner, imagePreviews }: any) {
  return (
    <tr className="hover:bg-slate-50/30 transition-colors group">
      <td className="px-8 py-8 text-[11px] font-mono text-slate-400">{id}</td>
      <td className="px-4 py-8">
        <div className="flex justify-center -space-x-5 relative">
          {imagePreviews.length > 0 ? imagePreviews.map((imgUrl: string, index: number) => (
            <div 
              key={index} 
              className="w-12 h-12 rounded-xl border-2 border-white shadow-md overflow-hidden bg-slate-200 relative group-hover:scale-110 transition-all duration-300"
              style={{ zIndex: 10 - index }}
            >
              <img 
                src={imgUrl?.replace('http://', 'https://')} 
                alt="preview"
                className="w-full h-full object-cover block"
                loading="eager"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://picsum.photos/seed/${Math.random()}/150/150`;
                }}
              />
            </div>
          )) : (
            <div className="w-12 h-12 rounded-xl border-4 border-white shadow-lg bg-slate-100 flex items-center justify-center text-[10px] text-slate-400">Empty</div>
          )}
        </div>
      </td>
      <td className="px-8 py-8">
        <h4 className="text-[15px] font-extrabold text-slate-950 leading-tight group-hover:text-blue-600 transition-colors cursor-pointer">{title}</h4>
        <p className="text-[11px] text-slate-400 mt-1">Collection</p>
      </td>
      <td className="px-8 py-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] font-bold border border-blue-100">
            {owner.charAt(0)}
          </div>
          <span className="text-sm font-bold text-slate-700">{owner}</span>
        </div>
      </td>
      <td className="px-8 py-8 text-right">
         <button className="p-2 text-slate-300 hover:text-slate-600">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
         </button>
      </td>
    </tr>
  );
}

function StatCard({ label, value, trend, subtext, trendColor }: any) {
  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-4">{label}</span>
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-black text-slate-900 tracking-tight">{value}</span>
        {trend && <span className={`text-[11px] font-bold ${trendColor}`}>{trend}</span>}
        {subtext && <span className="text-[11px] font-medium text-slate-400">{subtext}</span>}
      </div>
    </div>
  );
}