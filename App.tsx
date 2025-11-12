import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Message, BroadcastMessage, BroadcastMessageType, MessageType } from './types';
import { translateText, detectLanguage } from './services/geminiService';
import { SUPPORTED_LANGUAGES } from './constants';
import { LanguageSelector } from './components/LanguageSelector';
import { MessageList } from './components/MessageList';
import { ChatInput } from './components/ChatInput';
import { JoinRoomPage } from './components/JoinRoomPage';
import { ParticipantList } from './components/ParticipantList';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [participants, setParticipants] = useState<string[]>([]);
  const [targetLanguage, setTargetLanguage] = useState<string>('English');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<{ name: string; room: string; effectiveRoom: string; } | null>(null);
  const channel = useRef<BroadcastChannel | null>(null);

  const processMessage = useCallback(async (broadcastMsg: BroadcastMessage, targetLang: string) => {
    if (broadcastMsg.type !== BroadcastMessageType.MESSAGE || !broadcastMsg.text) return;
    
    const { text, senderName } = broadcastMsg;
    const id = Date.now() + Math.random();
    
    const tempMessage: Message = {
      id,
      type: MessageType.USER,
      text,
      translatedText: 'Translating...',
      originalLanguage: 'Detecting...',
      senderName,
    };
    setMessages(prev => [...prev, tempMessage]);

    try {
      const [translatedText, originalLanguage] = await Promise.all([
        translateText(text, targetLang),
        detectLanguage(text),
      ]);

      const updatedMessage = { ...tempMessage, translatedText, originalLanguage };
      setMessages(prev => prev.map(msg => msg.id === id ? updatedMessage : msg));
    } catch (err) {
      console.error("Error processing message:", err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      const errorText = `Error: Could not translate. ${errorMessage}`;
      setError(errorText);
      const failedMessage = { ...tempMessage, translatedText: 'Translation failed', originalLanguage: 'Unknown' };
      setMessages(prev => prev.map(msg => msg.id === id ? failedMessage : msg));
    }
  }, []);

  useEffect(() => {
    if (user) {
      const bc = new BroadcastChannel(user.effectiveRoom);
      channel.current = bc;

      bc.onmessage = (event: MessageEvent<BroadcastMessage>) => {
        const data = event.data;
        switch (data.type) {
          case BroadcastMessageType.MESSAGE:
            processMessage(data, targetLanguage);
            break;
          case BroadcastMessageType.USER_JOINED: {
            setParticipants(prev => [...new Set([...prev, data.senderName])]);
            const systemMessage: Message = {
              id: Date.now() + Math.random(),
              type: MessageType.SYSTEM,
              text: `${data.senderName} has joined the room.`,
            };
            setMessages(prev => [...prev, systemMessage]);

            // Announce presence to the new user
            channel.current?.postMessage({
              type: BroadcastMessageType.PRESENCE_ANNOUNCEMENT,
              senderName: user.name,
            });
            break;
          }
          case BroadcastMessageType.PRESENCE_ANNOUNCEMENT:
            setParticipants(prev => [...new Set([...prev, data.senderName])]);
            break;
          case BroadcastMessageType.USER_LEFT: {
            setParticipants(prev => prev.filter(p => p !== data.senderName));
             const systemMessage: Message = {
              id: Date.now() + Math.random(),
              type: MessageType.SYSTEM,
              text: `${data.senderName} has left the room.`,
            };
            setMessages(prev => [...prev, systemMessage]);
            break;
          }
        }
      };

      // Announce joining
      bc.postMessage({
        type: BroadcastMessageType.USER_JOINED,
        senderName: user.name,
      });

      return () => {
        bc.close();
        channel.current = null;
      };
    }
  }, [user, targetLanguage, processMessage]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (user && channel.current) {
        channel.current.postMessage({
          type: BroadcastMessageType.USER_LEFT,
          senderName: user.name,
        });
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [user]);

  const handleSendMessage = async (inputText: string) => {
    if (!inputText.trim() || !user) return;

    setIsLoading(true);
    setError(null);

    const broadcastMsg: BroadcastMessage = {
      type: BroadcastMessageType.MESSAGE,
      text: inputText,
      senderName: user.name,
    };
    
    channel.current?.postMessage(broadcastMsg);
    
    setTimeout(() => {
        setIsLoading(false);
    }, 500);
  };
  
  const handleLanguageChange = async (newLanguage: string) => {
    setTargetLanguage(newLanguage);
    setIsLoading(true);
    setError(null);
  
    const retranslatedMessages = await Promise.all(
      messages.map(async (msg) => {
        if (msg.type === MessageType.SYSTEM) return msg;
        try {
          const translatedText = await translateText(msg.text, newLanguage);
          return { ...msg, translatedText };
        } catch (err) {
          console.error("Retranslation failed for message:", msg.id, err);
          return { ...msg, translatedText: `Failed to translate to ${newLanguage}` };
        }
      })
    );
  
    setMessages(retranslatedMessages);
    setIsLoading(false);
  };

  const handleJoinChat = (name: string, room: string, password?: string) => {
    const effectiveRoom = password && password.trim() !== '' ? `${room}#${password.trim()}` : room;
    setUser({ name, room, effectiveRoom });
    setParticipants([name]);
    
    const welcomeMessage: Message = {
        id: Date.now(),
        type: MessageType.SYSTEM,
        text: `Welcome, ${name}! You have joined room "${room}".`,
    };
    setMessages([welcomeMessage]);
  };

  if (!user) {
    return <JoinRoomPage onJoinChat={handleJoinChat} />;
  }

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 font-sans">
      <ParticipantList participants={participants} currentUser={user.name} />
      <div className="flex flex-col flex-1">
        <header className="bg-gray-800 shadow-md p-4 flex justify-between items-center z-10 flex-shrink-0">
          <div className="flex items-center space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-cyan-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
              </svg>
              <div>
                <h1 className="text-xl font-bold text-white">Polyglot Chat</h1>
                <p className="text-xs text-gray-400">Room: {user.room}</p>
              </div>
          </div>
          <LanguageSelector
            languages={SUPPORTED_LANGUAGES}
            selectedLanguage={targetLanguage}
            onLanguageChange={handleLanguageChange}
          />
        </header>
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <MessageList messages={messages} currentUser={user.name} />
          {isLoading && <div className="text-center text-gray-400 italic">Sending...</div>}
          {error && <div className="text-center text-red-400 p-2 bg-red-900/50 rounded-md">{error}</div>}
        </main>

        <footer className="bg-gray-800/50 p-4 sticky bottom-0 backdrop-blur-sm flex-shrink-0">
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          <p className="text-center text-xs text-gray-500 mt-2">Powered by Google Gemini API</p>
        </footer>
      </div>
    </div>
  );
};

export default App;