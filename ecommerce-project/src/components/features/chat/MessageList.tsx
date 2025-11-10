import { useState, useEffect } from 'react';
import type { MessageCard } from '../../../Type/Messages';
import messagesData from '../../data/messages.json';
import ChatWindow from './ChatWindow';


const MessageList = () => {
  const [allMessages] = useState<MessageCard[]>(messagesData);
  const [currentMessages, setCurrentMessages] = useState<MessageCard[]>([]);
  const [selectedChat, setSelectedChat] = useState('@Blessd');
  
  // Filtrar mensajes cuando cambie el chat seleccionado
  useEffect(() => {
    const filtered = allMessages.filter(msg => 
      msg.sender === selectedChat || (msg.isUser && msg.sender === "You")
    );
    setCurrentMessages(filtered);
  }, [selectedChat, allMessages]);

  const chatUsers = [
    { id: '@Blessd', initial: 'B', color: 'bg-yellow-200' },
    { id: '@Pirlo', initial: 'P', color: 'bg-green-200' },
    { id: '@Kris R', initial: 'K', color: 'bg-purple-200' },
    { id: '@Feid', initial: 'F', color: 'bg-blue-200' }
  ];

  return (
    <div className="flex h-full bg-gray-50">
      {/* Sidebar - Lista de chats (sin border) */}
      <div className="w-56 bg-white">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Chats</h2>
          <div className="space-y-4">
            {chatUsers.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`w-full flex items-center gap-3 p-2 rounded-lg
                  ${selectedChat === chat.id 
                    ? 'bg-yellow-100' 
                    : 'hover:bg-gray-50'
                  }`}
              >
                <div className={`w-10 h-10 rounded-full ${chat.color} flex items-center justify-center text-base font-medium`}>
                  {chat.initial}
                </div>
                <span className="text-sm">{chat.id}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Area de chat */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Header del chat (sin border) */}
        <div className="px-6 py-4 bg-white flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${
            chatUsers.find(u => u.id === selectedChat)?.color || 'bg-gray-200'
          } flex items-center justify-center text-base font-medium`}>
            {selectedChat[1]}
          </div>
          <h3 className="text-lg font-medium">{selectedChat}</h3>
        </div>

        {/* Mensajes */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {currentMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex items-start gap-2">
                {!msg.isUser && (
                  <div className={`w-8 h-8 rounded-full ${
                    chatUsers.find(u => u.id === msg.sender)?.color || 'bg-gray-200'
                  } flex items-center justify-center text-sm font-medium mt-1`}>
                    {msg.sender[1]}
                  </div>
                )}
                <div
                  className={`max-w-[320px] rounded-2xl px-4 py-3 ${
                    msg.isUser
                      ? 'bg-blue-500 text-white'
                      : 'bg-yellow-100'
                  }`}
                >
                  {!msg.isUser && (
                    <div className="text-sm font-medium mb-1">{msg.sender}</div>
                  )}
                  <p className="text-sm">{msg.message}</p>
                  <span className={`text-xs ${msg.isUser ? 'text-white/70' : 'text-gray-500'} mt-1 block`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input de mensaje (sin border) */}
        <div className="p-4 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 bg-gray-50 rounded-lg text-sm placeholder-gray-400 focus:outline-none"
            />
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg text-sm font-medium">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageList;