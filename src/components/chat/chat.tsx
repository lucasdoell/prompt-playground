"use client";

import { useChatSettings } from "@/contexts/chat-settings-context";
import { AvailableModelNames } from "@/lib/models";
import type { AvailableModel, ChatModel } from "@/types/chat";
import { useEffect, useRef, useState } from "react";
import { ChatControls } from "./chat-controls";
import { ChatModelComponent } from "./chat-model";

interface ChatProps {
  availableModels: readonly AvailableModel[];
  initialModels?: AvailableModelNames[];
  linkedInputs?: boolean;
  onRemoveModel?: (modelId: string) => void;
}

export function Chat({
  availableModels,
  initialModels = ["gpt-4.1"],
  linkedInputs = true,
  onRemoveModel,
}: ChatProps) {
  const [models, setModels] = useState<ChatModel[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const {
    settings,
    setSystemPrompt,
    setTemperature,
    setMaxOutputTokens,
    setTopP,
    setTopK,
  } = useChatSettings();

  const inputRefs = useRef<{ [key: string]: HTMLTextAreaElement | null }>({});

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

  const handleSendMessage = () => {
    // Clear input after message is sent (for linked inputs)
    if (linkedInputs) {
      setCurrentInput("");
    }
  };

  const handleUpdateMessages = (
    modelId: string,
    messages: Array<{
      role: "user" | "assistant";
      content: string;
      timestamp: Date;
    }>
  ) => {
    setModels((prevModels) =>
      prevModels.map((model) =>
        model.id === modelId ? { ...model, messages } : model
      )
    );
  };

  const removeModel = (modelId: string) => {
    if (models.length <= 1) return;
    onRemoveModel?.(modelId);
  };

  return (
    <div className="flex flex-1 gap-4 p-4 pt-0 overflow-hidden">
      {/* Chat Area */}
      <div className="flex-1 overflow-auto">
        <div
          className={`grid gap-4 ${
            models.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
          }`}
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
              onSendMessage={handleSendMessage}
              onUpdateMessages={handleUpdateMessages}
            />
          ))}
        </div>
      </div>

      {/* Controls Panel */}
      <ChatControls
        systemPrompt={settings.systemPrompt}
        onSystemPromptChange={setSystemPrompt}
        temperature={settings.temperature}
        onTemperatureChange={setTemperature}
        maxOutputTokens={settings.maxOutputTokens}
        onMaxOutputTokensChange={setMaxOutputTokens}
        topP={settings.topP}
        onTopPChange={setTopP}
        topK={settings.topK}
        onTopKChange={setTopK}
        models={models}
      />
    </div>
  );
}
