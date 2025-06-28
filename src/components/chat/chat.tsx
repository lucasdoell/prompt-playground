"use client";

import type { AvailableModel, ChatModel } from "@/types/chat";
import { useEffect, useRef, useState } from "react";
import { ChatControls } from "./chat-controls";
import { ChatModelComponent } from "./chat-model";

interface ChatProps {
  availableModels: AvailableModel[];
  initialModels?: string[];
  linkedInputs?: boolean;
  onRemoveModel?: (modelId: string) => void;
}

export function Chat({
  availableModels,
  initialModels = ["gpt-4"],
  linkedInputs = true,
  onRemoveModel,
}: ChatProps) {
  const [models, setModels] = useState<ChatModel[]>([]);

  // Update models when initialModels changes
  useEffect(() => {
    setModels((prevModels) => {
      const newModels = initialModels.map((modelId) => {
        const modelInfo = availableModels.find((m) => m.id === modelId);
        if (!modelInfo) throw new Error(`Model ${modelId} not found`);

        // Preserve existing messages if model already exists
        const existingModel = prevModels.find((m) => m.id === modelId);

        return {
          id: modelInfo.id,
          name: modelInfo.name,
          provider: modelInfo.provider,
          color: modelInfo.color,
          description: modelInfo.description,
          capabilities: modelInfo.capabilities,
          messages: existingModel?.messages || [],
          isTyping: existingModel?.isTyping || false,
        };
      });
      return newModels;
    });
  }, [initialModels, availableModels]);

  const [currentInput, setCurrentInput] = useState("");
  const [systemPrompt, setSystemPrompt] = useState(
    "You are a helpful AI assistant."
  );
  const [temperature, setTemperature] = useState([0.7]);
  const [maxTokens, setMaxTokens] = useState([1000]);

  const inputRefs = useRef<{ [key: string]: HTMLTextAreaElement | null }>({});

  const sendMessage = async (modelId?: string) => {
    if (!currentInput.trim()) return;

    const targetModels = modelId
      ? [models.find((m) => m.id === modelId)!]
      : models;
    const userMessage = {
      role: "user" as const,
      content: currentInput,
      timestamp: new Date(),
    };

    // Add user message to all target models
    setModels((prev) =>
      prev.map((model) =>
        targetModels.some((t) => t.id === model.id)
          ? {
              ...model,
              messages: [...model.messages, userMessage],
              isTyping: true,
            }
          : model
      )
    );

    setCurrentInput("");

    // Simulate AI responses
    for (const model of targetModels) {
      setTimeout(() => {
        const responses = {
          "gpt-4":
            "I'm GPT-4, and I'd be happy to help you with that! This is a simulated response for demonstration purposes.",
          "gpt-3.5":
            "Hello! I'm GPT-3.5 Turbo. Here's my response to your message.",
          "claude-3-opus":
            "Hi there! Claude-3 Opus here. I appreciate your question and here's my thoughtful response.",
          "claude-3-sonnet":
            "Greetings! This is Claude-3 Sonnet with a balanced and helpful response.",
          "gemini-pro":
            "Hello! Gemini Pro at your service. Here's my analysis and response.",
          "llama-2-70b":
            "Hey! Llama 2 here, ready to assist you with your query.",
        };

        const assistantMessage = {
          role: "assistant" as const,
          content:
            responses[model.id as keyof typeof responses] ||
            "This is a simulated response.",
          timestamp: new Date(),
        };

        setModels((prev) =>
          prev.map((m) =>
            m.id === model.id
              ? {
                  ...m,
                  messages: [...m.messages, assistantMessage],
                  isTyping: false,
                }
              : m
          )
        );
      }, Math.random() * 2000 + 1000); // Random delay between 1-3 seconds
    }
  };

  const handleInputChange = (value: string, modelId?: string) => {
    if (linkedInputs) {
      setCurrentInput(value);
      // Update all input refs
      Object.values(inputRefs.current).forEach((ref) => {
        if (ref) ref.value = value;
      });
    } else if (modelId) {
      // Handle individual model input when not linked
      setCurrentInput(value);
    }
  };

  const removeModel = (modelId: string) => {
    if (models.length <= 1) return;
    onRemoveModel?.(modelId);
  };

  return (
    <div className="flex flex-1 gap-4 p-4 pt-0 overflow-hidden">
      {/* Chat Area */}
      <div className="flex-1 space-y-4 overflow-hidden">
        <div
          className="grid gap-4 h-full"
          style={{ gridTemplateColumns: `repeat(${models.length}, 1fr)` }}
        >
          {models.map((model) => (
            <ChatModelComponent
              key={model.id}
              model={model}
              canRemove={models.length > 1}
              onRemove={() => removeModel(model.id)}
              linkedInputs={linkedInputs}
              currentInput={currentInput}
              onInputChange={(value) => handleInputChange(value, model.id)}
              onSendMessage={() =>
                sendMessage(linkedInputs ? undefined : model.id)
              }
            />
          ))}
        </div>
      </div>

      {/* Controls Panel */}
      <ChatControls
        systemPrompt={systemPrompt}
        onSystemPromptChange={setSystemPrompt}
        temperature={temperature}
        onTemperatureChange={setTemperature}
        maxTokens={maxTokens}
        onMaxTokensChange={setMaxTokens}
        models={models}
      />
    </div>
  );
}
