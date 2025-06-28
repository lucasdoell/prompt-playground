"use client";

import type { ChatMessage as ChatMessageType } from "@/types/chat";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: ChatMessageType;
  modelColor: string;
}

export function ChatMessage({ message, modelColor }: ChatMessageProps) {
  return (
    <div
      className={`flex gap-3 ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex gap-2 max-w-[80%] ${
          message.role === "user" ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            message.role === "user" ? "bg-blue-500" : modelColor
          }`}
        >
          {message.role === "user" ? (
            <User className="w-4 h-4 text-white" />
          ) : (
            <Bot className="w-4 h-4 text-white" />
          )}
        </div>
        <div
          className={`rounded-lg p-3 ${
            message.role === "user" ? "bg-blue-500 text-white" : "bg-muted"
          }`}
        >
          <p className="text-sm">{message.content}</p>
          <p className="text-xs opacity-70 mt-1">
            {message.timestamp.toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
}
