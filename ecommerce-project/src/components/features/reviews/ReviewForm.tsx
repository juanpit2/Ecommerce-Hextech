import { useEffect, useState } from 'react';
import type { ReviewCard, ReviewInput } from '../../../Type/Reviews';
import { createReview } from '../../../utils/reviewsService';
import { supabase } from '../../../utils/supabaseClient';
import { useAuth } from '../../../context/AuthContext';

type ReviewFormProps = {
    onAddReview: (review: ReviewCard) => void;
    onClose: () => void;
    // si se abre desde la página de producto, se puede pasar el id para asignarla directamente
    productId?: number | null;
};

const ReviewForm: React.FC<ReviewFormProps> = ({ onAddReview, onClose, productId: propsProductId }) => {
    const [formData, setFormData] = useState<{ name: string; rating: number; description: string; product_id?: number | ''}>({
    name: '',
    rating: 5,
    description: '',
    product_id: propsProductId ?? ''
    });
    const [error, setError] = useState('');

        // Productos cargados desde la base de datos
        const [products, setProducts] = useState<Array<{ id: number; name: string }>>([]);
        const { user } = useAuth();

        useEffect(() => {
            let mounted = true;
            (async () => {
                try {
                    const { data, error } = await supabase.from('products').select('id,name');
                    if (!mounted) return;
                    if (error) {
                        console.warn('Could not load products from Supabase, falling back to empty list', error);
                        setProducts([]);
                    } else {
                        setProducts((data as any[]) ?? []);
                    }
                } catch (err) {
                    console.error('Failed to fetch products', err);
                    if (mounted) setProducts([]);
                }
            })();
            return () => { mounted = false; };
        }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: name === 'rating' ? parseFloat(value) : name === 'product_id' ? (value === '' ? '' : parseInt(value)) : value
    }));
    setError('');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validaciones
    if (!formData.name.trim()) {
        setError('Please enter your name');
        return;
    }

    if (formData.description.length < 10) {
        setError('Review must be at least 10 characters long');
        return;
    }

    if (formData.rating < 1 || formData.rating > 5) {
        setError('Rating must be between 1 and 5');
        return;
    }

    // validar producto seleccionado
    if (!formData.product_id) {
        setError('Please select a product to review');
        return;
    }

            // Si tu tabla de reviews requiere usuario autenticado, forzamos login antes de intentar crear
            if (!user) {
                setError('You must be logged in to submit a review');
                return;
            }

            // Construir payload para la DB (hay usuario autenticado, añadimos user_id y usamos su nombre si existe)
        const payload: ReviewInput = {
                product_id: typeof formData.product_id === 'number' ? formData.product_id : null,
                user_id: user?.id ?? null,
                user_name: user?.user_metadata?.full_name ?? formData.name,
                rating: formData.rating,
                comment: formData.description,
        };

        // Intentar persistir en Supabase y mostrar error real si existe
        try {
            const { data, error: createErr } = await createReview(payload);
            if (createErr || !data) {
                console.error('createReview error', createErr);
                setError((createErr && (createErr.message || JSON.stringify(createErr))) || 'Failed to save review. Please try again.');
                return;
            }

            onAddReview(data);
            setFormData({ name: '', rating: 5, description: '', product_id: propsProductId ?? '' });
            } catch (err: any) {
                console.error('Unexpected error creating review', err);
                setError(err?.message ?? String(err) ?? 'Failed to save review.');
                return;
            }
    };

    return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Write a Review</h2>
            <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
            >
            ✕
            </button>
        </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Product selector */}
                        {!propsProductId && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Product</label>
                                <select
                                    name="product_id"
                                    value={formData.product_id as any}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select product...</option>
                                    {products.map((p) => (
                                        <option key={p.id} value={p.id}>{p.name}</option>
                                    ))}
                                </select>
                            </div>
                        )}
          {/* Nombre */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
            </label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
            />
            </div>

          {/* Rating */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
                </label>
                <select
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
                </select>
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Review
                </label>
                <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Share your experience..."
                />
                <span className="text-xs text-gray-500 mt-1 block">
                {formData.description.length}/200 characters
                </span>
            </div>

            {/* Error */}
            {error && (
                <p className="text-red-500 text-sm bg-red-50 p-2 rounded">
                {error}
                </p>
            )}

            {/* Botones */}
            <div className="flex gap-3 pt-4">
                <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                Cancel
                </button>
                <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                Submit Review
                </button>
            </div>
            </form>
        </div>
        </div>
    );
    };

    export default ReviewForm;