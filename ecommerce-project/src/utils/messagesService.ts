import { supabase } from './supabaseClient';

// Tipos
export type Message = {
  id: string;
  chat_id: string;
  sender_id: string;
  sender_name: string;
  message_text: string;
  created_at: string;
};

export type MessageInput = {
  chat_id: string;
  sender_id: string;
  sender_name: string;
  message_text: string;
};

export type UserChat = {
  id: string;
  user_id: string;
  chat_name: string;
  created_at: string;
  updated_at: string;
};

export type UserChatInput = {
  user_id: string;
  chat_name: string;
};

// ===== CHATS =====

/**
 * Obtener todos los chats del usuario autenticado
 */
export async function getUserChats(): Promise<{ data?: UserChat[]; error?: any }> {
  try {
    const { data, error } = await supabase
      .from('users_chats')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) return { error };
    return { data: (data || []) as UserChat[] };
  } catch (err) {
    return { error: err };
  }
}

/**
 * Crear un nuevo chat para el usuario autenticado
 */
export async function createUserChat(input: UserChatInput): Promise<{ data?: UserChat; error?: any }> {
  try {
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

/**
 * Obtener un chat específico por ID
 */
export async function getUserChatById(chatId: string): Promise<{ data?: UserChat; error?: any }> {
  try {
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

/**
 * Eliminar un chat (solo el propietario puede hacerlo)
 */
export async function deleteUserChat(chatId: string): Promise<{ error?: any }> {
  try {
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

// ===== MESSAGES =====

/**
 * Obtener todos los mensajes de un chat específico
 */
export async function getMessagesByChat(chatId: string): Promise<{ data?: Message[]; error?: any }> {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('chat_id', chatId)
      .order('created_at', { ascending: true });

    if (error) return { error };
    return { data: (data || []) as Message[] };
  } catch (err) {
    return { error: err };
  }
}

/**
 * Insertar un nuevo mensaje en un chat
 */
export async function createMessage(input: MessageInput): Promise<{ data?: Message; error?: any }> {
  try {
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

/**
 * Eliminar un mensaje específico
 */
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

/**
 * Suscribirse a nuevos mensajes en un chat (realtime)
 */
export function subscribeToMessages(
  chatId: string,
  callback: (message: Message) => void
): any {
  try {
    const subscription = supabase
      .channel(`messages:${chatId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `chat_id=eq.${chatId}`,
        },
        (payload) => {
          const newMsg = payload.new as Message;
          callback(newMsg);
        }
      )
      .subscribe();

    return subscription;
  } catch (err) {
    console.warn('Realtime subscription not available', err);
    return null;
  }
}
