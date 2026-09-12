import React from 'react';

const PGCard = ({ pg, isSelected, onClick, isOwner, onDelete }) => {
  const avgRating = pg.reviews?.length > 0 
    ? (pg.reviews.reduce((acc, curr) => acc + curr.rating, 0) / pg.reviews.length).toFixed(1)
    : null;

  return (
    <div 
      onClick={onClick}
      className={`glass-card rounded-3xl overflow-hidden transition-all duration-500 cursor-pointer group relative ${
        isSelected ? 'ring-4 ring-primary shadow-2xl shadow-primary/20 scale-[1.02]' : 'hover:shadow-xl hover:shadow-indigo-500/10 border border-white/40'
      }`}
    >
      <div className="relative h-56 overflow-hidden">
        <img 
          src={pg.image || "https://images.unsplash.com/photo-1555854817-5b2738f7514d?auto=format&fit=crop&q=80&w=800"} 
          alt={pg.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg backdrop-blur-md border border-white/20 ${
                pg.availability === 'Available' ? 'bg-emerald-500/90 text-white' : 'bg-rose-500/90 text-white'
            }`}>
                {pg.availability}
            </span>
            {avgRating && (
                <span className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-black shadow-lg flex items-center gap-1 text-on-surface">
                    <span className="material-symbols-outlined text-yellow-400 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    {avgRating} / 5
                </span>
            )}
        </div>
        
        {isOwner && (
            <button 
                onClick={(e) => { e.stopPropagation(); onDelete(pg.id); }}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-rose-500 shadow-xl flex items-center justify-center text-white hover:bg-rose-600 transition-colors opacity-0 group-hover:opacity-100 duration-300"
            >
                <span className="material-symbols-outlined text-xl">delete</span>
            </button>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-headline font-extrabold text-on-surface group-hover:text-primary transition-colors">{pg.name}</h3>
            <p className="text-on-surface-variant flex items-center gap-1 mt-1 font-medium text-sm">
              <span className="material-symbols-outlined text-sm">location_on</span>
              {pg.location}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black text-primary leading-none">₹{pg.price.toLocaleString()}</p>
            <p className="text-[10px] uppercase font-bold text-outline tracking-tighter mt-1">per month</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {pg.amenities?.slice(0, 3).map((amt, index) => (
            <span key={index} className="bg-surface-container-highest px-3 py-1 rounded-full text-[10px] font-bold text-on-surface-variant ring-1 ring-white/50">
              {amt}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/20">
            <span className="text-xs font-bold text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">directions_walk</span>
                {pg.distance}
            </span>
            <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                    <span className="material-symbols-outlined text-xs">share</span>
                </button>
                <button className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                    <span className="material-symbols-outlined text-xs">favorite</span>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PGCard;
