import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-white pt-24 pb-16 flex justify-center font-manrope">
      <div className="max-w-[1280px] w-full px-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row justify-between items-start border-t border-slate-100 pt-12">
          
          {/* Left Side: Brand & Copyright */}
          <div className="flex flex-col gap-4">
            <h3 className="font-[800] text-[20px] text-slate-900 tracking-tight">
              GraphQLZero
            </h3>
            <div className="text-slate-400 text-[14px] leading-relaxed max-w-[300px]">
              <p>© 2024 GraphQLZero. Built for the Graph.</p>
              <p>Providing the infrastructure for modern web exploration.</p>
            </div>
          </div>

          {/* Right Side: Links and Metadata */}
          <div className="flex flex-col items-end gap-10 mt-8 md:mt-0">
            {/* Links Horizontal Row */}
            <div className="flex gap-8 text-[14px] text-slate-500 font-medium">
              <a href="#" className="hover:text-blue-600 transition-colors">Status</a>
              <a href="#" className="hover:text-blue-600 transition-colors">GitHub</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Twitter</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
            </div>

            {/* Bottom metadata tags */}
            <div className="flex items-center gap-4 text-[11px] font-bold text-slate-400 uppercase tracking-[1.5px]">
              <span>Zero Configuration</span>
              <span className="text-slate-300">•</span>
              <span>Global Edge</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}