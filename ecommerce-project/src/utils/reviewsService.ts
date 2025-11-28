// Servicio de Reviews - Operaciones CRUD para reseñas de productos
// Maneja toda la logica de negocio relacionada con reviews
// Abstrae las llamadas a Supabase y transforma los datos

import { supabase } from './supabaseClient';
import type { ReviewDB, ReviewInput, ReviewCard } from '../Type/Reviews';

// Obtener todas las reseñas de la base de datos
// Retorna: array de ReviewCard ordenado por fecha (mas recientes primero)
export async function getAllReviews(): Promise<{ data?: ReviewCard[]; error?: any }> {
  // Consulta a la tabla reviews en Supabase
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false });

  // Si hay error, retornar inmediatamente
  if (error) return { error };

  // Mapear datos de BD (ReviewDB) al formato de UI (ReviewCard)
  // Transforma nombres de campos: user_name -> name, comment -> description
  const mapped: ReviewCard[] = (data || []).map((r) => ({
    id: r.id,
    name: r.user_name || 'Anonymous',
    rating: r.rating,
    description: r.comment,
  }));

  return { data: mapped };
}

// Obtener reseñas filtradas por producto especifico
// Parametro: productId - ID del producto a consultar
// Retorna: array de ReviewCard solo de ese producto
export async function getReviewsByProduct(productId: number): Promise<{ data?: ReviewCard[]; error?: any }> {
  // Consulta con filtro por product_id (foreign key)
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('product_id', productId)  // Filtro: solo reviews de este producto
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

// Crear una nueva reseña en la base de datos
// Parametro: input - Datos de la review (product_id, user_id, rating, comment, etc)
// Retorna: la review creada en formato ReviewCard
export async function createReview(input: ReviewInput): Promise<{ data?: ReviewCard; error?: any }> {
  // Insertar nueva fila en tabla reviews y retornar el registro creado
  const { data, error } = await supabase
    .from('reviews')
    .insert([input])  // Array de objetos a insertar
    .select()         // Retornar el registro insertado
    .single();        // Esperar un solo resultado

  if (error) return { error };

  // Castear y mapear al formato de UI
  const r = data as ReviewDB;
  const mapped: ReviewCard = {
    id: r.id,
    name: r.user_name || 'Anonymous',
    rating: r.rating,
    description: r.comment,
  };

  return { data: mapped };
}

// Suscripcion en tiempo real a nuevas reviews
// Usa Supabase Realtime para notificar cuando se inserta una review
// Parametro: callback - Funcion que se ejecuta al recibir nueva review
// Retorna: objeto de suscripcion (o null si falla)
export function subscribeReviews(callback: (review: ReviewCard) => void) {
  try {
    // Patron de Supabase v2 para realtime
    // Crea un canal y escucha eventos INSERT en la tabla reviews
    const subscription = supabase
      .channel('public:reviews')  // Canal unico para esta tabla
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'reviews' },  // Filtros
        (payload) => {
          // payload.new contiene la fila recien insertada
          const r = payload.new as ReviewDB;
          // Ejecutar callback con datos transformados
          callback({ id: r.id, name: r.user_name || 'Anonymous', rating: r.rating, description: r.comment });
        }
      )
      .subscribe();  // Activar la suscripcion

    return subscription;
  } catch (err) {
    // Manejo de error: si Realtime no esta disponible o falla
    console.warn('Realtime subscription not available', err);
    return null as any;
  }
}
