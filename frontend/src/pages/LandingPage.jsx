import React from 'react';

const LandingPage = ({ onSelectRole }) => {
  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-7xl px-6 py-16 md:py-24 text-center mt-20">
        <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tight text-on-surface mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-indigo-500">
          Welcome to UniNest
        </h1>
        <p className="font-body text-xl md:text-2xl text-on-surface-variant max-w-2xl mx-auto mb-12 leading-relaxed">
          Find your perfect space or list your property. The premium student housing network designed for your academic journey.
        </p>

        {/* Role Selector Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Student Card */}
          <div 
            onClick={() => onSelectRole('student')}
            className="glass-card p-10 rounded-2xl text-left group hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 cursor-pointer flex flex-col justify-between h-full"
          >
            <div>
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-4xl text-primary">👨‍🎓</span>
              </div>
              <h2 className="font-headline text-3xl font-bold text-indigo-900 mb-4">Student</h2>
              <p className="font-body text-lg text-on-surface-variant leading-relaxed mb-8">
                Find the perfect PG near your university. Browse verified listings with amenities designed for study and rest.
              </p>
            </div>
            <div className="flex items-center gap-2 text-indigo-600 font-bold group-hover:gap-4 transition-all">
              <span>Start Browsing</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </div>
          </div>

          {/* Owner Card */}
          <div 
            onClick={() => onSelectRole('owner')}
            className="glass-card p-10 rounded-2xl text-left group hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-500 cursor-pointer flex flex-col justify-between h-full"
          >
            <div>
              <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-4xl">🏠</span>
              </div>
              <h2 className="font-headline text-3xl font-bold text-secondary mb-4">PG Owner</h2>
              <p className="font-body text-lg text-on-surface-variant leading-relaxed mb-8">
                List your PG and find verified students. Manage your bookings and tenants with our ethereal academic toolkit.
              </p>
            </div>
            <div className="flex items-center gap-2 text-secondary font-bold group-hover:gap-4 transition-all">
              <span>List Your Space</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Bento Section */}
      <section className="w-full max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
          {/* Major Bento Item */}
          <div className="md:col-span-8 relative overflow-hidden rounded-2xl group border border-white/20">
            <img 
              alt="Premium Student Room" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBo2OVDWOv2WqcqlTcFgrXyxXsZbJqp_lz8VsnmPgMw8wzV-PomMC3jIkX3-I-jAKu3iZlw5kNy7ZQIsZmwuUtyjxJwk7gjOX2LJfr2nO1srIBGJ1weh1aaKDScvu14_z4Y2befzLeU4e3R9uPe1gSmob3-eBH8Vye_4EzguVmnVbBkDAqztozAm6TW2RWxoAU224hhMBiweSFq5IsoW8XBW3dzgBlt83TeAmSfGF97k546ScHCbBLnCs_zEnfqG0gpGi_1b80pmh8" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <span className="bg-primary/90 px-4 py-1 rounded-full text-[10px] font-bold mb-4 inline-block uppercase tracking-widest">PREMIUM LISTINGS</span>
              <h3 className="text-4xl font-headline font-bold">Curated for Excellence</h3>
            </div>
          </div>
          
          {/* Small Bento Item 1 */}
          <div className="md:col-span-4 glass-card rounded-2xl p-8 flex flex-col justify-center border border-white/30">
            <span className="material-symbols-outlined text-secondary text-5xl mb-6">verified_user</span>
            <h3 className="font-headline text-2xl font-bold mb-3">100% Verified</h3>
            <p className="text-on-surface-variant leading-relaxed font-medium">Every property and student profile undergoes a rigorous verification process.</p>
          </div>

          {/* Small Bento Item 2 */}
          <div className="md:col-span-4 bg-primary rounded-2xl p-8 flex flex-col justify-center text-white shadow-xl shadow-primary/20">
            <h3 className="font-headline text-4xl font-extrabold mb-2">Thousands</h3>
            <p className="text-indigo-100 font-medium">Students find their perfect space through UniNest across major campus cities.</p>
          </div>

          {/* Small Bento Item 3 */}
          <div className="md:col-span-8 relative overflow-hidden rounded-2xl group border border-white/20">
            <img 
              alt="Community Space" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmlJ_YLe7hACX6YiW1XUlrkEx8vsBNKK-OaBYyVPUfjGyQ9BwVyP1SvB_SQE1JK-rsAME3QM9moNfexOztEmU6oA7oaLkeazhAf5dJCM-gItjlQgurT6TuytJWlJF8_aeumdK3puMKyBdvYvXoMOvr5xzCxtLNe3SazjnWydWEBC-ydDTYeSg73JrK1s4qkbkf1Lx2myA-pi-8FwIvjRmObsu-iOebL-bHuwoOOhkziQVhDLQRgqpue1l3Hkl-JrC3UPGAKZ9JHYY" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-teal-900/60 to-transparent"></div>
            <div className="absolute top-8 left-8 text-white max-w-xs">
              <h3 className="text-2xl font-headline font-bold mb-2">Build Your Community</h3>
              <p className="text-sm opacity-90 font-medium">Discover verified PGs and rental spaces near your university with ease.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="w-full max-w-5xl px-6 py-20 mb-20 text-center glass-card rounded-2xl border border-white/40 shadow-xl mx-6">
        <h2 className="font-headline text-3xl font-bold mb-4">Never miss the perfect space.</h2>
        <p className="text-on-surface-variant mb-8 max-w-md mx-auto font-medium">Join our notification list to get alerts when new properties matching your preferences are listed.</p>
        <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
          <input 
            className="flex-grow rounded-full bg-surface-container-highest/40 border-none focus:ring-2 focus:ring-primary px-6 py-4 font-body outline-none" 
            placeholder="Enter your university email" 
            type="email"
          />
          <button className="bg-primary text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-primary/30 transition-shadow">Subscribe</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-16 px-8 bg-white/40 backdrop-blur-md border-t border-white/20">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-indigo-600" data-icon="school">school</span>
              <span className="font-bold text-indigo-600 text-xl font-headline">UniNest</span>
            </div>
            <p className="text-slate-500 text-sm font-body max-w-xs text-center md:text-left">
              The Ethereal Academic Housing Network. Bridging the gap between comfort and education.
            </p>
          </div>
          <div className="flex gap-8 text-sm font-medium text-slate-500">
            <a className="hover:text-indigo-400 transition-colors" href="#">Terms of Service</a>
            <a className="hover:text-indigo-400 transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-indigo-400 transition-colors" href="#">Contact Support</a>
          </div>
          <p className="text-slate-400 text-sm font-body">
            © 2026 UniNest – The Ethereal Academic. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
