import React, { useState } from 'react';

const StudentVerification = ({ onVerify, onCancel }) => {
  const [method, setMethod] = useState('email'); // 'email' or 'id_card'
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleVerify = (e) => {
    e.preventDefault();
    if (method === 'email') {
      if (!email.includes('.edu') && !email.toLowerCase().includes('university')) {
        setError('Please use a valid university email address (e.g. .edu)');
        return;
      }
      onVerify({ type: 'email', value: email });
    } else {
      if (!file) {
        setError('Please upload an image of your Student ID card.');
        return;
      }
      onVerify({ type: 'id_card', value: file.name });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6 overflow-hidden">
      {/* Animated Background Overlay */}
      <div 
        className="absolute inset-0 bg-indigo-900/40 backdrop-blur-2xl animate-in fade-in duration-700"
        onClick={onCancel}
      />

      <div className="relative w-full max-w-lg glass-card rounded-[40px] p-10 md:p-12 shadow-2xl border border-white/40 animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
            <span className="material-symbols-outlined text-primary text-5xl">verified_user</span>
          </div>
          <h2 className="text-3xl font-headline font-extrabold text-indigo-900 mb-3 tracking-tight">Student Verification</h2>
          <p className="text-on-surface-variant font-medium text-sm leading-relaxed px-4">
            To maintain our premium academic community in Guwahati, we require a one-time student verification.
          </p>
        </div>

        {/* Method Toggle */}
        <div className="flex bg-white/40 p-1.5 rounded-full mb-8 ring-1 ring-white/30">
          <button 
            onClick={() => { setMethod('email'); setError(''); }}
            className={`flex-1 py-3 rounded-full text-sm font-black transition-all duration-300 ${method === 'email' ? 'bg-white text-primary shadow-lg scale-[1.02]' : 'text-on-surface-variant hover:text-primary'}`}
          >
            University Email
          </button>
          <button 
            onClick={() => { setMethod('id_card'); setError(''); }}
            className={`flex-1 py-3 rounded-full text-sm font-black transition-all duration-300 ${method === 'id_card' ? 'bg-white text-primary shadow-lg scale-[1.02]' : 'text-on-surface-variant hover:text-primary'}`}
          >
            Student ID Card
          </button>
        </div>

        <form onSubmit={handleVerify} className="space-y-8">
          {method === 'email' ? (
            <div className="space-y-2 animate-in fade-in slide-in-from-right-4 duration-500">
              <label className="block text-xs font-black uppercase tracking-widest text-on-surface ml-4 mb-2">Academic Email</label>
              <input 
                required
                type="email"
                placeholder="name@university.edu.in"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                className="w-full bg-white/60 border-none rounded-2xl px-6 py-5 focus:ring-4 focus:ring-primary/10 text-on-surface placeholder:text-outline/50 shadow-sm outline-none font-bold text-lg"
              />
              <p className="text-[10px] text-outline font-black py-2 px-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-xs">info</span>
                Must contain .edu or university domain
              </p>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-500 text-center">
              <div className="group relative border-2 border-dashed border-primary/20 hover:border-primary/40 rounded-[32px] p-10 transition-all duration-300 bg-white/20 hover:bg-white/40 cursor-pointer">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => { setFile(e.target.files[0]); setError(''); }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-primary text-3xl">upload_file</span>
                    </div>
                    <div>
                        <p className="text-on-surface font-black text-lg">
                            {file ? file.name : 'Upload ID Image'}
                        </p>
                        <p className="text-on-surface-variant text-xs font-bold mt-1">Accepts PNG, JPG (Max 5MB)</p>
                    </div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-rose-50 text-rose-600 px-6 py-4 rounded-2xl text-xs font-bold border border-rose-100 flex items-center gap-3 animate-shake">
                <span className="material-symbols-outlined text-lg">error_outline</span>
                {error}
            </div>
          )}

          <div className="flex flex-col gap-4 pt-4">
              <button 
                type="submit" 
                className="w-full signature-gradient text-white py-5 rounded-full font-black text-xl shadow-2xl shadow-primary/30 active:scale-95 transition-all duration-300"
              >
                Complete Verification
              </button>
              <button 
                type="button"
                onClick={onCancel}
                className="w-full py-2 text-outline font-black text-xs uppercase tracking-widest hover:text-on-surface transition-colors"
              >
                Go Back
              </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentVerification;
