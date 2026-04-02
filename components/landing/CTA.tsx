import React from 'react';
import Link from 'next/link';

export default function CTA() {
  return (
    <section className="w-full py-[120px] bg-white flex flex-col items-center text-center font-manrope">
      <h2 className="text-[48px] font-[800] text-slate-900 tracking-[-1.5px] leading-tight mb-6">
        Ready to build?
      </h2>
      <p className="text-slate-500 text-[18px] max-w-[600px] leading-relaxed mb-10 px-4">
        Join thousands of developers using GraphQLZero for their prototypes, tutorials, and test suites.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/dashboard/users" 
          className="bg-[#0061FF] text-white px-10 py-4 rounded-xl font-bold text-[16px] hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
        >
          Go to Dashboard
        </Link>
        <Link 
          href="#" 
          className="bg-[#F1F5F9] text-slate-600 px-10 py-4 rounded-xl font-bold text-[16px] hover:bg-slate-200 transition-all"
        >
          Explore Playground
        </Link>
      </div>
    </section>
  );
}