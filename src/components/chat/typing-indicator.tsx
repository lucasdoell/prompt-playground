"use client";

import { Bot } from "lucide-react";

interface TypingIndicatorProps {
  modelColor: string;
}

export function TypingIndicator({ modelColor }: TypingIndicatorProps) {
  return (
    <div className="flex gap-3 justify-start">
      <div className="flex gap-2">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${modelColor}`}
        >
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div className="rounded-lg p-3 bg-muted">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            />
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
