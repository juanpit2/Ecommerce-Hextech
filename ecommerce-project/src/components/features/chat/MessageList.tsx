import { useState } from 'react';
import type { MessageCard } from '../../../Type/Messages';
import messagesData from '../../data/messages.json';

const MessageList = () => {
  const [messages] = useState<MessageCard[]>(messagesData);
  const [selectedChat, setSelectedChat] = useState('@Blessd');

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Lista de chats */}
      <div className="w-64 bg-white border-r">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Chats</h2>
          <div className="space-y-2">
            {['@Blessd', '@Pirlo', '@Kria R', '@Feid'].map((chat) => (
              <button
                key={chat}
                onClick={() => setSelectedChat(chat)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg ${
                  selectedChat === chat 
                    ? 'bg-yellow-100' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center">
                  {chat[1]}
                </div>
                <span className="text-sm font-medium">{chat}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Area de chat */}
      <div className="flex-1 flex flex-col">
        {/* Header del chat */}
        <div className="bg-white border-b p-4 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-yellow-200 flex items-center justify-center">
            {selectedChat[1]}
          </div>
          <h3 className="text-lg font-semibold">{selectedChat}</h3>
        </div>

        {/* Mensajes */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                  msg.isUser
                    ? 'bg-blue-100 text-blue-900'
                    : 'bg-yellow-100 text-yellow-900'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  {!msg.isUser && (
                    <div className="w-6 h-6 rounded-full bg-yellow-200 flex items-center justify-center text-xs">
                      {msg.sender[1]}
                    </div>
                  )}
                  <span className="text-sm font-medium">{msg.sender}</span>
                </div>
                <p className="text-sm">{msg.message}</p>
                <span className="text-xs opacity-50 mt-1 block">
                  {new Date(msg.timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input de mensaje */}
        <div className="bg-white border-t p-4">
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageList;