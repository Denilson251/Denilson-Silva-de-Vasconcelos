import React from 'react';
import { Message, MessageType } from '../types';

interface ChatMessageProps {
  message: Message;
  isMe: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isMe }) => {
  if (message.type === MessageType.SYSTEM) {
    return (
      <div className="text-center my-2">
        <span className="text-xs text-gray-400 italic bg-gray-800/60 px-3 py-1 rounded-full">
          {message.text}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-end gap-3 ${isMe ? 'justify-end' : 'justify-start'}`}>
      {!isMe && (
        <div title={message.senderName} className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold flex-shrink-0">
          {message.senderName?.charAt(0).toUpperCase()}
        </div>
      )}
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg rounded-xl p-3 shadow-md ${
          isMe
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-gray-700 text-gray-200 rounded-bl-none'
        }`}
      >
        {!isMe && <p className="text-xs font-bold text-cyan-300 mb-1">{message.senderName}</p>}
        <p className="text-sm">{message.translatedText}</p>
        <p className="text-xs text-gray-400 mt-2 pt-1 border-t border-white/20">
          Original ({message.originalLanguage}): <span className="italic">{message.text}</span>
        </p>
      </div>
       {isMe && (
        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold flex-shrink-0 text-sm" title={message.senderName}>
          You
        </div>
      )}
    </div>
  );
};