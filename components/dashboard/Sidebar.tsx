'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <aside className="w-64 bg-[#0B0F10] flex flex-col shrink-0 border-r border-slate-800/50 h-screen sticky top-0">
      <div className="p-6">
        {/* --- Branding Section --- */}
    {/* Branding */}
<div className="flex items-center gap-4 mb-10 px-2">
  {/* The Outer Box (48px x 48px) */}
  <div className="w-12 h-12 bg-[#0053DB] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
    
    {/* The Image Wrapper (Controls the actual logo size: 32px) */}
    <div className="relative w-8 h-8">
      <Image 
        src="/icons/logo-1.svg" 
        alt="GraphQLZero Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
    
  </div>

  <div className="flex flex-col">
    <span className="text-white font-black tracking-tight text-base leading-none">
      GraphQLZero
    </span>
    <span className="text-slate-500 text-[9px] font-bold uppercase tracking-[2px] mt-1.5">
      Admin Console
    </span>
  </div>
</div>
        {/* ------------------------ */}

        {/* Navigation */}
        <nav className="space-y-1">
          <NavItem 
            href="/dashboard" 
            label="Dashboard" 
            icon="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
            active={isActive('/dashboard')} 
          />
          <NavItem 
            href="/dashboard/users" 
            label="Users" 
            icon="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" 
            active={isActive('/dashboard/users')} 
          />
          <NavItem 
            href="/dashboard/posts" 
            label="Posts" 
            icon="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10l4 4v10a2 2 0 0 1-2 2z" 
            active={isActive('/dashboard/posts')} 
          />
          <NavItem 
            href="/dashboard/comments" 
            label="Comments" 
            icon="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10l4 4v10a2 2 0 0 1-2 2z" 
            active={isActive('/dashboard/comments')} 
          />
          <NavItem 
            href="/dashboard/albums" 
            label="Albums" 
            icon="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" 
            active={isActive('/dashboard/albums')} 
          />
          <NavItem 
            href="/dashboard/photos" 
            label="Photos" 
            icon="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2z M8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z M21 15l-5-5L5 21" 
            active={isActive('/dashboard/photos')} 
          />
          <NavItem 
            href="/dashboard/todos" 
            label="Todos" 
            icon="M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3" 
            active={isActive('/dashboard/todos')} 
          />
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="mt-auto p-6 space-y-6">
        <button className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-black rounded-xl transition-all shadow-lg shadow-blue-900/40 uppercase tracking-wider flex items-center justify-center gap-2">
          <span className="text-lg leading-none">+</span> New Request
        </button>
        
        <div className="space-y-4 px-2">
          <SettingsItem label="Settings" icon="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0 M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83a2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33a1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2a2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0a2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2a2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83a2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2a2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0a2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2a2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          <SettingsItem label="Support" icon="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0 M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3 M12 17l0 .01" />
        </div>
      </div>
    </aside>
  );
}

function NavItem({ href, label, icon, active = false }: { href: string; label: string; icon: string; active?: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${
        active 
          ? 'bg-blue-600/15 text-blue-500 border-r-4 border-blue-500 rounded-r-none' 
          : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d={icon} />
      </svg>
      <span className="text-[11px] font-black uppercase tracking-[1.5px]">{label}</span>
    </Link>
  );
}

function SettingsItem({ label, icon }: { label: string, icon: string }) {
  return (
    <div className="flex items-center gap-3 text-slate-500 text-[10px] font-black uppercase tracking-[1.5px] cursor-pointer hover:text-white transition-colors">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d={icon} />
      </svg>
      {label}
    </div>
  );
}