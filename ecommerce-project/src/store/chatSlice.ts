import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { MessageCard } from "../Type/Messages";

interface ChatState {
  messages: { [chatId: string]: MessageCard[] };
  selectedChat: string;
}

const initialState: ChatState = {
  messages: {},
  selectedChat: "@Blessd",
};

// Cargar del localStorage al iniciar
const loadFromLocalStorage = (): ChatState => {
  try {
    const saved = localStorage.getItem("chatState");
    return saved ? JSON.parse(saved) : initialState;
  } catch {
    return initialState;
  }
};

const chatSlice = createSlice({
  name: "chat",
  initialState: loadFromLocalStorage(),
  reducers: {
    // Establecer todos los mensajes iniciales para un chat
    setMessages: (state, action: PayloadAction<{ chatId: string; messages: MessageCard[] }>) => {
      state.messages[action.payload.chatId] = action.payload.messages;
      saveToLocalStorage(state);
    },

    // Enviar un nuevo mensaje a un chat específico
    sendMessage: (state, action: PayloadAction<{ text: string; selectedChat: string }>) => {
      const chatId = action.payload.selectedChat;
      if (!state.messages[chatId]) {
        state.messages[chatId] = [];
      }

      const newMessage: MessageCard = {
        id: `msg-${Date.now()}`,
        sender: "You",
        message: action.payload.text,
        timestamp: new Date().toISOString(),
        isUser: true,
      };
      state.messages[chatId].push(newMessage);
      saveToLocalStorage(state);
    },

    // Cambiar el chat seleccionado
    setSelectedChat: (state, action: PayloadAction<string>) => {
      state.selectedChat = action.payload;
      saveToLocalStorage(state);
    },

    // Limpiar los mensajes de un chat
    clearMessages: (state, action: PayloadAction<string>) => {
      state.messages[action.payload] = [];
      saveToLocalStorage(state);
    },

    // Agregar un mensaje (útil para simular respuestas)
    addMessage: (state, action: PayloadAction<{ chatId: string; message: MessageCard }>) => {
      const chatId = action.payload.chatId;
      if (!state.messages[chatId]) {
        state.messages[chatId] = [];
      }
      state.messages[chatId].push(action.payload.message);
      saveToLocalStorage(state);
    },
  },
});

// Función para guardar en localStorage
const saveToLocalStorage = (state: ChatState) => {
  try {
    localStorage.setItem("chatState", JSON.stringify(state));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

export const { setMessages, sendMessage, setSelectedChat, clearMessages, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
