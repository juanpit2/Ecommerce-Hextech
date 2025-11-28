export type ReviewCard = {
    id: string;
    name: string;
    rating: number;
    description: string;
};

// Representación de la fila tal como está en la tabla `reviews` de Supabase
export type ReviewDB = {
    id: string;
    product_id?: number | null;
    user_id?: string | null;
    user_name: string;
    rating: number;
    comment: string;
    created_at?: string;
    updated_at?: string;
};

// Payload para insertar una review en la DB
export type ReviewInput = {
    product_id?: number | null;
    user_id?: string | null;
    user_name: string;
    rating: number;
    comment: string;
};