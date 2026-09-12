import React, { useState, useMemo } from 'react';
import PGCard from '../components/PGCard';

const OwnerDashboard = ({ listings, onAddPg, onDeletePg }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    location: '',
    lat: '26.1445', // Guwahati Default
    lng: '91.7362', // Guwahati Default
    availability: 'Available',
    image: '',
    amenities: 'WiFi, Gym, AC'
  });

  const [priceFilter, setPriceFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');

  const filteredListings = useMemo(() => {
    let result = [...listings];
    if (availabilityFilter) {
      result = result.filter(pg => pg.availability === availabilityFilter);
    }
    if (priceFilter === 'low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (priceFilter === 'high-low') {
      result.sort((a, b) => b.price - a.price);
    }
    return result;
  }, [listings, priceFilter, availabilityFilter]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPg = {
      ...formData,
      id: Date.now(),
      price: Number(formData.price),
      lat: Number(formData.lat),
      lng: Number(formData.lng),
      amenities: formData.amenities.split(',').map(s => s.trim())
    };
    onAddPg(newPg);
    setFormData({ name: '', price: '', location: '', lat: '26.1445', lng: '91.7362', availability: 'Available', image: '', amenities: 'WiFi, Gym, AC' });
  };

  return (
    <main className="pt-28 px-6 max-w-7xl mx-auto pb-24">
      <section className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-headline font-extrabold tracking-tight text-on-surface mb-2">Welcome back, Partner</h1>
          <p className="text-on-surface-variant max-w-lg font-medium leading-relaxed">Manage your property ecosystem in Guwahati with ethereal clarity. Add, edit, and monitor your PG listings in real-time.</p>
        </div>
        <div className="glass-card p-2 rounded-2xl flex items-center">
          <button className="signature-gradient text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-primary/20 flex items-center gap-2 active:scale-95 transition-all duration-200">
            <span className="material-symbols-outlined">add</span>
            Add New PG
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Section: Active Listings */}
        <div className="lg:col-span-7 space-y-8">
            <div className="flex flex-col gap-4 px-2">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-headline font-extrabold text-on-surface flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">list_alt</span>
                        Active Listings (Guwahati)
                    </h2>
                    <span className="bg-secondary-fixed text-on-secondary-container px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                        {filteredListings.length} Properties
                    </span>
                </div>
                <div className="flex gap-4 items-center flex-wrap">
                    <select 
                        value={priceFilter}
                        onChange={(e) => setPriceFilter(e.target.value)}
                        className="bg-white/60 backdrop-blur-md border-none ring-1 ring-white/30 rounded-full px-4 py-2 text-sm shadow-sm focus:ring-primary/20 outline-none font-bold text-on-surface-variant"
                    >
                        <option value="">Sort by Rent</option>
                        <option value="low-high">Low to High</option>
                        <option value="high-low">High to Low</option>
                    </select>
                    <select 
                        value={availabilityFilter}
                        onChange={(e) => setAvailabilityFilter(e.target.value)}
                        className="bg-white/60 backdrop-blur-md border-none ring-1 ring-white/30 rounded-full px-4 py-2 text-sm shadow-sm focus:ring-primary/20 outline-none font-bold text-on-surface-variant"
                    >
                        <option value="">Filter Availability</option>
                        <option value="Available">Available</option>
                        <option value="Occupied">Occupied</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-col gap-6 mt-6">
                {filteredListings.length > 0 ? (
                    filteredListings.map(pg => (
                        <PGCard 
                            key={pg.id} 
                            pg={pg} 
                            isOwner={true} 
                            onDelete={onDeletePg}
                        />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center p-12 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg">
                        <span className="material-symbols-outlined text-outline text-6xl mb-4">home_work</span>
                        <h3 className="text-xl font-bold text-on-surface">No Listings in Guwahati Yet</h3>
                        <p className="text-on-surface-variant mt-2 text-center font-medium">Use the form on the right to add your first property.</p>
                    </div>
                )}
            </div>
        </div>

        {/* Right Section: Add PG Form - Sticky */}
        <div className="lg:col-span-5">
          <div className="sticky top-28">
            <div className="glass-card rounded-2xl p-8 shadow-2xl shadow-indigo-500/10 border border-white/40">
                <div className="mb-8">
                    <h2 className="text-2xl font-headline font-extrabold text-on-surface mb-2">Add New Property</h2>
                    <p className="text-on-surface-variant text-sm font-medium">Publish a new listing in Guwahati, Assam.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6 flex flex-col items-start w-full">
                    <div className="space-y-4 w-full">
                        <label className="block">
                            <span className="text-xs font-black uppercase tracking-widest text-on-surface ml-4 mb-2 block">PG Name</span>
                            <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. GU Students PG" className="w-full bg-white/40 border-none rounded-full px-6 py-4 focus:ring-2 focus:ring-primary/20 text-on-surface placeholder:text-outline shadow-sm outline-none font-medium" />
                        </label>
                        <label className="block">
                            <span className="text-xs font-black uppercase tracking-widest text-on-surface ml-4 mb-2 block">Location</span>
                            <input required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="Jalukbari, Guwahati" className="w-full bg-white/40 border-none rounded-full px-6 py-4 focus:ring-2 focus:ring-primary/20 text-on-surface placeholder:text-outline shadow-sm outline-none font-medium" />
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            <label className="block">
                                <span className="text-xs font-black uppercase tracking-widest text-on-surface ml-4 mb-2 block">Price / Month</span>
                                <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="₹" className="w-full bg-white/40 border-none rounded-full px-6 py-4 focus:ring-2 focus:ring-primary/20 text-on-surface placeholder:text-outline shadow-sm outline-none font-medium" />
                            </label>
                            <label className="block">
                                <span className="text-xs font-black uppercase tracking-widest text-on-surface ml-4 mb-2 block">Status</span>
                                <select value={formData.availability} onChange={e => setFormData({...formData, availability: e.target.value})} className="w-full bg-white/40 border-none rounded-full px-6 py-4 focus:ring-2 focus:ring-primary/20 text-on-surface shadow-sm outline-none font-bold">
                                    <option value="Available">Available</option>
                                    <option value="Occupied">Occupied</option>
                                </select>
                            </label>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <label className="block">
                                <span className="text-xs font-black uppercase tracking-widest text-on-surface ml-4 mb-2 block">Latitude</span>
                                <input required type="text" value={formData.lat} onChange={e => setFormData({...formData, lat: e.target.value})} className="w-full bg-white/40 border-none rounded-full px-6 py-4 focus:ring-2 focus:ring-primary/20 text-on-surface shadow-sm outline-none font-medium text-xs" />
                            </label>
                            <label className="block">
                                <span className="text-xs font-black uppercase tracking-widest text-on-surface ml-4 mb-2 block">Longitude</span>
                                <input required type="text" value={formData.lng} onChange={e => setFormData({...formData, lng: e.target.value})} className="w-full bg-white/40 border-none rounded-full px-6 py-4 focus:ring-2 focus:ring-primary/20 text-on-surface shadow-sm outline-none font-medium text-xs" />
                            </label>
                        </div>
                    </div>
                    
                    <button type="submit" className="w-full signature-gradient text-white py-5 rounded-full font-black text-lg shadow-xl shadow-primary/30 active:scale-95 transition-all duration-300 mt-4">
                        Publish Listing
                    </button>
                </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OwnerDashboard;
