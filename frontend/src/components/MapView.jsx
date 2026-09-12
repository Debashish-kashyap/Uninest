import React from 'react';

const MapView = ({ lat, lng, title }) => {
  // Guwahati Default: 26.1445, 91.7362
  const centerLat = lat || 26.1445;
  const centerLng = lng || 91.7362;
  const displayTitle = title || 'Guwahati, Assam';
  
  const query = `${centerLat},${centerLng}`;
  const googleMapsSrc = `https://www.google.com/maps?q=${query}&output=embed`;

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-headline font-extrabold tracking-tight text-on-surface">Location View</h2>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full bg-white/60 backdrop-blur-md flex items-center justify-center hover:bg-white transition-all shadow-sm">
            <span className="material-symbols-outlined text-on-surface-variant text-lg">my_location</span>
          </button>
          <button className="w-10 h-10 rounded-full bg-white/60 backdrop-blur-md flex items-center justify-center hover:bg-white transition-all shadow-sm">
            <span className="material-symbols-outlined text-on-surface-variant text-lg">layers</span>
          </button>
        </div>
      </div>
      
      <div className="flex-grow rounded-2xl overflow-hidden border-4 border-white/40 shadow-2xl relative min-h-[400px]">
        <iframe
          title="Location Map"
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          src={googleMapsSrc}
          allowFullScreen
        ></iframe>
        
        <div className="absolute right-4 bottom-4 flex flex-col gap-2">
            <button className="w-10 h-10 rounded-lg bg-white shadow-xl flex items-center justify-center font-bold text-xl hover:bg-slate-50 transition-colors pointer-events-auto">+</button>
            <button className="w-10 h-10 rounded-lg bg-white shadow-xl flex items-center justify-center font-bold text-xl hover:bg-slate-50 transition-colors pointer-events-auto">−</button>
        </div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group pointer-events-none">
             <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-black text-xs shadow-xl border-4 border-white animate-bounce">₹?</div>
             <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                 <p className="text-[10px] font-black">{displayTitle}</p>
             </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
