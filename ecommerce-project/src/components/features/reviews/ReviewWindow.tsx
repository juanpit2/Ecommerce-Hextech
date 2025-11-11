import { useState } from 'react';
import ReviewForm from './ReviewForm';
import reviewsData from '../../data/reviews.json';
import type { ReviewCard } from '../../../Type/Reviews';

const ReviewWindow = () => {
  const [reviews, setReviews] = useState<ReviewCard[]>(reviewsData);
  const [showForm, setShowForm] = useState(false);

  const handleAddReview = (newReview: ReviewCard) => {
    setReviews(prev => [newReview, ...prev]);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-[1000px] bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Reviews</h2>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Add Review
            </button>
          </div>

          {/* Grid de reviews */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-yellow-50 rounded-xl p-4 border border-yellow-200"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center text-sm font-bold">
                    {review.name[0]}
                  </div>
                  <span className="font-medium text-gray-900">@{review.name}</span>
                </div>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-lg ${i < Math.round(review.rating) ? '⭐' : '☆'}`}>
                      {i < Math.round(review.rating) ? '★' : '☆'}
                    </span>
                  ))}
                  <span className="text-sm text-gray-600 ml-2">{review.rating.toFixed(1)}</span>
                </div>
                <p className="text-gray-700 text-sm">{review.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showForm && (
        <ReviewForm
          onAddReview={handleAddReview}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default ReviewWindow;