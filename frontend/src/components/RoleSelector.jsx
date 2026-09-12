import React from 'react';

const RoleSelector = ({ onSelectRole }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white mb-4 drop-shadow-lg">
          UniNest
        </h1>
        <p className="text-white/80 text-xl font-medium">Discover your perfect student sanctuary</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Student Role */}
        <button
          onClick={() => onSelectRole('student')}
          className="group relative glass-card p-10 rounded-2xl transition-all duration-500 hover:scale-105 hover:bg-white/80 text-left overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-8xl">school</span>
          </div>
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
            <span className="material-symbols-outlined text-3xl text-primary">person_search</span>
          </div>
          <h2 className="text-3xl font-bold text-on-surface mb-2">Continue as Student</h2>
          <p className="text-on-surface-variant leading-relaxed">
            Browse verified PGs, filter by your needs, and find your next home near campus.
          </p>
          <div className="mt-8 flex items-center gap-2 text-primary font-bold">
            Explore PGs <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </div>
        </button>

        {/* Owner Role */}
        <button
          onClick={() => onSelectRole('owner')}
          className="group relative glass-card p-10 rounded-2xl transition-all duration-500 hover:scale-105 hover:bg-white/80 text-left overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-8xl">holiday_village</span>
          </div>
          <div className="w-16 h-16 bg-secondary-container/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-secondary-container/40 transition-colors">
            <span className="material-symbols-outlined text-3xl text-secondary-container text-on-secondary-container">add_business</span>
          </div>
          <h2 className="text-3xl font-bold text-on-surface mb-2">Continue as Owner</h2>
          <p className="text-on-surface-variant leading-relaxed">
            List your properties, manage availability, and connect with students effortlessly.
          </p>
          <div className="mt-8 flex items-center gap-2 text-primary font-bold">
            Manage Listings <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default RoleSelector;
