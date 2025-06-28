"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface ChatSettings {
  systemPrompt: string;
  temperature: number;
  maxOutputTokens: number;
  topP: number;
  topK: number;
}

interface ChatSettingsContextType {
  settings: ChatSettings;
  updateSettings: (updates: Partial<ChatSettings>) => void;
  setSystemPrompt: (prompt: string) => void;
  setTemperature: (temp: number) => void;
  setMaxOutputTokens: (tokens: number) => void;
  setTopP: (topP: number) => void;
  setTopK: (topK: number) => void;
}

const ChatSettingsContext = createContext<ChatSettingsContextType | undefined>(
  undefined
);

interface ChatSettingsProviderProps {
  children: ReactNode;
  initialSettings?: Partial<ChatSettings>;
}

export function ChatSettingsProvider({
  children,
  initialSettings = {},
}: ChatSettingsProviderProps) {
  const [settings, setSettings] = useState<ChatSettings>({
    systemPrompt: "You are a helpful AI assistant.",
    temperature: 0.2,
    maxOutputTokens: 1024,
    topP: 0.95,
    topK: 30,
    ...initialSettings,
  });

  const updateSettings = (updates: Partial<ChatSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const setSystemPrompt = (systemPrompt: string) => {
    updateSettings({ systemPrompt });
  };

  const setTemperature = (temperature: number) => {
    updateSettings({ temperature });
  };

  const setMaxOutputTokens = (maxOutputTokens: number) => {
    updateSettings({ maxOutputTokens });
  };

  const setTopP = (topP: number) => {
    updateSettings({ topP });
  };

  const setTopK = (topK: number) => {
    updateSettings({ topK });
  };

  const value: ChatSettingsContextType = {
    settings,
    updateSettings,
    setSystemPrompt,
    setTemperature,
    setMaxOutputTokens,
    setTopP,
    setTopK,
  };

  return (
    <ChatSettingsContext.Provider value={value}>
      {children}
    </ChatSettingsContext.Provider>
  );
}

export function useChatSettings() {
  const context = useContext(ChatSettingsContext);
  if (context === undefined) {
    throw new Error(
      "useChatSettings must be used within a ChatSettingsProvider"
    );
  }
  return context;
}
