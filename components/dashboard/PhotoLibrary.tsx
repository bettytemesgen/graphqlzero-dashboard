"use client";

import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PHOTOS } from "@/graphql/queries";

export default function PhotoLibrary() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 7;

  // 1. Fetch data using the same pattern as Todos
  const { data, loading, error } = useQuery(GET_PHOTOS, {
    variables: {
      options: {
        paginate: {
          page: currentPage,
          limit: limit,
        },
        // Note: If you add filtering later, it goes here under 'operator'
      },
    },
  });

  const photos = data?.photos?.data || [];
  const totalCount = data?.photos?.meta?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / limit);

  // 2. Handle Loading and Error states
  if (error)
    return (
      <div className="p-20 text-red-500 font-bold">
        Error loading photos: {error.message}
      </div>
    );

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen space-y-10 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <nav className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex gap-2">
            <span>DASHBOARD</span> <span className="opacity-50">/</span>{" "}
            <span className="text-blue-600">PHOTOS</span>
          </nav>
          <h1 className="text-[32px] font-black text-slate-900 tracking-tight">
            Image Library
          </h1>
          <p className="text-slate-500 text-sm mt-1 max-w-2xl font-medium">
            Manage your application’s visual assets. Showing {photos.length}{" "}
            items from the cloud.
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-[13px] font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95">
          <span className="text-lg leading-none">+</span> Upload Photo
        </button>
      </div>

      {/* Stats Grid - Now Dynamic */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard
          label="Total Assets Indexed"
          value={loading ? "..." : totalCount.toLocaleString()}
          trend="+12%"
          icon={
            <div className="p-2 bg-blue-50 rounded-lg">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2563eb"
                strokeWidth="2.5"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
          }
        />
        <StatCard
          label="Active View"
          value={photos.length}
          icon={
            <div className="p-2 bg-slate-50 rounded-lg">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#64748b"
                strokeWidth="2.5"
              >
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
          }
        />
        <StatCard
          label="Page"
          value={currentPage}
          icon={
            <div className="p-2 bg-slate-50 rounded-lg">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#64748b"
                strokeWidth="2.5"
              >
                <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
              </svg>
            </div>
          }
        />
        <StatCard
          label="Status"
          value="Online"
          icon={
            <div className="p-2 bg-slate-50 rounded-lg">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#64748b"
                strokeWidth="2.5"
              >
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
          }
        />
      </div>

      {/* Table Section */}
      <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm flex flex-col min-h-[550px]">
        <div className="overflow-x-auto flex-grow">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <tr>
                <th className="px-8 py-5">ID</th>
                <th className="px-4 py-5">Preview</th>
                <th className="px-8 py-5">Title</th>
                <th className="px-8 py-5">Album</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-8 py-20 text-center text-slate-400 font-bold"
                  >
                    Loading assets...
                  </td>
                </tr>
              ) : (
                photos.map((photo: any) => (
                  <tr
                    key={photo.id}
                    className="hover:bg-slate-50/30 transition-colors group"
                  >
                    <td className="px-8 py-7 text-[11px] font-mono text-slate-400 font-bold">
                      #{photo.id}
                    </td>
                    <td className="px-4 py-7">
                      <div className="w-16 h-12 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                        <img
                          // 1. Try the API URL first
                          src={photo.thumbnailUrl}
                          alt={photo.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          // 2. Use a different placeholder service if the first fails
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            if (
                              target.src !==
                              `https://picsum.photos/seed/${photo.id}/150/150`
                            ) {
                              target.src = `https://picsum.photos/seed/${photo.id}/150/150`;
                            }
                          }}
                        />{" "}
                      </div>
                    </td>
                    <td className="px-8 py-7">
                      <p className="text-[15px] font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight truncate max-w-[300px]">
                        {photo.title}
                      </p>
                      <p className="text-[10px] text-blue-500 font-bold mt-1.5 uppercase tracking-tighter">
                        CDN Reference: {photo.id}
                      </p>
                    </td>
                    <td className="px-8 py-7">
                      <span className="inline-flex px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-black uppercase tracking-wider">
                        {photo.album?.title ||
                          `Album ${photo.album?.id || "N/A"}`}
                      </span>
                    </td>
                    <td className="px-8 py-7 text-right">
                      <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors bg-transparent hover:bg-slate-100 rounded-lg">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3.5"
                        >
                          <circle cx="12" cy="5" r="1" />
                          <circle cx="12" cy="12" r="1" />
                          <circle cx="12" cy="19" r="1" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer - Functional */}
        <div className="px-8 py-6 border-t border-slate-100 flex justify-between items-center bg-slate-50/20">
          <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
            Showing {(currentPage - 1) * limit + 1} -{" "}
            {Math.min(currentPage * limit, totalCount)} of{" "}
            {totalCount.toLocaleString()}
          </span>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 disabled:opacity-20 transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <span className="text-xs font-black text-blue-600 px-4">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 disabled:opacity-20 transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, trend, icon }: any) {
  return (
    <div className="bg-white p-7 rounded-[28px] border border-slate-100 shadow-sm relative group overflow-hidden flex flex-col justify-between min-h-[160px]">
      <div className="flex justify-between items-start">
        {icon}
        {trend && (
          <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100/50">
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] block mb-1">
          {label}
        </p>
        <p className="text-[34px] font-black text-slate-900 tracking-tighter leading-none">
          {value}
        </p>
      </div>
    </div>
  );
}
