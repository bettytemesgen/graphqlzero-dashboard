import React from 'react';
import Image from 'next/image'; // ✅ REQUIRED Import for images

export default function Growth() {
  return (
    <section className="w-full bg-white py-24 flex justify-center font-manrope">
      <div className="max-w-[1280px] w-full px-8">
        
        {/* Header Section */}
        <div className="mb-16">
          <h2 className="text-[40px] font-[800] text-slate-900 tracking-[-1px] leading-tight">
            Engineered for Curated Growth.
          </h2>
          <p className="text-slate-500 text-lg mt-4 max-w-2xl">
            Skip the backend boilerplate and start building your frontend with real relationships and low latency.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Interconnected Data (Large) */}
          <div className="md:col-span-2 bg-[#F8FAFC] rounded-[32px] p-10 border border-slate-100 flex flex-col justify-between min-h-[400px]">
            <div>
              {/* ✅ UPDATED: Icon is now an Image */}
              <div className="w-12 h-12 bg-[#D5E3FC] rounded-xl flex items-center justify-center mb-8 relative">
                 <Image 
                    src="/icons/Container.svg" // Adjust path to your image
                    alt="Relational Data Icon"
                    width={24}
                    height={24}
                 />
              </div>
              <h3 className="text-2xl font-[800] text-slate-900 mb-4">Interconnected Data (Relational)</h3>
              <p className="text-slate-500 leading-relaxed max-w-md">
                Our schema isn't just flat lists. Explore deep relationships between users, posts, and comments to build complex nested UIs instantly.
              </p>
            </div>
            <div className="mt-8 h-32 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl border border-indigo-100/50" />
          </div>

          {/* Card 2: 6 Real-time Entities */}
          <div className="bg-white rounded-[32px] p-10 border border-slate-100 shadow-sm">
            {/* ✅ UPDATED: Icon is now an Image */}
            <div className="w-12 h-12 bg-[#D5E3FC] rounded-xl flex items-center justify-center mb-8 relative">
              <Image 
                    src="/icons/Container-2.svg" // Adjust path to your image
                    alt="Database Icon"
                    width={24}
                    height={24}
                 />
            </div>
            <h3 className="text-2xl font-[800] text-slate-900 mb-6">6 Real-time Entities</h3>
            <ul className="space-y-4">
              {['Users & Posts', 'Comments & Todos', 'Albums & Photos'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-600 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Card 3: Developer-First Tooling (Dark) */}
          <div className="bg-[#0F172A] rounded-[32px] p-10 text-white md:col-span-1 flex flex-col justify-end min-h-[320px]">
             {/* ✅ UPDATED: Icon is now an Image */}
             <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-8 relative">
                <Image 
                    src="/icons/Container-3.svg" // Adjust path to your image
                    alt="Code Icon"
                    width={24}
                    height={24}
                 />
             </div>
             <h3 className="text-2xl font-[800] mb-4 tracking-tight">Developer-First Tooling</h3>
             <p className="text-slate-400 text-sm leading-relaxed">
               Integrated GraphQL playground, comprehensive type definitions, and auto-generated documentation for every endpoint.
             </p>
          </div>

          {/* Card 4: Global Edge Network */}
          <div className="bg-white rounded-[32px] p-10 border border-slate-100 shadow-sm md:col-span-2">
            {/* ✅ UPDATED: Icon is now an Image */}
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-8 relative">
                <Image 
                    src="/icons/Container-4.svg" // Adjust path to your image
                    alt="Globe Icon"
                    width={24}
                    height={24}
                 />
            </div>
            <h3 className="text-2xl font-[800] text-slate-900 mb-4">Global Edge Network</h3>
            <p className="text-slate-500 leading-relaxed max-w-lg">
              Powered by a globally distributed infrastructure. Get sub-50ms response times from anywhere in the world, guaranteed.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}