"use client";

import {
  ArrowBigUpIcon,
  type ArrowBigUpIconHandle,
} from "@/components/icons/arrow-big-up";
import { XIcon, type XIconHandle } from "@/components/icons/x";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatSettings } from "@/contexts/chat-settings-context";
import type { ChatModel } from "@/types/chat";
import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import { DefaultChatTransport } from "ai";
import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChatMessage } from "./chat-message";
import { TypingIndicator } from "./typing-indicator";

interface ChatModelComponentProps {
  model: ChatModel;
  canRemove: boolean;
  onRemove: () => void;
  linkedInputs: boolean;
  currentInput: string;
  onInputChange: (value: string) => void;
  onSendMessage: () => Promise<void>;
  onUpdateMessages: (
    modelId: string,
    messages: Array<{
      role: "user" | "assistant";
      content: string;
      timestamp: Date;
    }>
  ) => void;
  onRegisterSubmitHandler: (
    modelId: string,
    submitFn: () => Promise<void>
  ) => void;
  onUnregisterSubmitHandler: (modelId: string) => void;
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
  onUpdateMessages,
  onRegisterSubmitHandler,
  onUnregisterSubmitHandler,
}: ChatModelComponentProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const xIconRef = useRef<XIconHandle>(null);
  const arrowIconRef = useRef<ArrowBigUpIconHandle>(null);
  const [localInput, setLocalInput] = useState("");
  const { settings } = useChatSettings();
  const settingsRef = useRef(settings);
  const lastSyncedCountRef = useRef(0);

  // Keep the ref updated with current settings
  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  const { messages, sendMessage, status } = useChat<
    UIMessage<{ timestamp?: string }>
  >({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      headers: {
        "Content-Type": "application/json",
      },
      prepareSendMessagesRequest: ({ messages, body, id }) => ({
        body: {
          ...body,
          id,
          messages,
          model: `${model.provider.toLowerCase()}/${model.id}`,
          system: settingsRef.current.systemPrompt,
          temperature: settingsRef.current.temperature,
          maxOutputTokens: settingsRef.current.maxOutputTokens,
          topP: settingsRef.current.topP,
          topK: settingsRef.current.topK,
        },
      }),
    }),
  });

  // Update parent component when messages change (only when count changes and not streaming)
  useEffect(() => {
    if (
      messages.length > lastSyncedCountRef.current &&
      status !== "streaming" &&
      status !== "submitted"
    ) {
      const updatedMessages = messages.map((msg) => {
        const textPart = msg.parts.find((part) => part.type === "text");
        return {
          role: msg.role as "user" | "assistant",
          content: textPart?.text || "",
          timestamp: new Date(),
        };
      });
      onUpdateMessages(model.id, updatedMessages);
      lastSyncedCountRef.current = messages.length;
    }
  }, [messages.length, status, model.id, onUpdateMessages, messages]);

  const isLoading = status === "streaming" || status === "submitted";
  const isInputDisabled = status === "streaming" || status === "submitted";
  const showTypingIndicator = status === "submitted";
  const inputValue = linkedInputs ? currentInput : localInput;

  // Register submit handler for this model
  const handleModelSubmit = useCallback(async () => {
    const messageContent = linkedInputs
      ? currentInput.trim()
      : localInput.trim();
    if (!messageContent || isInputDisabled) return;

    // Send message using AI SDK
    await sendMessage({
      role: "user",
      parts: [{ type: "text", text: messageContent }],
    });

    // Clear local input if not linked (linked inputs are cleared by parent)
    if (!linkedInputs) {
      setLocalInput("");
    }
  }, [linkedInputs, currentInput, localInput, isInputDisabled, sendMessage]);

  // Register/unregister submit handler
  useEffect(() => {
    onRegisterSubmitHandler(model.id, handleModelSubmit);
    return () => {
      onUnregisterSubmitHandler(model.id);
    };
  }, [
    model.id,
    handleModelSubmit,
    onRegisterSubmitHandler,
    onUnregisterSubmitHandler,
  ]);

  const handleInputChangeWrapper = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (linkedInputs) {
      onInputChange(value);
    } else {
      setLocalInput(value);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isInputDisabled) return;

    if (linkedInputs) {
      // For linked inputs, use the shared handler
      await onSendMessage();
    } else {
      // For individual inputs, handle locally
      await handleModelSubmit();
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      ) as HTMLElement;
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages, isLoading]);

  return (
    <Card className="flex flex-col h-[600px]">
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${model.color}`} />
            {model.name}
            <Badge variant="outline" className="text-xs">
              {model.provider}
            </Badge>
          </CardTitle>
          {canRemove && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRemove}
              onMouseEnter={() => xIconRef.current?.startAnimation()}
              onMouseLeave={() => xIconRef.current?.stopAnimation()}
            >
              <XIcon ref={xIconRef} size={16} />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 p-4 pt-0 min-h-0">
        <div className="flex-1 min-h-0">
          <ScrollArea className="h-full w-full" ref={scrollAreaRef}>
            <div className="flex flex-col gap-4 p-1 min-h-full">
              <div className="flex-1" />
              <AnimatePresence mode="wait">
                {messages.map((message, index) => {
                  const textPart = message.parts.find(
                    (part) => part.type === "text"
                  );
                  const timestamp = message.metadata?.timestamp
                    ? new Date(message.metadata.timestamp)
                    : new Date();

                  return (
                    <motion.div
                      key={message.id || `${model.id}-${index}`}
                      layout="position"
                      layoutId={`container-${model.id}-[${index}]`}
                      transition={transitionConfig}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <ChatMessage
                        message={{
                          role: message.role as "user" | "assistant",
                          content:
                            textPart?.type === "text" ? textPart.text : "",
                          timestamp: timestamp,
                        }}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              {showTypingIndicator && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full flex justify-start"
                >
                  <div className="max-w-[80%] rounded-2xl bg-gray-200 dark:bg-gray-700">
                    <TypingIndicator />
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollArea>
        </div>

        <div className="mt-4 flex w-full relative flex-shrink-0">
          <form onSubmit={handleFormSubmit} className="flex w-full">
            <input
              type="text"
              onChange={handleInputChangeWrapper}
              value={inputValue}
              className="relative h-10 w-full flex-grow rounded-full border border-input bg-background px-4 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Type your message..."
              disabled={isInputDisabled}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleFormSubmit(e);
                }
              }}
            />

            <motion.div
              key={`${model.id}-input-${messages.length}`}
              layout="position"
              className="pointer-events-none absolute z-10 flex h-10 w-full items-center overflow-hidden break-words rounded-full bg-muted [word-break:break-word]"
              layoutId={`container-${model.id}-[${messages.length}]`}
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
              disabled={!inputValue.trim() || isInputDisabled}
              onMouseEnter={() => arrowIconRef.current?.startAnimation()}
              onMouseLeave={() => arrowIconRef.current?.stopAnimation()}
            >
              <ArrowBigUpIcon ref={arrowIconRef} size={16} />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
