import React, { useEffect, useRef } from 'react';
import { Message } from '../types';
import { ChatMessage } from './ChatMessage';

interface MessageListProps {
  messages: Message[];
  currentUser: string;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, currentUser }) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <ChatMessage 
          key={msg.id} 
          message={msg} 
          isMe={msg.senderName === currentUser}
        />
      ))}
      <div ref={endOfMessagesRef} />
    </div>
  );
};
