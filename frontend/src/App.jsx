import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AuthPage from './pages/AuthPage';
import StudentDashboard from './pages/StudentDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import { initialPGListings } from './data/mockData';

function App() {
  const [user, setUser] = useState(null); // { role, email, isVerified }
  const [listings, setListings] = useState([]);

  // Sync with localStorage for persistence
  useEffect(() => {
    const saved = localStorage.getItem('uniNest_listings');
    if (saved) {
      const parsed = JSON.parse(saved);
      const sanitized = parsed.map(pg => ({
          ...pg,
          reviews: pg.reviews || []
      }));
      setListings(sanitized);
    } else {
      setListings(initialPGListings);
    }

    const userSaved = localStorage.getItem('uniNest_user');
    if (userSaved) {
        setUser(JSON.parse(userSaved));
    }
  }, []);

  const handleAddPg = (newPg) => {
    const updated = [{ ...newPg, reviews: [] }, ...listings];
    setListings(updated);
    localStorage.setItem('uniNest_listings', JSON.stringify(updated));
  };

  const handleDeletePg = (id) => {
    const updated = listings.filter(pg => pg.id !== id);
    setListings(updated);
    localStorage.setItem('uniNest_listings', JSON.stringify(updated));
  };

  const handleAddReview = (pgId, review) => {
    const updated = listings.map(pg => {
      if (pg.id === pgId) {
        return {
          ...pg,
          reviews: [...(pg.reviews || []), { ...review, id: Date.now() }]
        };
      }
      return pg;
    });
    setListings(updated);
    localStorage.setItem('uniNest_listings', JSON.stringify(updated));
  };

  const handleAuthComplete = (userData) => {
      setUser(userData);
      localStorage.setItem('uniNest_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
      setUser(null);
      localStorage.removeItem('uniNest_user');
      localStorage.removeItem('uniNest_verified'); // Clean up old keys
  };

  return (
    <div className="min-h-screen">
      {user && (
        <Navbar 
          role={user.role} 
          onResetRole={handleLogout} 
          variant="dashboard"
        />
      )}

      {!user ? (
        <AuthPage onAuthComplete={handleAuthComplete} />
      ) : user.role === 'student' ? (
        <StudentDashboard 
          listings={listings} 
          onAddReview={handleAddReview}
        />
      ) : (
        <OwnerDashboard 
          listings={listings} 
          onAddPg={handleAddPg} 
          onDeletePg={handleDeletePg}
        />
      )}
    </div>
  );
}

export default App;
