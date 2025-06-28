"use client";

import type React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ChatModel } from "@/types/chat";
import { Send, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
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

const transitionConfig = {
  type: "spring" as const,
  duration: 0.3,
  bounce: 0.1,
};

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
  const [localInput, setLocalInput] = useState("");

  const inputValue = linkedInputs ? currentInput : localInput;
  const handleInputChange = (value: string) => {
    if (linkedInputs) {
      onInputChange(value);
    } else {
      setLocalInput(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    if (!linkedInputs) {
      // For individual model, we need to handle the message locally
      // This would need to be handled by the parent component
      setLocalInput("");
    }
    onSendMessage();
  };

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
          <div className="flex flex-col items-end justify-end min-h-full pb-4">
            <AnimatePresence mode="wait">
              {model.messages.map((message, index) => (
                <motion.div
                  key={`${model.id}-${index}`}
                  layout="position"
                  className={`z-10 mt-2 max-w-[80%] break-words rounded-2xl ${
                    message.role === "user"
                      ? "bg-blue-500 text-white self-end"
                      : `${model.color.replace(
                          "bg-",
                          "bg-opacity-20 bg-"
                        )} text-foreground self-start`
                  }`}
                  layoutId={`container-${model.id}-[${index}]`}
                  transition={transitionConfig}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <div className="px-3 py-2 text-sm leading-relaxed">
                    {message.content}
                  </div>
                  <div className="px-3 pb-1 text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {model.isTyping && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`mt-2 rounded-2xl ${model.color.replace(
                  "bg-",
                  "bg-opacity-20 bg-"
                )} self-start`}
              >
                <TypingIndicator />
              </motion.div>
            )}
          </div>
        </ScrollArea>

        <div className="mt-4 flex w-full relative">
          <form onSubmit={handleSubmit} className="flex w-full">
            <input
              type="text"
              onChange={(e) => handleInputChange(e.target.value)}
              value={inputValue}
              className="relative h-10 w-full flex-grow rounded-full border border-input bg-background px-4 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Type your message..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />

            <motion.div
              key={`${model.id}-input-${model.messages.length}`}
              layout="position"
              className="pointer-events-none absolute z-10 flex h-10 w-full items-center overflow-hidden break-words rounded-full bg-muted [word-break:break-word]"
              layoutId={`container-${model.id}-[${model.messages.length}]`}
              transition={transitionConfig}
              initial={{ opacity: 0.6, zIndex: -1 }}
              animate={{ opacity: 0.6, zIndex: -1 }}
              exit={{ opacity: 1, zIndex: 1 }}
            >
              <div className="px-4 py-2 text-sm leading-relaxed text-foreground">
                {inputValue}
              </div>
            </motion.div>

            <Button
              type="submit"
              size="sm"
              className="ml-2 h-10 w-10 rounded-full p-0"
              disabled={!inputValue.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
