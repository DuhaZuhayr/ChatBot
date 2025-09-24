import { User } from '@supabase/supabase-js';

export interface Message {
  id?: string;
  text: string;
  isUser: boolean;
  timestamp?: Date;
}

export interface ChatSession {
  userId: string;
  messages: Message[];
}