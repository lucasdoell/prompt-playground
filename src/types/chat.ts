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
  featured?: boolean;
}

// AI SDK Compatible Message Parts - matching the actual AI SDK types
export interface TextPart {
  type: "text";
  text: string;
}

export interface ReasoningPart {
  type: "reasoning";
  text: string;
}

export interface ToolInvocationPart {
  type: "tool-invocation";
  toolInvocation: {
    state: "partial-call" | "call" | "result" | "error";
    toolCallId: string;
    toolName: string;
    args?: Record<string, unknown>;
    result?: Record<string, unknown>;
    errorMessage?: string;
  };
}

export interface SourcePart {
  type: "source";
  source: {
    sourceType: "url";
    id: string;
    url: string;
    title?: string;
  };
}

export interface FilePart {
  type: "file";
  mediaType: string;
  filename?: string;
  url: string;
}

export interface StepStartPart {
  type: "step-start";
}

// Union type for all message parts
export type MessagePart =
  | TextPart
  | ReasoningPart
  | ToolInvocationPart
  | SourcePart
  | FilePart
  | StepStartPart;

// Legacy chat message type for backward compatibility
export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  parts?: MessagePart[]; // Optional for backward compatibility
}

// Enhanced message type that matches AI SDK UIMessage structure
export interface EnhancedChatMessage {
  role: "user" | "assistant";
  parts: MessagePart[];
  timestamp: Date;
  metadata?: {
    timestamp?: string;
    [key: string]: unknown;
  };
}

// Type guard to check if a message has parts
export function isEnhancedMessage(
  message: ChatMessage | EnhancedChatMessage
): message is EnhancedChatMessage {
  return "parts" in message && Array.isArray(message.parts);
}
