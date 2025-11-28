import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../../../store/chatSlice';
import { useAuth } from '../../../context/AuthContext';
import { getUserChats, getMessagesByChat, createMessage, createUserChat, deleteUserChat } from '../../../utils/messagesService';
import type { UserChat, Message } from '../../../utils/messagesService';

const MessageList = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const localMessages = useSelector((state: any) => state.chat?.messages || []);

  // Estado para chats y mensajes desde DB
  const [userChats, setUserChats] = useState<UserChat[]>([]);
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [selectedChatName, setSelectedChatName] = useState('');
  const [newMessageText, setNewMessageText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateChatInput, setShowCreateChatInput] = useState(false);
  const [newChatName, setNewChatName] = useState('');
  
  // Cargar chats del usuario al montar
  useEffect(() => {
    console.log('MessageList mounted, user:', user?.id);
    
    if (!user) {
      console.warn('No authenticated user found');
      setLoading(false);
      setError('You must be logged in to use chat');
      // Limpiar estado cuando no hay usuario
      setUserChats([]);
      setCurrentMessages([]);
      setSelectedChatId(null);
      setSelectedChatName('');
      return;
    }

    let mounted = true;
    (async () => {
      console.log('Fetching chats for user:', user.id);
      const { data, error: err } = await getUserChats();
      if (!mounted) return;
      if (err) {
        console.error('Error loading chats:', err);
        setError(`Failed to load chats: ${err?.message || JSON.stringify(err)}`);
        setLoading(false);
        return;
      }
      console.log('Chats loaded:', data);
      setUserChats(data || []);
      // Seleccionar primer chat si existe
      if ((data || []).length > 0) {
        setSelectedChatId(data![0].id);
        setSelectedChatName(data![0].chat_name);
        console.log('Selected first chat:', data![0].chat_name);
      } else {
        console.warn('No chats found for this user');
        setSelectedChatId(null);
        setSelectedChatName('');
        setError('No chats available. Create one first.');
      }
      setLoading(false);
    })();

    return () => { mounted = false; };
  }, [user]);

  // Cargar mensajes cuando cambia el chat seleccionado
  useEffect(() => {
    if (!selectedChatId) return;

    let mounted = true;
    (async () => {
      const { data, error: err } = await getMessagesByChat(selectedChatId);
      if (!mounted) return;
      if (err) {
        console.error('Error loading messages:', err);
        setCurrentMessages([]);
      } else {
        setCurrentMessages(data || []);
      }
    })();

    return () => { mounted = false; };
  }, [selectedChatId]);

  // Manejar envío de mensaje
  const handleSendMessage = async () => {
    console.log('handleSendMessage called:', { newMessageText, selectedChatId, user: user?.id });
    
    // Validaciones
    if (!newMessageText.trim()) {
      console.warn('Empty message');
      setError('Please type a message');
      return;
    }

    if (!selectedChatId) {
      console.warn('No chat selected');
      setError('Please select a chat first');
      return;
    }

    if (!user) {
      console.warn('User not authenticated');
      setError('You must be logged in to send messages');
      return;
    }

    console.log('All validations passed, sending message...');

    const messagePayload = {
      chat_id: selectedChatId,
      sender_id: user.id,
      sender_name: user.user_metadata?.full_name || user.email || 'Anonymous',
      message_text: newMessageText,
    };

    console.log('Message payload:', messagePayload);

    try {
      const { data: savedMsg, error: err } = await createMessage(messagePayload);
      
      console.log('Create message response:', { savedMsg, err });

      if (err) {
        console.error('Error sending message:', err);
        setError(`Failed to send message: ${err?.message || JSON.stringify(err)}`);
        return;
      }

      // Agregar a estado local (Redux y UI)
      if (savedMsg) {
        console.log('Message saved successfully, updating UI...');
        setCurrentMessages(prev => [...prev, savedMsg]);
        dispatch(addMessage({
          id: savedMsg.id,
          sender: savedMsg.sender_name,
          message: savedMsg.message_text,
          timestamp: savedMsg.created_at,
          isUser: true,
        }));
      }
      setNewMessageText('');
      setError('');
    } catch (exception) {
      console.error('Exception in handleSendMessage:', exception);
      setError(`Exception: ${String(exception)}`);
    }
  };

  // Cambiar chat seleccionado
  const handleSelectChat = (chat: UserChat) => {
    setSelectedChatId(chat.id);
    setSelectedChatName(chat.chat_name);
  };

  // Crear nuevo chat
  const handleCreateChat = async () => {
    if (!newChatName.trim()) {
      setError('Please enter a chat name');
      return;
    }

    if (!user) {
      setError('You must be logged in to create a chat');
      return;
    }

    console.log('Creating chat with name:', newChatName);

    const { data: newChat, error: err } = await createUserChat({
      user_id: user.id,
      chat_name: newChatName,
    });

    if (err) {
      console.error('Error creating chat:', err);
      setError(`Failed to create chat: ${err?.message || JSON.stringify(err)}`);
      return;
    }

    if (newChat) {
      console.log('Chat created:', newChat);
      setUserChats(prev => [newChat, ...prev]);
      setSelectedChatId(newChat.id);
      setSelectedChatName(newChat.chat_name);
      setNewChatName('');
      setShowCreateChatInput(false);
      setError('');
    }
  };

  // Borrar chat actual (solo propietario por RLS)
  const handleDeleteChat = async (chatId: string) => {
    const ok = window.confirm('Are you sure you want to delete this chat? This will also remove its messages.');
    if (!ok) return;
    const { error } = await deleteUserChat(chatId);
    if (error) {
      console.error('Error deleting chat:', error);
      setError(`Failed to delete chat: ${error?.message || JSON.stringify(error)}`);
      return;
    }
    // Remove from local list and clear selection if needed
    setUserChats(prev => prev.filter(c => c.id !== chatId));
    if (selectedChatId === chatId) {
      const next = userChats.filter(c => c.id !== chatId);
      setSelectedChatId(next.length ? next[0].id : null);
      setSelectedChatName(next.length ? next[0].chat_name : '');
      setCurrentMessages([]);
    }
    setError('');
  };
  return (
    <div className="flex h-full bg-gray-50">
      {/* Sidebar - Lista de chats */}
      <div className="w-56 bg-white">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Chats</h2>
            <button
              onClick={() => setShowCreateChatInput(!showCreateChatInput)}
              className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium hover:bg-blue-600"
            >
              +
            </button>
          </div>

          {/* Input para crear chat */}
          {showCreateChatInput && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <input
                type="text"
                placeholder="Chat name..."
                value={newChatName}
                onChange={(e) => setNewChatName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCreateChat()}
                className="w-full px-2 py-1 bg-white border border-blue-300 rounded text-sm mb-2 focus:outline-none"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleCreateChat}
                  className="flex-1 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium hover:bg-blue-600"
                >
                  Create
                </button>
                <button
                  onClick={() => {
                    setShowCreateChatInput(false);
                    setNewChatName('');
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 px-2 py-1 rounded text-xs font-medium hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {loading && <p className="text-sm text-gray-500">Loading...</p>}
          <div className="space-y-4">
            {userChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => handleSelectChat(chat)}
                className={`w-full flex items-center gap-3 p-2 rounded-lg
                  ${selectedChatId === chat.id 
                    ? 'bg-yellow-100' 
                    : 'hover:bg-gray-50'
                  }`}
              >
                <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-base font-medium">
                  {chat.chat_name[0].toUpperCase()}
                </div>
                <span className="text-sm">{chat.chat_name}</span>
                <div className="ml-auto flex items-center gap-2">
                  <button
                    title="Delete chat"
                    onClick={(e) => { e.stopPropagation(); handleDeleteChat(chat.id); }}
                    className="text-red-600 hover:text-red-700 text-sm px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Area de chat */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Header del chat */}
        <div className="px-6 py-4 bg-white flex items-center gap-3 border-b">
          <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-base font-medium">
            {selectedChatName[0]?.toUpperCase() || '?'}
          </div>
          <h3 className="text-lg font-medium">{selectedChatName || 'Select a chat'}</h3>
        </div>

        {/* Mensajes */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded fixed top-20 right-20 z-50 max-w-xs">
              <p className="text-sm font-semibold">Error:</p>
              <p className="text-xs">{error}</p>
            </div>
          )}
          {currentMessages.length === 0 && !loading && (
            <p className="text-gray-400 text-center py-6">No messages yet. Start the conversation!</p>
          )}
          {currentMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex items-start gap-2">
                {msg.sender_id !== user?.id && (
                  <div className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center text-sm font-medium mt-1">
                    {msg.sender_name[0].toUpperCase()}
                  </div>
                )}
                <div
                  className={`max-w-xs rounded-2xl px-4 py-3 ${
                    msg.sender_id === user?.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-yellow-100'
                  }`}
                >
                  {msg.sender_id !== user?.id && (
                    <div className="text-sm font-medium mb-1">{msg.sender_name}</div>
                  )}
                  <p className="text-sm">{msg.message_text}</p>
                  <span className={`text-xs ${msg.sender_id === user?.id ? 'text-white/70' : 'text-gray-500'} mt-1 block`}>
                    {new Date(msg.created_at).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input de mensaje */}
        <div className="p-4 bg-white border-t">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessageText}
              onChange={(e) => setNewMessageText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 px-4 py-2 bg-gray-50 rounded-lg text-sm placeholder-gray-400 focus:outline-none"
            />
            <button 
              onClick={handleSendMessage}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageList;