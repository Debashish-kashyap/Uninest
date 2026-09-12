import React, { useState, useMemo } from 'react';
import PGCard from '../components/PGCard';
import MapView from '../components/MapView';
import BottomNav from '../components/BottomNav';
import ReviewSection from '../components/ReviewSection';

const StudentDashboard = ({ listings, onAddReview }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [selectedPg, setSelectedPg] = useState(null);

  const filteredListings = useMemo(() => {
    let result = [...listings];

    if (searchTerm) {
      result = result.filter(pg => 
        pg.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pg.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (availabilityFilter) {
      result = result.filter(pg => pg.availability === availabilityFilter);
    }

    if (priceFilter === 'low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (priceFilter === 'high-low') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [listings, searchTerm, priceFilter, availabilityFilter]);

  const handleReviewAdd = (review) => {
    if (selectedPg) {
      onAddReview(selectedPg.id, review);
    }
  };

  return (
    <div className="min-h-screen pb-24 md:pb-0">
      <main className="pt-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:h-[calc(100vh-120px)] overflow-hidden">
          
          {/* Left Column: Listings */}
          <div className="lg:col-span-7 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar pb-10">
            <section className="flex flex-col gap-6 sticky top-0 bg-white/5 backdrop-blur-sm z-10 py-4">
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-headline font-extrabold tracking-tight text-on-surface">Discover PGs in Guwahati</h1>
                <p className="text-on-surface-variant font-medium">Verified student housing near Gauhati University & campus hubs.</p>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-hover:text-primary transition-colors">search</span>
                  <input 
                    type="text" 
                    placeholder="Search by location (e.g. Jalukbari)..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white/60 backdrop-blur-md border-none ring-1 ring-white/30 rounded-full pl-12 pr-6 py-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 shadow-lg outline-none font-medium transition-all"
                  />
                </div>
                <div className="flex gap-2">
                  <select 
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                    className="bg-white/60 backdrop-blur-md border-none ring-1 ring-white/30 rounded-full px-4 py-2 text-sm shadow-sm focus:ring-primary/20 outline-none font-bold text-on-surface-variant"
                  >
                    <option value="">Rent Range</option>
                    <option value="low-high">Low to High</option>
                    <option value="high-low">High to Low</option>
                  </select>
                  <select 
                    value={availabilityFilter}
                    onChange={(e) => setAvailabilityFilter(e.target.value)}
                    className="bg-white/60 backdrop-blur-md border-none ring-1 ring-white/30 rounded-full px-4 py-2 text-sm shadow-sm focus:ring-primary/20 outline-none font-bold text-on-surface-variant"
                  >
                    <option value="">Status</option>
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                  </select>
                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {filteredListings.length > 0 ? (
                filteredListings.map(pg => (
                  <PGCard 
                    key={pg.id} 
                    pg={pg} 
                    isSelected={selectedPg?.id === pg.id}
                    onClick={() => setSelectedPg(pg)}
                  />
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center p-20 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/20">
                  <span className="material-symbols-outlined text-outline text-6xl mb-4">search_off</span>
                  <h3 className="text-xl font-bold text-on-surface">No PGs found in Guwahati</h3>
                  <p className="text-on-surface-variant mt-2 font-medium">Try adjusting your filters or search term.</p>
                </div>
              )}
            </div>

            {/* Dynamic Review Section for Selected PG */}
            {selectedPg && (
                <ReviewSection 
                    reviews={listings.find(l => l.id === selectedPg.id)?.reviews || []} 
                    onAddReview={handleReviewAdd}
                />
            )}
          </div>

          {/* Right Column: Map */}
          <div className="lg:col-span-5 h-[500px] lg:h-full pb-10">
            <div className="h-full sticky top-4">
              <MapView 
                lat={selectedPg?.lat} 
                lng={selectedPg?.lng} 
                title={selectedPg?.name} 
              />
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default StudentDashboard;
