// Slice de Redux para el Chat
// Maneja mensajes locales del chat (opcional, complementa Supabase)
// Util para mantener historial en memoria durante la sesion

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Tipo para un mensaje de chat
export type ChatMessage = {
  id: string;          // ID unico del mensaje
  sender: string;      // Nombre del remitente
  message: string;     // Contenido del mensaje
  timestamp: string;   // Fecha/hora del mensaje
  isUser: boolean;     // true si lo envio el usuario actual
};

// Tipo del estado del slice
interface ChatState {
  messages: ChatMessage[];  // Array de mensajes
}

// Estado inicial (sin mensajes)
const initialState: ChatState = {
  messages: [],
};

// Crear slice con reducers para gestionar mensajes
const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // Agregar un mensaje al historial
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
    },
    // Reemplazar todos los mensajes (util al cargar desde BD)
    setMessages: (state, action: PayloadAction<ChatMessage[]>) => {
      state.messages = action.payload;
    },
    // Limpiar historial (al cambiar de chat o cerrar sesion)
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

// Exportar acciones
export const { addMessage, setMessages, clearMessages } = chatSlice.actions;
// Exportar reducer
export default chatSlice.reducer;
