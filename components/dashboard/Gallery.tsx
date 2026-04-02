import React from 'react';

// Sub-component for individual cards
function GalleryCard({ title, subtitle, img }: { title?: string; subtitle?: string; img: string }) {
  return (
    <div className="relative rounded-[32px] overflow-hidden group cursor-pointer h-64 shadow-sm">
      <img 
        src={img} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        alt={title || "Gallery Image"} 
      />
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

export function RecentGallery() {
  const activities = [
    {
      title: "Architecture Weekly",
      subtitle: "Curated by Leanne Graham",
      img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600"
    },
    {
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600"
    },
    {
      img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600"
    },
    {
      title: "Interiors Collective",
      subtitle: "Updated 12 mins ago",
      img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=600"
    }
  ];

  return (
    <section className="mt-12">
      <h3 className="text-xl font-extrabold text-slate-900 mb-6 tracking-tight">
        Recent Gallery Activity
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {activities.map((item, index) => (
          <GalleryCard 
            key={index}
            title={item.title}
            subtitle={item.subtitle}
            img={item.img}
          />
        ))}
      </div>
    </section>
  );
}