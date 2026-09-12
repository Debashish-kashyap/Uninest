import React, { useState } from 'react';

const AuthPage = ({ onAuthComplete }) => {
  const [role, setRole] = useState('student');
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!isLogin && role === 'student') {
      // Verification Logic
      if (!email.includes('.edu') && !email.toLowerCase().includes('university')) {
        setError('Please use a valid university email address (.edu)');
        return;
      }
      if (!file) {
        setError('Please upload your Student ID for verification.');
        return;
      }
    }

    // Simulate completion
    onAuthComplete({ role, email, isVerified: role === 'student' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_left,#e1e0ff_0%,#f7f9fb_40%),radial-gradient(circle_at_bottom_right,#71f8e4_0%,#f7f9fb_40%)]">
      <main className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Editorial Context */}
        <section className="hidden lg:flex flex-col space-y-8 animate-in fade-in slide-in-from-left-10 duration-700">
          <div className="space-y-4">
            <span className="inline-block py-1 px-4 bg-primary/10 text-primary font-bold rounded-full text-sm uppercase tracking-widest">
              Future Focused
            </span>
            <h1 className="text-6xl font-headline font-extrabold text-indigo-900 tracking-tight leading-[1.1]">
              Your Academic <br />
              <span className="bg-gradient-to-tr from-primary to-primary-container bg-clip-text text-transparent">Sanctuary</span> Awaits.
            </h1>
            <p className="text-lg text-on-surface-variant max-w-md leading-relaxed">
              Designed exclusively for students. Find safe, verified housing within your university ecosystem through our translucent sanctuary.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="glass-card p-6 rounded-3xl shadow-sm bg-white/40 backdrop-blur-xl border border-white/40">
              <span className="material-symbols-outlined text-primary mb-3">verified_user</span>
              <h3 className="font-bold text-on-surface font-headline">Verified ID</h3>
              <p className="text-sm text-on-surface-variant">Only university students and certified owners.</p>
            </div>
            <div className="glass-card p-6 rounded-3xl shadow-sm bg-white/40 backdrop-blur-xl border border-white/40">
              <span className="material-symbols-outlined text-teal-600 mb-3">account_balance</span>
              <h3 className="font-bold text-on-surface font-headline">Campus Ready</h3>
              <p className="text-sm text-on-surface-variant">Strategic locations near academic centers.</p>
            </div>
          </div>
        </section>

        {/* Right Side: Interaction Card */}
        <section className="w-full flex justify-center lg:justify-end animate-in zoom-in-95 duration-500">
          <div className="glass-card w-full max-w-[480px] rounded-[40px] p-8 sm:p-10 shadow-2xl bg-white/70 backdrop-blur-[20px] border border-white/30">
            {/* Brand Anchor */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-tr from-primary to-primary-container rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-white text-3xl font-fill">school</span>
              </div>
              <h2 className="text-2xl font-headline font-black tracking-tight text-indigo-900">UniNest</h2>
              <p className="text-on-surface-variant text-sm font-medium mt-1">
                {isLogin ? 'Welcome back, Scholar' : 'Create your academic account'}
              </p>
            </div>

            {/* Role Toggle */}
            <div className="flex p-1 bg-surface-container/60 rounded-full mb-8 relative ring-1 ring-black/5">
              <button
                onClick={() => setRole('student')}
                className={`flex-1 py-3 px-4 rounded-full text-sm font-black transition-all duration-300 z-10 ${role === 'student' ? 'bg-white text-primary shadow-lg scale-[1.02]' : 'text-on-surface-variant hover:text-primary'}`}
              >
                Student
              </button>
              <button
                onClick={() => setRole('owner')}
                className={`flex-1 py-3 px-4 rounded-full text-sm font-black transition-all duration-300 z-10 ${role === 'owner' ? 'bg-white text-primary shadow-lg scale-[1.02]' : 'text-on-surface-variant hover:text-primary'}`}
              >
                Owner
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-black text-on-surface-variant ml-4 uppercase tracking-widest">University Email</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">alternate_email</span>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-14 pr-6 py-4 rounded-full bg-surface-container/30 border-none ring-1 ring-outline-variant/30 focus:ring-2 focus:ring-primary focus:bg-white transition-all text-on-surface placeholder:text-outline font-bold outline-none"
                    placeholder="student@university.edu"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black text-on-surface-variant ml-4 uppercase tracking-widest">Password</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">lock</span>
                  <input
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-14 pr-6 py-4 rounded-full bg-surface-container/30 border-none ring-1 ring-outline-variant/30 focus:ring-2 focus:ring-primary focus:bg-white transition-all text-on-surface placeholder:text-outline font-bold outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Registration Specific: ID Upload */}
              {!isLogin && role === 'student' && (
                <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-400">
                  <label className="text-xs font-black text-on-surface-variant ml-4 uppercase tracking-widest">Student ID Verification</label>
                  <div className="relative w-full aspect-[16/6] border-2 border-dashed border-outline-variant/50 rounded-[24px] hover:border-primary/50 transition-colors cursor-pointer group flex flex-col items-center justify-center bg-surface-container/20 overflow-hidden">
                    <div className="flex flex-col items-center group-hover:-translate-y-1 transition-transform">
                      <span className="material-symbols-outlined text-outline group-hover:text-primary text-3xl mb-1">badge</span>
                      <p className="text-[10px] font-black text-outline uppercase">
                        {file ? file.name : 'Click to upload Student ID'}
                      </p>
                    </div>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                    />
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-rose-50 text-rose-600 px-6 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 border border-rose-100 animate-shake">
                  <span className="material-symbols-outlined text-lg">error</span>
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-gradient-to-tr from-primary to-primary-container text-white font-headline font-black text-lg shadow-xl shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all mt-4"
              >
                {isLogin ? 'Login Now' : 'Register Account'}
              </button>
            </form>

            {/* Footer Links */}
            <div className="mt-8 flex flex-col items-center space-y-6">
              <p className="text-sm font-bold text-on-surface-variant">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  onClick={() => { setIsLogin(!isLogin); setError(''); }}
                  className="text-primary font-black hover:underline underline-offset-4 ml-1"
                >
                  {isLogin ? 'Register' : 'Login'}
                </button>
              </p>
              
              <div className="w-full flex items-center space-x-3 opacity-20">
                <div className="h-px flex-1 bg-outline"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface">Secure Portal</span>
                <div className="h-px flex-1 bg-outline"></div>
              </div>

              <div className="flex items-center space-x-8 text-outline/60">
                <span className="material-symbols-outlined hover:text-primary transition-colors cursor-pointer">fingerprint</span>
                <span className="material-symbols-outlined hover:text-primary transition-colors cursor-pointer">vpn_key</span>
                <span className="material-symbols-outlined hover:text-primary transition-colors cursor-pointer">shield_with_heart</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AuthPage;
