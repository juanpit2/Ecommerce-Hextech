import { supabase } from './supabaseClient';
import type { ReviewDB, ReviewInput, ReviewCard } from '../Type/Reviews';

export async function getAllReviews(): Promise<{ data?: ReviewCard[]; error?: any }> {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return { error };

  const mapped: ReviewCard[] = (data || []).map((r) => ({
    id: r.id,
    name: r.user_name || 'Anonymous',
    rating: r.rating,
    description: r.comment,
  }));

  return { data: mapped };
}

export async function getReviewsByProduct(productId: number): Promise<{ data?: ReviewCard[]; error?: any }> {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('product_id', productId)
    .order('created_at', { ascending: false });

  if (error) return { error };

  const mapped: ReviewCard[] = (data || []).map((r) => ({
    id: r.id,
    name: r.user_name || 'Anonymous',
    rating: r.rating,
    description: r.comment,
  }));

  return { data: mapped };
}

export async function createReview(input: ReviewInput): Promise<{ data?: ReviewCard; error?: any }> {
  const { data, error } = await supabase
    .from('reviews')
    .insert([input])
    .select()
    .single();

  if (error) return { error };

  const r = data as ReviewDB;
  const mapped: ReviewCard = {
    id: r.id,
    name: r.user_name || 'Anonymous',
    rating: r.rating,
    description: r.comment,
  };

  return { data: mapped };
}

// Opcional: suscribir a nuevos inserts. Devuelve el objeto de suscripción o null si no está disponible.
export function subscribeReviews(callback: (review: ReviewCard) => void) {
  try {
    // Supabase v2 realtime pattern
    const subscription = supabase
      .channel('public:reviews')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'reviews' },
        (payload) => {
          const r = payload.new as ReviewDB;
          callback({ id: r.id, name: r.user_name || 'Anonymous', rating: r.rating, description: r.comment });
        }
      )
      .subscribe();

    return subscription;
  } catch (err) {
    // Si no está disponible la API, devolver null
    console.warn('Realtime subscription not available', err);
    return null as any;
  }
}
