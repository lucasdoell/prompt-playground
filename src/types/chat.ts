export interface ChatModel {
  id: string;
  name: string;
  provider: string;
  color: string;
  description?: string;
  capabilities?: string[];
  messages: Array<{
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
  }>;
  isTyping: boolean;
}

export interface AvailableModel {
  id: string;
  name: string;
  provider: string;
  color: string;
  description: string;
  capabilities: string[];
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
