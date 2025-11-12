export enum MessageType {
  USER = 'USER',
  SYSTEM = 'SYSTEM',
}

export interface Message {
  id: number;
  type: MessageType;
  text: string;
  translatedText?: string;
  originalLanguage?: string;
  senderName?: string;
}

export interface Language {
  code: string;
  name: string;
}

export enum BroadcastMessageType {
  MESSAGE = 'MESSAGE',
  USER_JOINED = 'USER_JOINED',
  USER_LEFT = 'USER_LEFT',
  PRESENCE_ANNOUNCEMENT = 'PRESENCE_ANNOUNCEMENT',
}

export interface BroadcastMessage {
  type: BroadcastMessageType;
  senderName: string;
  text?: string;
}