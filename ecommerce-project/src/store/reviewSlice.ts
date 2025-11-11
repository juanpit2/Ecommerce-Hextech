import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ReviewCard } from "../Type/Reviews";
import reviewsData from "../components/data/reviews.json";

interface ReviewState {
  reviews: ReviewCard[];
}

const initialState: ReviewState = {
  reviews: reviewsData as ReviewCard[],
};

// Cargar reviews del localStorage al iniciar
const loadFromLocalStorage = (): ReviewState => {
  try {
    const saved = localStorage.getItem("reviewsState");
    if (saved) {
      return JSON.parse(saved);
    }
    return initialState;
  } catch {
    return initialState;
  }
};

const reviewSlice = createSlice({
  name: "reviews",
  initialState: loadFromLocalStorage(),
  reducers: {
    // Agregar una nueva reseña
    addReview: (state, action: PayloadAction<ReviewCard>) => {
      state.reviews.unshift(action.payload);
      saveToLocalStorage(state);
    },

    // Eliminar una reseña por ID
    removeReview: (state, action: PayloadAction<string>) => {
      state.reviews = state.reviews.filter((r) => r.id !== action.payload);
      saveToLocalStorage(state);
    },

    // Establecer todas las reseñas (útil para sincronizar)
    setReviews: (state, action: PayloadAction<ReviewCard[]>) => {
      state.reviews = action.payload;
      saveToLocalStorage(state);
    },

    // Limpiar todas las reseñas
    clearReviews: (state) => {
      state.reviews = [];
      saveToLocalStorage(state);
    },
  },
});

// Función para guardar en localStorage
const saveToLocalStorage = (state: ReviewState) => {
  try {
    localStorage.setItem("reviewsState", JSON.stringify(state));
  } catch (error) {
    console.error("Error saving reviews to localStorage:", error);
  }
};

export const { addReview, removeReview, setReviews, clearReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
