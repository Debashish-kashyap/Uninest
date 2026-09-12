import React, { useState } from 'react';

const ReviewSection = ({ reviews = [], onAddReview }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    onAddReview({ reviewer: 'Student', rating, comment });
    setComment('');
    setRating(5);
  };

  return (
    <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4">
        <h3 className="text-2xl font-headline font-extrabold text-on-surface">Student Reviews</h3>
        <div className="h-px flex-grow bg-white/20"></div>
        <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest leading-none">
          {reviews.length} Feedbacks
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Review List */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {reviews.length > 0 ? (
            reviews.map((rev) => (
              <div key={rev.id} className="glass-card p-6 rounded-2xl border border-white/40 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold">
                        {rev.reviewer.charAt(0)}
                    </div>
                    <div>
                        <p className="font-bold text-on-surface leading-none mb-1">{rev.reviewer}</p>
                        <p className="text-[10px] text-outline uppercase font-black tracking-tighter">Verified Resident</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`material-symbols-outlined text-sm ${i < rev.rating ? 'text-yellow-400' : 'text-outline/20'}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-on-surface-variant font-medium leading-relaxed italic">"{rev.comment}"</p>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white/20 rounded-2xl border border-white/10">
              <span className="material-symbols-outlined text-outline/30 text-5xl mb-4">rate_review</span>
              <p className="text-on-surface-variant font-bold">No reviews yet. Be the first!</p>
            </div>
          )}
        </div>

        {/* Right: Add Review Form */}
        <div className="glass-card p-8 rounded-3xl border border-white/60 shadow-2xl bg-white/40 sticky top-0">
          <h4 className="text-xl font-headline font-extrabold text-on-surface mb-2">Write a Review</h4>
          <p className="text-on-surface-variant text-sm mb-8 font-medium">Share your experience with the UniNest community.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <p className="text-xs font-black text-outline uppercase tracking-widest ml-4 mb-3">Rate your Stay</p>
              <div className="flex gap-2 ml-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none transition-transform hover:scale-125 active:scale-95"
                  >
                    <span className={`material-symbols-outlined text-3xl ${star <= rating ? 'text-yellow-400' : 'text-outline/20'}`} style={{ fontVariationSettings: star <= rating ? "'FILL' 1" : "none" }}>
                      star
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
                <p className="text-xs font-black text-outline uppercase tracking-widest ml-4 mb-2">Your Thoughts</p>
                <textarea
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="What did you love about this place?"
                    className="w-full bg-white/60 border-none rounded-2xl px-6 py-4 min-h-[120px] focus:ring-2 focus:ring-primary/20 text-on-surface placeholder:text-outline/40 shadow-inner outline-none font-medium resize-none shadow-sm"
                />
            </div>

            <button type="submit" className="w-full signature-gradient text-white py-4 rounded-full font-black text-lg shadow-xl shadow-primary/30 active:scale-95 transition-all duration-300">
                Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
