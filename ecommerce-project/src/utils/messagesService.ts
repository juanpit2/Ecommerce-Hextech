// Servicio de Mensajes y Chats - Gestion completa del sistema de chat
// Maneja operaciones CRUD para chats y mensajes
// Incluye suscripciones en tiempo real para chat instantaneo

import { supabase } from './supabaseClient';

// === DEFINICION DE TIPOS ===

// Tipo para un mensaje individual completo (leido de BD)
export type Message = {
  id: string;
  chat_id: string;
  sender_id: string;
  sender_name: string;
  message_text: string;
  created_at: string;
};

// Tipo para crear un nuevo mensaje (payload de insercion)
export type MessageInput = {
  chat_id: string;
  sender_id: string;
  sender_name: string;
  message_text: string;
};

// Tipo para un chat de usuario (conversacion)
export type UserChat = {
  id: string;
  user_id: string;
  chat_name: string;
  created_at: string;
  updated_at: string;
};

// Tipo para crear un nuevo chat
export type UserChatInput = {
  user_id: string;
  chat_name: string;
};

// ===== FUNCIONES DE GESTION DE CHATS =====

// Obtener todos los chats del usuario autenticado
// RLS (Row Level Security) filtra automaticamente por user_id
// Retorna chats ordenados por ultima actualizacion
export async function getUserChats(): Promise<{ data?: UserChat[]; error?: any }> {
  try {
    // Consulta a tabla users_chats
    // RLS asegura que solo se obtienen chats del usuario actual
    const { data, error } = await supabase
      .from('users_chats')
      .select('*')
      .order('updated_at', { ascending: false });  // Mas recientes primero

    if (error) return { error };
    return { data: (data || []) as UserChat[] };
  } catch (err) {
    return { error: err };
  }
}

// Crear un nuevo chat para el usuario autenticado
// Parametro: input - Datos del chat (user_id, chat_name)
// Retorna: el chat creado
export async function createUserChat(input: UserChatInput): Promise<{ data?: UserChat; error?: any }> {
  try {
    // Insertar nueva fila en users_chats
    const { data, error } = await supabase
      .from('users_chats')
      .insert([input])
      .select()
      .single();

    if (error) return { error };
    return { data: data as UserChat };
  } catch (err) {
    return { error: err };
  }
}

// Obtener un chat especifico por su ID
// Util para validar acceso o cargar detalles
export async function getUserChatById(chatId: string): Promise<{ data?: UserChat; error?: any }> {
  try {
    // Buscar chat por ID (RLS valida que pertenece al usuario)
    const { data, error } = await supabase
      .from('users_chats')
      .select('*')
      .eq('id', chatId)
      .single();

    if (error) return { error };
    return { data: data as UserChat };
  } catch (err) {
    return { error: err };
  }
}

// Eliminar un chat por ID
// Solo el propietario puede borrar (validado por RLS)
// Nota: si hay ON DELETE CASCADE, tambien borra mensajes asociados
export async function deleteUserChat(chatId: string): Promise<{ error?: any }> {
  try {
    // Borrar chat de la tabla
    const { error } = await supabase
      .from('users_chats')
      .delete()
      .eq('id', chatId);

    if (error) return { error };
    return {};
  } catch (err) {
    return { error: err };
  }
}

// ===== FUNCIONES DE GESTION DE MENSAJES =====

// Obtener todos los mensajes de un chat especifico
// Parametro: chatId - ID del chat a consultar
// Retorna: array de mensajes ordenados cronologicamente
export async function getMessagesByChat(chatId: string): Promise<{ data?: Message[]; error?: any }> {
  try {
    // Consulta filtrada por chat_id (foreign key)
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('chat_id', chatId)  // Solo mensajes de este chat
      .order('created_at', { ascending: true });  // Orden cronologico

    if (error) return { error };
    return { data: (data || []) as Message[] };
  } catch (err) {
    return { error: err };
  }
}

// Insertar un nuevo mensaje en un chat
// Parametro: input - Datos del mensaje (chat_id, sender_id, message_text, etc)
// Retorna: el mensaje creado
export async function createMessage(input: MessageInput): Promise<{ data?: Message; error?: any }> {
  try {
    // Insertar mensaje en tabla messages
    const { data, error } = await supabase
      .from('messages')
      .insert([input])
      .select()
      .single();

    if (error) return { error };
    return { data: data as Message };
  } catch (err) {
    return { error: err };
  }
}

// Eliminar un mensaje especifico por ID
// Util para permitir a usuarios borrar sus propios mensajes
export async function deleteMessage(messageId: string): Promise<{ error?: any }> {
  try {
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', messageId);

    if (error) return { error };
    return {};
  } catch (err) {
    return { error: err };
  }
}

// Suscripcion en tiempo real a nuevos mensajes de un chat
// Permite chat instantaneo sin polling
// Parametros:
//   - chatId: ID del chat a monitorear
//   - callback: Funcion que se ejecuta al recibir mensaje nuevo
// Retorna: objeto de suscripcion (o null si falla)
export function subscribeToMessages(
  chatId: string,
  callback: (message: Message) => void
): any {
  try {
    // Crear canal especifico para este chat
    const subscription = supabase
      .channel(`messages:${chatId}`)  // Canal unico por chat
      .on(
        'postgres_changes',
        {
          event: 'INSERT',  // Solo escuchar inserts
          schema: 'public',
          table: 'messages',
          filter: `chat_id=eq.${chatId}`,  // Filtro: solo mensajes de este chat
        },
        (payload) => {
          // payload.new contiene el mensaje recien insertado
          const newMsg = payload.new as Message;
          callback(newMsg);  // Ejecutar callback con el mensaje
        }
      )
      .subscribe();  // Activar suscripcion

    return subscription;
  } catch (err) {
    console.warn('Realtime subscription not available', err);
    return null;
  }
}
