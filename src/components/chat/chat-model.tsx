"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import type { ChatModel } from "@/types/chat";
import { Send, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { ChatMessage } from "./chat-message";
import { TypingIndicator } from "./typing-indicator";

interface ChatModelComponentProps {
  model: ChatModel;
  canRemove: boolean;
  onRemove: () => void;
  linkedInputs: boolean;
  currentInput: string;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
}

export function ChatModelComponent({
  model,
  canRemove,
  onRemove,
  linkedInputs,
  currentInput,
  onInputChange,
  onSendMessage,
}: ChatModelComponentProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [model.messages, model.isTyping]);

  return (
    <Card className="flex flex-col h-[600px]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${model.color}`} />
            {model.name}
            <Badge variant="outline" className="text-xs">
              {model.provider}
            </Badge>
          </CardTitle>
          {canRemove && (
            <Button variant="ghost" size="sm" onClick={onRemove}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 p-4 pt-0">
        <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
          <div className="space-y-4">
            {model.messages.map((message, index) => (
              <ChatMessage
                key={index}
                message={message}
                modelColor={model.color}
              />
            ))}
            {model.isTyping && <TypingIndicator modelColor={model.color} />}
          </div>
        </ScrollArea>

        <div className="mt-4 flex gap-2">
          <Textarea
            placeholder="Type your message..."
            value={linkedInputs ? currentInput : ""}
            onChange={(e) => onInputChange(e.target.value)}
            className="flex-1 min-h-[60px] resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSendMessage();
              }
            }}
          />
          <Button onClick={onSendMessage} disabled={!currentInput.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
