import Link from 'next/link';
import Image from 'next/image'; // Required import for the logo

export default function Navbar() {
  return (
    <nav className="w-full h-[72px] flex items-center justify-center border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="max-w-[1280px] w-full px-8 flex items-center justify-between">
        
        {/* Brand Identity Unit */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#0053DB] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
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
          <span className="font-black text-xl tracking-tight text-slate-900">
            GraphQLZero
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-2">
          {['Docs', 'Schema', 'Examples', 'Playground'].map((item) => (
            <Link 
              key={item} 
              href="#" 
              className="px-6 py-2 text-[16px] font-semibold tracking-[-0.4px] text-slate-500 hover:text-blue-600 transition-all"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <Link 
          href="/dashboard/users" 
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
        >
          Go to Dashboard
        </Link>
      </div>
    </nav>
  );
}