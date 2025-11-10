import React from 'react';
import MessageList from './MessageList';

const ChatWindow = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-[1000px] h-[600px] bg-white shadow-lg rounded-lg p-6 flex flex-col">
        <MessageList />
      </div>
    </div>
  );
};

export default ChatWindow;