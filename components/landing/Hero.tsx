import Link from 'next/link';

export default function Hero() {
  return (
    <section className="max-w-[1280px] mx-auto px-8 pt-24 pb-20 flex flex-col lg:flex-row items-center gap-16 font-manrope">
      <div className="flex-1">
        <div className="inline-flex items-center px-3 py-1 bg-[#E0E7FF] rounded-md mb-6">
          <span className="text-[#0061FF] text-[11px] font-extrabold uppercase tracking-[1.2px]">The Developer's Choice</span>
        </div>
        <h1 className="text-[72px] font-[800] leading-[72px] tracking-[-1.8px] text-slate-900">
          The API for your <br /> <span className="text-[#0061FF]">next big idea.</span>
        </h1>
        <p className="mt-8 text-[18px] text-slate-500 max-w-lg leading-relaxed">
          Access mock data for users, posts, and more through a powerful GraphQL endpoint. Zero setup, infinite scale.
        </p>
        <div className="mt-10 flex gap-4">
          <Link href="/dashboard/users" className="bg-[#0061FF] text-white px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity">
            Go to Dashboard
          </Link>
          <button className="bg-slate-100 text-slate-600 px-8 py-4 rounded-xl font-bold hover:bg-slate-200 transition-colors">
            Read Docs
          </button>
        </div>
      </div>
      <div className="flex-1 w-full bg-white border border-slate-100 rounded-[32px] p-10 shadow-2xl relative">
        <div className="flex gap-1.5 mb-6">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <pre className="text-[#0061FF] font-mono text-sm leading-relaxed overflow-x-auto">
{`query {
  user(id: 1) {
    name
    email
    posts {
      data {
        title
      }
    }
  }
}`}
        </pre>
        <div className="absolute -bottom-6 right-8 bg-white p-4 rounded-2xl shadow-lg border border-slate-50 flex items-center gap-3">
          <span className="text-blue-600">⚡</span>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Response Time</p>
            <p className="text-xl font-black text-slate-900">12ms</p>
          </div>
        </div>
      </div>
    </section>
  );
}