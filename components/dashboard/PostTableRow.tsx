'use client';

import React from 'react';

interface PostRowProps {
  id: string;
  title: string;
  body: string;
  author: string;
  email: string;
  initials: string;
  comments: number;
  tags?: string[];
  isActive?: boolean;
}

export function PostTableRow({ id, title, body, author, email, initials, comments, tags, isActive }: PostRowProps) {
  return (
    <tr className={`group transition-colors ${isActive ? 'bg-white' : 'hover:bg-slate-50/50'}`}>
      <td className="px-8 py-8 align-top font-mono text-[11px] text-slate-400">{id}</td>
      <td className="px-8 py-8 align-top max-w-xl">
        <h4 className={`font-bold text-[16px] mb-2 leading-snug tracking-tight ${isActive ? 'text-blue-600' : 'text-slate-900'}`}>
          {title}
        </h4>
        <p className="text-slate-500 text-[13px] line-clamp-2 leading-relaxed mb-4 font-medium">{body}</p>
        
        {tags && (
          <div className="flex gap-2 mb-4">
            {tags.map((tag) => (
              <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold uppercase rounded tracking-wider">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Top Comments Preview - Visible only on Active/Row #002 */}
        {isActive && (
          <div className="mt-6 bg-[#F8FAFC] border border-slate-100 rounded-xl p-5">
            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[1.5px] block mb-4">Top Comments Preview</span>
            <div className="space-y-4 border-l-2 border-blue-200 pl-4">
              <div>
                <p className="text-[12px] font-bold text-slate-900">id labore ex et quam laborum</p>
                <p className="text-[10px] text-slate-400 font-medium">by Eliseo@gardner.biz</p>
              </div>
              <div>
                <p className="text-[12px] font-bold text-slate-900">quo vero reiciendis velit similique earum</p>
                <p className="text-[10px] text-slate-400 font-medium">by Jayne_Kuhic@sydney.com</p>
              </div>
            </div>
            <button className="mt-4 text-[11px] font-bold text-blue-600 uppercase tracking-wider hover:underline">
              View all {comments} comments →
            </button>
          </div>
        )}
      </td>
      <td className="px-8 py-8 align-top">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-[11px]">
            {initials}
          </div>
          <div>
            <p className="text-[13px] font-bold text-slate-900 leading-none">{author}</p>
            <p className="text-[11px] text-slate-400 mt-1">{email}</p>
          </div>
        </div>
      </td>
      <td className="px-8 py-8 align-top text-center">
        <span className="text-[15px] font-bold text-slate-900 block">{comments}</span>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Comments</span>
      </td>
      <td className="px-8 py-8 align-top text-right">
        {isActive ? (
          <div className="flex flex-col items-end gap-2">
            <button className="bg-blue-600 text-white text-[10px] font-bold px-4 py-2 rounded-lg uppercase tracking-wider shadow-sm">
              Edit Post
            </button>
            <button className="text-red-500 text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
              Delete
            </button>
          </div>
        ) : (
          <button className="p-2 text-slate-300 hover:text-slate-600">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
          </button>
        )}
      </td>
    </tr>
  );
}