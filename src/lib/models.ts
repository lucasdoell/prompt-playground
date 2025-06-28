import type { AvailableModel } from "@/types/chat";

const PROVIDER_COLORS = {
  OpenAI: "bg-green-500",
  Anthropic: "bg-purple-500",
  Google: "bg-blue-500",
} as const;

export const availableModels = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    color: PROVIDER_COLORS.OpenAI,
    description:
      "GPT-4o from OpenAI has broad general knowledge and domain expertise allowing it to follow complex instructions in natural language and solve difficult problems accurately. It matches GPT-4 Turbo performance with a faster and cheaper API.",
    capabilities: ["Reasoning", "Code", "Analysis", "General Knowledge"],
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o Mini",
    provider: "OpenAI",
    color: PROVIDER_COLORS.OpenAI,
    description:
      "GPT-4o mini from OpenAI is their most advanced and cost-efficient small model. It is multi-modal (accepting text or image inputs and outputting text) and has higher intelligence than gpt-3.5-turbo but is just as fast.",
    capabilities: ["Multi-modal", "Image Analysis", "Code", "Reasoning"],
  },
  {
    id: "o3",
    name: "o3",
    provider: "OpenAI",
    color: PROVIDER_COLORS.OpenAI,
    description:
      "OpenAI's o3 is their most powerful reasoning model, setting new state-of-the-art benchmarks in coding, math, science, and visual perception. It excels at complex queries requiring multi-faceted analysis, with particular strength in analyzing images, charts, and graphics.",
    capabilities: [
      "Advanced Reasoning",
      "Math",
      "Science",
      "Visual Analysis",
      "Code",
    ],
  },
  {
    id: "o3-mini",
    name: "o3 Mini",
    provider: "OpenAI",
    color: PROVIDER_COLORS.OpenAI,
    description:
      "o3-mini is OpenAI's most recent small reasoning model, providing high intelligence at the same cost and latency targets of o1-mini.",
    capabilities: ["Reasoning", "Code", "Analysis", "Efficiency"],
  },
  {
    id: "o4-mini",
    name: "o4 Mini",
    provider: "OpenAI",
    color: PROVIDER_COLORS.OpenAI,
    description:
      "OpenAI's o4-mini delivers fast, cost-efficient reasoning with exceptional performance for its size, particularly excelling in math (best-performing on AIME benchmarks), coding, and visual tasks.",
    capabilities: ["Math", "Code", "Visual Analysis", "Reasoning"],
  },
  {
    id: "gpt-4.1",
    name: "GPT-4.1",
    provider: "OpenAI",
    color: PROVIDER_COLORS.OpenAI,
    description:
      "GPT 4.1 is OpenAI's flagship model for complex tasks. It is well suited for problem solving across domains.",
    capabilities: ["Complex Problem Solving", "Reasoning", "Code", "Analysis"],
  },
  {
    id: "gpt-4.1-mini",
    name: "GPT-4.1 Mini",
    provider: "OpenAI",
    color: PROVIDER_COLORS.OpenAI,
    description:
      "GPT 4.1 mini provides a balance between intelligence, speed, and cost that makes it an attractive model for many use cases.",
    capabilities: ["Reasoning", "Code", "Efficiency", "Analysis"],
  },
  {
    id: "gpt-4.1-nano",
    name: "GPT-4.1 Nano",
    provider: "OpenAI",
    color: PROVIDER_COLORS.OpenAI,
    description:
      "GPT-4.1 nano is the fastest, most cost-effective GPT 4.1 model.",
    capabilities: ["Speed", "Efficiency", "Code", "Reasoning"],
  },
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    provider: "OpenAI",
    color: PROVIDER_COLORS.OpenAI,
    description:
      "OpenAI's most capable and cost effective model in the GPT-3.5 family optimized for chat purposes, but also works well for traditional completions tasks.",
    capabilities: ["Chat", "Completions", "Code", "Reasoning"],
  },
  {
    id: "gpt-3.5-turbo-instruct",
    name: "GPT-3.5 Turbo Instruct",
    provider: "OpenAI",
    color: PROVIDER_COLORS.OpenAI,
    description:
      "Similar capabilities as GPT-3 era models. Compatible with legacy Completions endpoint and not Chat Completions.",
    capabilities: ["Completions", "Legacy Support", "Code"],
  },
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    provider: "OpenAI",
    color: PROVIDER_COLORS.OpenAI,
    description:
      "gpt-4-turbo from OpenAI has broad general knowledge and domain expertise allowing it to follow complex instructions in natural language and solve difficult problems accurately. It has a knowledge cutoff of April 2023 and a 128,000 token context window.",
    capabilities: ["Reasoning", "Code", "Long Context", "Analysis"],
  },
  {
    id: "claude-sonnet-4",
    name: "Claude Sonnet 4",
    provider: "Anthropic",
    color: PROVIDER_COLORS.Anthropic,
    description:
      "Claude Sonnet 4 significantly improves on Sonnet 3.7's industry-leading capabilities, excelling in coding with a state-of-the-art 72.7% on SWE-bench. The model balances performance and efficiency for internal and external use cases, with enhanced steerability for greater control over implementations. While not matching Opus 4 in most domains, it delivers an optimal mix of capability and practicality.",
    capabilities: ["Code", "Software Engineering", "Steerability", "Reasoning"],
  },
  {
    id: "claude-3-haiku",
    name: "Claude 3 Haiku",
    provider: "Anthropic",
    color: PROVIDER_COLORS.Anthropic,
    description:
      "Claude 3 Haiku is Anthropic's fastest model yet, designed for enterprise workloads which often involve longer prompts. Haiku to quickly analyze large volumes of documents, such as quarterly filings, contracts, or legal cases, for half the cost of other models in its performance tier.",
    capabilities: ["Speed", "Document Analysis", "Enterprise", "Reasoning"],
  },
  {
    id: "claude-3-opus",
    name: "Claude 3 Opus",
    provider: "Anthropic",
    color: PROVIDER_COLORS.Anthropic,
    description:
      "Claude 3 Opus is Anthropic's most intelligent model, with best-in-market performance on highly complex tasks. It can navigate open-ended prompts and sight-unseen scenarios with remarkable fluency and human-like understanding. Opus shows us the outer limits of what's possible with generative AI.",
    capabilities: [
      "Advanced Reasoning",
      "Complex Tasks",
      "Creative Writing",
      "Analysis",
    ],
  },
  {
    id: "claude-3.5-haiku",
    name: "Claude 3.5 Haiku",
    provider: "Anthropic",
    color: PROVIDER_COLORS.Anthropic,
    description:
      "Claude 3.5 Haiku is the next generation of our fastest model. For a similar speed to Claude 3 Haiku, Claude 3.5 Haiku improves across every skill set and surpasses Claude 3 Opus, the largest model in our previous generation, on many intelligence benchmarks.",
    capabilities: ["Speed", "Intelligence", "Reasoning", "Code"],
  },
  {
    id: "claude-3.5-sonnet",
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    color: PROVIDER_COLORS.Anthropic,
    description:
      "Claude 3.5 Sonnet strikes the ideal balance between intelligence and speed—particularly for enterprise workloads. It delivers strong performance at a lower cost compared to its peers, and is engineered for high endurance in large-scale AI deployments.",
    capabilities: ["Enterprise", "Speed", "Reasoning", "Code"],
  },
  {
    id: "claude-3.7-sonnet",
    name: "Claude 3.7 Sonnet",
    provider: "Anthropic",
    color: PROVIDER_COLORS.Anthropic,
    description:
      "Claude 3.7 Sonnet is the first hybrid reasoning model and Anthropic's most intelligent model to date. It delivers state-of-the-art performance for coding, content generation, data analysis, and planning tasks, building upon its predecessor Claude 3.5 Sonnet's capabilities in software engineering and computer use.",
    capabilities: [
      "Hybrid Reasoning",
      "Code",
      "Content Generation",
      "Data Analysis",
      "Planning",
      "Computer Use",
    ],
  },
  {
    id: "gemini-2.0-flash",
    name: "Gemini 2.0 Flash",
    provider: "Google",
    color: PROVIDER_COLORS.Google,
    description:
      "Gemini 2.0 Flash delivers next-gen features and improved capabilities, including superior speed, built-in tool use, multimodal generation, and a 1M token context window.",
    capabilities: [
      "Speed",
      "Tool Use",
      "Multimodal Generation",
      "Long Context",
    ],
  },
  {
    id: "gemini-2.0-flash-lite",
    name: "Gemini 2.0 Flash Lite",
    provider: "Google",
    color: PROVIDER_COLORS.Google,
    description:
      "Gemini 2.0 Flash delivers next-gen features and improved capabilities, including superior speed, built-in tool use, multimodal generation, and a 1M token context window.",
    capabilities: [
      "Speed",
      "Tool Use",
      "Multimodal Generation",
      "Long Context",
    ],
  },
  {
    id: "gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    provider: "Google",
    color: PROVIDER_COLORS.Google,
    description:
      "Gemini 2.5 Flash is a thinking model that offers great, well-rounded capabilities. It is designed to offer a balance between price and performance with multimodal support and a 1M token context window.",
    capabilities: [
      "Thinking",
      "Multimodal",
      "Long Context",
      "Reasoning",
      "Code",
      "Analysis",
    ],
  },
  {
    id: "gemini-2.5-pro",
    name: "Gemini 2.5 Pro",
    provider: "Google",
    color: PROVIDER_COLORS.Google,
    description:
      "Gemini 2.5 Pro is our most advanced reasoning Gemini model, capable of solving complex problems. It features a 2M token context window and supports multimodal inputs including text, images, audio, video, and PDF documents.",
    capabilities: [
      "Advanced Reasoning",
      "Multimodal",
      "Long Context",
      "Reasoning",
      "Code",
      "Analysis",
    ],
  },
] as const satisfies readonly AvailableModel[];

export type AvailableModelNames = (typeof availableModels)[number]["id"];
