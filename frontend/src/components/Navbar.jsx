import React from 'react';

const Navbar = ({ role, onResetRole, variant = 'dashboard' }) => {
  if (variant === 'landing') {
    return (
      <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-sm shadow-indigo-500/5 transition-all">
        <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 cursor-pointer" onClick={onResetRole}>
            <span className="material-symbols-outlined text-indigo-600 text-3xl">school</span>
            <span className="text-2xl font-bold tracking-tight text-indigo-600 font-headline">UniNest</span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
            <a className="text-indigo-700 font-semibold hover:text-indigo-500 transition-colors" href="#">Explore</a>
            <a className="hover:text-indigo-500 transition-colors" href="#">Universities</a>
            <a className="hover:text-indigo-500 transition-colors" href="#">List Property</a>
            <button className="signature-gradient text-white px-6 py-2.5 rounded-full font-semibold shadow-lg shadow-indigo-500/20 active:scale-95 transition-transform">
              Sign In
            </button>
          </div>
          <button className="md:hidden p-2 text-on-surface">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </nav>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 bg-white/60 backdrop-blur-xl z-50 border-b border-white/20">
      <div className="flex items-center gap-3 cursor-pointer" onClick={onResetRole}>
        {role === 'owner' ? (
            <div className="flex items-center gap-4">
               <span className="material-symbols-outlined text-outline">menu</span>
               <div className="flex flex-col">
                 <span className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-teal-500 bg-clip-text text-transparent">UniNest</span>
                 <span className="font-headline tracking-tight font-semibold text-indigo-600 text-sm">Owner Dashboard</span>
               </div>
            </div>
        ) : (
            <>
                <span className="material-symbols-outlined text-indigo-600 text-2xl">home_pin</span>
                <span className="text-2xl font-extrabold tracking-tighter text-indigo-600 font-headline">UniNest</span>
            </>
        )}
      </div>

      <div className="hidden md:flex items-center gap-8">
        <nav className="flex gap-6">
          {role === 'student' ? (
            <>
              <a className="text-indigo-700 font-semibold transition-all duration-300" href="#">Explore</a>
              <a className="text-slate-500 hover:bg-indigo-50/50 transition-all duration-300 px-3 py-1 rounded-full" href="#">Saved</a>
              <a className="text-slate-500 hover:bg-indigo-50/50 transition-all duration-300 px-3 py-1 rounded-full" href="#">Bookings</a>
            </>
          ) : (
            <>
               {/* Owner specific links could go here if needed */}
            </>
          )}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60">
            {role === 'owner' ? 'UniNest Admin' : 'Welcome back,'}
          </p>
          <p className="text-sm font-bold text-primary capitalize">
            {role === 'owner' ? 'Premium Partner' : 'Alex Johnson'}
          </p>
        </div>
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm bg-primary/10 flex items-center justify-center">
            {role === 'owner' ? (
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_MIaY0P8_6rEswpEazE5AQbnr-AHCLGvlvJR4jW63JkglBPwkDu5LS5xhzJ-nwuSwbRBU3saqO3UrTHm1pQwZ_ULAR06YoSlLcNNalXITFbFC3wsYf20K99LDGXXwhHkjZEj6l2fjSM79XXaZEUmv3ZboMTWKnIdIrRkvx7Z9qTWEueuApOFfLfAfEp6YywIi1_t12DkWUfLVTgRBj1bE6DJt420tRciif69_LjJssQ_AjdtxLeZjZlMHNq3br1K7yd_MupmOa_k" alt="Profile" className="w-full h-full object-cover" />
            ) : (
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBO0ykPrBHBeLlG2ciPy48wwbuA3tiAZA4Zq26bdo4g-yKR4-755C-8oP3MUFMFwBiy0oDIp3fauFwaXTJKxDIHZPyrN9L4fTBybt1joyRfuuTdPHCJP3Fgx3N_xYs9fAHncY9750OkMiCid4JVIg7OnvvvmkaTK5utfUAgPicRT9-FzBroEelZ0LAbc_YZ4LzWVkZbj2Hy-fpwChAbpFFmIDMWNwbzI8jAajwGOoq2ewZLoysTqg0PHhjMms5K7xlLrhZHhk8z4II" alt="Profile" className="w-full h-full object-cover" />
            )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
