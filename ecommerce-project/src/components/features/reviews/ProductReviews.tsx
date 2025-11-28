import React, { useEffect, useState } from 'react';
import type { ReviewCard } from '../../../Type/Reviews';
import { getReviewsByProduct } from '../../../utils/reviewsService';
import ReviewCardComponent from './ReviewCard';
import ReviewForm from './ReviewForm';

type Props = { productId: number };

const ProductReviews: React.FC<Props> = ({ productId }) => {
  const [reviews, setReviews] = useState<ReviewCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const { data, error } = await getReviewsByProduct(productId);
      if (!mounted) return;
      if (error || !data) {
        setReviews([]);
      } else {
        setReviews(data);
      }
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, [productId]);

  const handleAdd = (r: ReviewCard) => {
    setReviews((prev) => [r, ...prev]);
    setShowForm(false);
  };

  return (
    <div className="mt-12 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold text-white">Customer reviews</h3>
        <button onClick={() => setShowForm(true)} className="bg-[#F7C84B] text-[#071126] px-4 py-2 rounded-md font-medium">
          Add review
        </button>
      </div>

      {showForm && (
        <ReviewForm onAddReview={handleAdd} onClose={() => setShowForm(false)} productId={productId} />
      )}

      {loading ? (
        <p className="text-gray-300">Loading reviews...</p>
      ) : reviews.length ? (
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto scroll-smooth px-4 py-2 snap-x snap-mandatory" style={{ WebkitOverflowScrolling: 'touch' }}>
            {reviews.map((r) => (
              <div key={r.id} className="snap-start flex-none w-[320px]">
                <div className="bg-white/5 p-4 rounded-lg">
                  <ReviewCardComponent name={r.name} rating={r.rating} description={r.description} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-300">No reviews yet for this product.</p>
      )}
    </div>
  );
};

export default ProductReviews;
