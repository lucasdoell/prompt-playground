import type { AvailableModel } from "@/types/chat";

export const availableModels = [
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
    id: "claude-sonnet-4",
    name: "Claude Sonnet 4",
    provider: "Anthropic",
    color: "bg-purple-500",
    description:
      "Claude Sonnet 4 with improved reasoning and coding capabilities.",
    capabilities: ["Reasoning", "Code", "Creative Writing", "Analysis"],
  },
] as const satisfies readonly AvailableModel[];

export type AvailableModelNames = (typeof availableModels)[number]["id"];
