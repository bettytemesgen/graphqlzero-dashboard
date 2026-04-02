import React from 'react';

export default function CodePreview() {
  return (
    <section className="w-full py-[96px] flex justify-center font-manrope">
      {/* Main Container */}
      <div className="max-w-[1280px] w-full bg-[#E1E9EE] rounded-[16px] overflow-hidden grid grid-cols-1 md:grid-cols-2 items-stretch">
        
        {/* Left Side: Content */}
        <div className="p-12 lg:p-16 flex flex-col gap-6 justify-center">
          <h2 className="text-[40px] font-[800] text-slate-900 tracking-[-1px] leading-[48px]">
            Code it in seconds.
          </h2>
          <p className="text-slate-600 text-[18px] leading-[28px] max-w-[440px]">
            Our GraphQL API is intuitive and follows best practices. Fetch exactly what you need, nothing more.
          </p>

          <div className="flex items-center gap-4 border border-slate-200 p-4 rounded-[16px] shadow-sm max-w-[344px]">
            <div className="w-12 h-12 flex items-center justify-center shrink-0 rounded-xl bg-blue-50 text-blue-600">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <div>
              <p className="font-bold text-slate-900 text-[16px]">Type-Safe schemas</p>
              <p className="text-[14px] text-slate-500">Compatible with Apollo, Relay, and urql.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Dark Editor */}
        <div className="bg-[#0F172A] relative flex flex-col">
          {/* Editor Header & Code Area */}
          <div className="p-8 md:p-12 pb-20">
            <div className="flex gap-1.5 mb-6">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
            </div>

            <div className="text-slate-500 font-mono text-[13px] mb-4">
              # Fetch user data and their associated posts
            </div>

            <pre className="text-[#38BDF8] font-mono text-[14px] leading-[22px] overflow-x-auto">
{`query {
  user(id: "1") {
    id
    username
    email
    posts(options: { paginate: { page: 1, limit: 5 } }) {
      data {
        id
        title
        body
      }
      meta {
        totalCount
      }
    }
  }
}`}
            </pre>
          </div>

          {/* Corrected Response Preview Bar - Matches image_d507cc.png */}
          <div className="absolute bottom-0 left-0 w-full h-[64px] border-t border-slate-800/50 flex items-center justify-between px-8 md:px-12 bg-[#0F172A]">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-[1.5px]">RESPONSE PREVIEW</span>
            <span className="text-[12px] font-extrabold text-[#4ADE80] font-mono">200 OK</span>
          </div>
        </div>
      </div>
    </section>
  );
}