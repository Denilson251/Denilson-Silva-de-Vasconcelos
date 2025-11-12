import React from 'react';

interface LandingPageProps {
  onStartChat: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartChat }) => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-8">
        <div className="flex items-center space-x-4 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-cyan-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h.008v.008h-.008v-.008Zm-3 0h.008v.008h-.008v-.008Zm-3 0h.008v.008h-.008v-.008Zm0 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0" />
          </svg>
          <h1 className="text-5xl font-bold tracking-tight">Polyglot Chat</h1>
        </div>
        <h2 className="mt-4 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">
          Break Down Language Barriers, Instantly.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-gray-300">
          Experience seamless, real-time conversations with anyone, anywhere. Our AI-powered chat translates every message into your chosen language. No sign-up required.
        </p>
        <button
          onClick={onStartChat}
          className="mt-10 px-8 py-4 bg-cyan-500 text-white font-bold text-lg rounded-full shadow-lg shadow-cyan-500/50 hover:bg-cyan-600 transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-cyan-300"
        >
          Start Chatting
        </button>
      </div>
      <footer className="absolute bottom-4 text-center text-xs text-gray-500">
        Powered by Google Gemini API
      </footer>
    </div>
  );
};