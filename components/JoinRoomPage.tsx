import React, { useState } from 'react';

interface JoinRoomPageProps {
  onJoinChat: (name: string, room: string, password?: string) => void;
}

export const JoinRoomPage: React.FC<JoinRoomPageProps> = ({ onJoinChat }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && room.trim()) {
      onJoinChat(name, room, password);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-8 bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700">
        <div className="flex items-center space-x-3 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-cyan-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
            </svg>
            <h1 className="text-4xl font-bold tracking-tight">Join Polyglot Chat</h1>
        </div>
        <p className="mb-8 text-gray-300 max-w-sm">Enter your name and a room name to start chatting across languages.</p>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-200"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="Room Name"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-200"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password (optional)"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-200"
            />
          </div>
           <p className="text-xs text-gray-500 -mt-2 mb-6">Leave the password empty to create a public room.</p>
          <button
            type="submit"
            disabled={!name.trim() || !room.trim()}
            className="w-full px-8 py-3 bg-cyan-500 text-white font-bold text-lg rounded-lg shadow-lg shadow-cyan-500/30 hover:bg-cyan-600 transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-cyan-300 disabled:bg-gray-600 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none"
          >
            Join Chat
          </button>
        </form>
      </div>
      <footer className="absolute bottom-4 text-center text-xs text-gray-500">
        Powered by Google Gemini API
      </footer>
    </div>
  );
};
