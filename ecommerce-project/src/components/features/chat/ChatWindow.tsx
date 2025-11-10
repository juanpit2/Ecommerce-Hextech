import React from 'react';
import MessageList from './MessageList';

const ChatWindow: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Header con logo y navegación */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">HEXTECH</h1>
            <nav className="flex space-x-4">
              <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
              <a href="/products" className="text-gray-600 hover:text-gray-900">Products</a>
              <a href="/chat" className="text-blue-600 font-medium">Messages</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Contenedor principal del chat */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* El height-[calc(100vh-12rem)] deja espacio para header y padding */}
          <div className="h-[calc(100vh-12rem)]">
            <MessageList />
          </div>
        </div>
      </main>

      {/* Footer opcional */}
      <footer className="bg-gray-800 text-white py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
          © 2023 Hextech. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default ChatWindow;