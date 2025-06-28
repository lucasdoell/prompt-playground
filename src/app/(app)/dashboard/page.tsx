"use client";

import { Chat } from "@/components/chat/chat";
import { ModelSelector } from "@/components/chat/model-selector";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { ChatSettingsProvider } from "@/contexts/chat-settings-context";
import type { AvailableModel } from "@/types/chat";
import { Link, Unlink } from "lucide-react";
import { useState } from "react";

export default function ChatPlayground() {
  const [linkedInputs, setLinkedInputs] = useState(true);
  const [activeModelIds, setActiveModelIds] = useState(["gpt-4"]);

  const availableModels: AvailableModel[] = [
    {
      id: "gpt-4",
      name: "GPT-4",
      provider: "OpenAI",
      color: "bg-green-500",
      description:
        "Most capable GPT model with advanced reasoning, coding, and creative writing abilities.",
      capabilities: ["Reasoning", "Code", "Creative Writing", "Analysis"],
    },
    {
      id: "gpt-4-vision",
      name: "GPT-4 Vision",
      provider: "OpenAI",
      color: "bg-green-600",
      description:
        "GPT-4 with image understanding capabilities for visual analysis and description.",
      capabilities: ["Vision", "Reasoning", "Code", "Image Analysis"],
    },
    {
      id: "gpt-3.5",
      name: "GPT-3.5 Turbo",
      provider: "OpenAI",
      color: "bg-blue-500",
      description:
        "Fast and efficient model for general conversations and simple tasks.",
      capabilities: ["Fast", "General Chat", "Code", "Affordable"],
    },
    {
      id: "claude-3-opus",
      name: "Claude-3 Opus",
      provider: "Anthropic",
      color: "bg-orange-500",
      description:
        "Most powerful Claude model with exceptional reasoning and analysis capabilities.",
      capabilities: [
        "Advanced Reasoning",
        "Analysis",
        "Long Context",
        "Safety",
      ],
    },
    {
      id: "claude-3-sonnet",
      name: "Claude-3 Sonnet",
      provider: "Anthropic",
      color: "bg-orange-400",
      description:
        "Balanced Claude model offering good performance with faster response times.",
      capabilities: ["Balanced", "Fast", "Reasoning", "Code"],
    },
    {
      id: "claude-3-haiku",
      name: "Claude-3 Haiku",
      provider: "Anthropic",
      color: "bg-orange-300",
      description:
        "Fastest Claude model optimized for quick responses and simple tasks.",
      capabilities: ["Ultra Fast", "Lightweight", "Affordable", "Quick Tasks"],
    },
    {
      id: "gemini-pro",
      name: "Gemini Pro",
      provider: "Google",
      color: "bg-purple-500",
      description:
        "Google's advanced multimodal AI with strong reasoning and creative capabilities.",
      capabilities: ["Multimodal", "Reasoning", "Creative", "Code"],
    },
    {
      id: "gemini-pro-vision",
      name: "Gemini Pro Vision",
      provider: "Google",
      color: "bg-purple-600",
      description:
        "Gemini Pro with enhanced image and video understanding capabilities.",
      capabilities: ["Vision", "Video", "Multimodal", "Analysis"],
    },
    {
      id: "llama-2-70b",
      name: "Llama 2 70B",
      provider: "Meta",
      color: "bg-red-500",
      description:
        "Open-source model with strong performance in reasoning and code generation.",
      capabilities: ["Open Source", "Code", "Reasoning", "Self-Hosted"],
    },
    {
      id: "grok-2",
      name: "Grok-2",
      provider: "xAI",
      color: "bg-gray-600",
      description:
        "xAI's reasoning model with real-time information and unique personality.",
      capabilities: ["Real-time", "Reasoning", "Personality", "Current Events"],
    },
  ];

  const handleAddModel = (modelId: string) => {
    if (!activeModelIds.includes(modelId)) {
      setActiveModelIds([...activeModelIds, modelId]);
    }
  };

  const handleRemoveModel = (modelId: string) => {
    if (activeModelIds.length > 1) {
      setActiveModelIds(activeModelIds.filter((id) => id !== modelId));
    }
  };

  return (
    <ChatSettingsProvider>
      <div className="flex flex-col h-full">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">Chat Playground</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto flex items-center gap-4 px-4">
            <ModelSelector
              availableModels={availableModels}
              activeModelIds={activeModelIds}
              onAddModel={handleAddModel}
            />
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-2">
              <Label htmlFor="link-inputs" className="text-sm">
                Link Inputs
              </Label>
              <Switch
                id="link-inputs"
                checked={linkedInputs}
                onCheckedChange={setLinkedInputs}
              />
              {linkedInputs ? (
                <Link className="w-4 h-4" />
              ) : (
                <Unlink className="w-4 h-4" />
              )}
            </div>
          </div>
        </header>

        <Chat
          availableModels={availableModels}
          initialModels={activeModelIds}
          linkedInputs={linkedInputs}
          onRemoveModel={handleRemoveModel}
        />
      </div>
    </ChatSettingsProvider>
  );
}
