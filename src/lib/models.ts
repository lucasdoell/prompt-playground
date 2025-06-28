import type { AvailableModel } from "@/types/chat";

export const availableModels: AvailableModel[] = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    color: "bg-green-500",
    description:
      "Most capable GPT model with advanced reasoning, coding, and creative writing abilities.",
    capabilities: ["Reasoning", "Code", "Creative Writing", "Analysis"],
  },
  {
    id: "gpt-4.1",
    name: "GPT-4.1",
    provider: "OpenAI",
    color: "bg-green-600",
    description: "GPT-4.1 with improved reasoning and coding capabilities.",
    capabilities: ["Reasoning", "Code", "Creative Writing", "Analysis"],
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o Mini",
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
    capabilities: ["Advanced Reasoning", "Analysis", "Long Context", "Safety"],
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
