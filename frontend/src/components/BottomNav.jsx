import React from 'react';

const BottomNav = () => {
  return (
    <nav className="fixed bottom-6 left-0 w-full z-50 flex justify-around items-center px-4">
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md rounded-full border border-white/20 bg-white/60 backdrop-blur-2xl shadow-[0_40px_60px_-10px_rgba(25,28,30,0.06)] flex justify-around items-center py-2 px-4 translate-y-0 transition-transform">
        <a className="flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-full aspect-square p-3 transform -translate-y-2 shadow-lg shadow-indigo-500/30 active:scale-90 transition-transform" href="#">
          <span className="material-symbols-outlined text-xl">explore</span>
          <span className="font-headline text-[11px] uppercase tracking-widest font-medium hidden">Explore</span>
        </a>
        <a className="flex flex-col items-center justify-center text-slate-400 p-2 hover:text-indigo-500 transition-colors active:scale-90" href="#">
          <span className="material-symbols-outlined text-xl">favorite</span>
          <span className="font-headline text-[11px] uppercase tracking-widest font-bold mt-1">Saved</span>
        </a>
        <a className="flex flex-col items-center justify-center text-slate-400 p-2 hover:text-indigo-500 transition-colors active:scale-90" href="#">
          <span className="material-symbols-outlined text-xl">event_available</span>
          <span className="font-headline text-[11px] uppercase tracking-widest font-bold mt-1">Bookings</span>
        </a>
        <a className="flex flex-col items-center justify-center text-slate-400 p-2 hover:text-indigo-500 transition-colors active:scale-90" href="#">
          <span className="material-symbols-outlined text-xl">person</span>
          <span className="font-headline text-[11px] uppercase tracking-widest font-bold mt-1">Profile</span>
        </a>
      </div>
    </nav>
  );
};

export default BottomNav;
