"use client";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Link, Plus, Send, Settings, Unlink, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ChatModel {
  id: string;
  name: string;
  provider: string;
  color: string;
  messages: Array<{
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
  }>;
  isTyping: boolean;
}

export default function ChatPlayground() {
  const [models, setModels] = useState<ChatModel[]>([
    {
      id: "gpt-4",
      name: "GPT-4",
      provider: "OpenAI",
      color: "bg-green-500",
      messages: [],
      isTyping: false,
    },
  ]);

  const [linkedInputs, setLinkedInputs] = useState(true);
  const [currentInput, setCurrentInput] = useState("");
  const [systemPrompt, setSystemPrompt] = useState(
    "You are a helpful AI assistant."
  );
  const [temperature, setTemperature] = useState([0.7]);
  const [maxTokens, setMaxTokens] = useState([1000]);

  const inputRefs = useRef<{ [key: string]: HTMLTextAreaElement | null }>({});
  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const availableModels = [
    { id: "gpt-4", name: "GPT-4", provider: "OpenAI", color: "bg-green-500" },
    {
      id: "gpt-3.5",
      name: "GPT-3.5 Turbo",
      provider: "OpenAI",
      color: "bg-blue-500",
    },
    {
      id: "claude-3",
      name: "Claude-3 Opus",
      provider: "Anthropic",
      color: "bg-orange-500",
    },
    {
      id: "claude-3-sonnet",
      name: "Claude-3 Sonnet",
      provider: "Anthropic",
      color: "bg-orange-400",
    },
    {
      id: "gemini-pro",
      name: "Gemini Pro",
      provider: "Google",
      color: "bg-purple-500",
    },
    {
      id: "llama-2",
      name: "Llama 2 70B",
      provider: "Meta",
      color: "bg-red-500",
    },
  ];

  const addModel = (modelId: string) => {
    const modelInfo = availableModels.find((m) => m.id === modelId);
    if (!modelInfo || models.find((m) => m.id === modelId)) return;

    const newModel: ChatModel = {
      id: modelInfo.id,
      name: modelInfo.name,
      provider: modelInfo.provider,
      color: modelInfo.color,
      messages: [],
      isTyping: false,
    };
    setModels([...models, newModel]);
  };

  const removeModel = (modelId: string) => {
    if (models.length <= 1) return;
    setModels(models.filter((m) => m.id !== modelId));
  };

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
          "claude-3":
            "Hi there! Claude-3 here. I appreciate your question and here's my thoughtful response.",
          "claude-3-sonnet":
            "Greetings! This is Claude-3 Sonnet with a balanced and helpful response.",
          "gemini-pro":
            "Hello! Gemini Pro at your service. Here's my analysis and response.",
          "llama-2": "Hey! Llama 2 here, ready to assist you with your query.",
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

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    Object.values(scrollRefs.current).forEach((ref) => {
      if (ref) {
        ref.scrollTop = ref.scrollHeight;
      }
    });
  }, [models]);

  return (
    <SidebarInset>
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
        <div className="ml-auto flex items-center gap-2 px-4">
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

      <div className="flex flex-1 gap-4 p-4 pt-0">
        {/* Chat Area */}
        <div className="flex-1 space-y-4">
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: `repeat(${models.length}, 1fr)` }}
          >
            {models.map((model) => (
              <Card key={model.id} className="flex flex-col h-[600px]">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${model.color}`} />
                      {model.name}
                      <Badge variant="outline" className="text-xs">
                        {model.provider}
                      </Badge>
                    </CardTitle>
                    {models.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeModel(model.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col flex-1 p-4 pt-0">
                  <ScrollArea
                    className="flex-1 pr-4"
                    ref={(el) => {
                      scrollRefs.current[model.id] = el;
                    }}
                  >
                    <div className="space-y-4">
                      {model.messages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex gap-3 ${
                            message.role === "user"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`flex gap-2 max-w-[80%] ${
                              message.role === "user"
                                ? "flex-row-reverse"
                                : "flex-row"
                            }`}
                          >
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                message.role === "user"
                                  ? "bg-blue-500"
                                  : model.color
                              }`}
                            >
                              {message.role === "user" ? (
                                <User className="w-4 h-4 text-white" />
                              ) : (
                                <Bot className="w-4 h-4 text-white" />
                              )}
                            </div>
                            <div
                              className={`rounded-lg p-3 ${
                                message.role === "user"
                                  ? "bg-blue-500 text-white"
                                  : "bg-muted"
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <p className="text-xs opacity-70 mt-1">
                                {message.timestamp.toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                      {model.isTyping && (
                        <div className="flex gap-3 justify-start">
                          <div className="flex gap-2">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${model.color}`}
                            >
                              <Bot className="w-4 h-4 text-white" />
                            </div>
                            <div className="rounded-lg p-3 bg-muted">
                              <div className="flex gap-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                <div
                                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.1s" }}
                                />
                                <div
                                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.2s" }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>

                  <div className="mt-4 flex gap-2">
                    <Textarea
                      ref={(el) => {
                        inputRefs.current[model.id] = el;
                      }}
                      placeholder="Type your message..."
                      value={linkedInputs ? currentInput : undefined}
                      onChange={(e) =>
                        handleInputChange(e.target.value, model.id)
                      }
                      className="flex-1 min-h-[60px] resize-none"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage(linkedInputs ? undefined : model.id);
                        }
                      }}
                    />
                    <Button
                      onClick={() =>
                        sendMessage(linkedInputs ? undefined : model.id)
                      }
                      disabled={!currentInput.trim()}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add Model Button */}
          <Card className="border-dashed">
            <CardContent className="flex items-center justify-center p-8">
              <Select onValueChange={addModel}>
                <SelectTrigger className="w-full max-w-xs bg-transparent border-dashed">
                  <div className="flex items-center">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Model
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {availableModels
                    .filter((model) => !models.find((m) => m.id === model.id))
                    .map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 rounded-full ${model.color}`}
                          />
                          {model.name}
                          <Badge variant="outline" className="text-xs ml-auto">
                            {model.provider}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        {/* Controls Panel */}
        <Card className="w-80 h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="system-prompt">System Prompt</Label>
              <Textarea
                id="system-prompt"
                placeholder="Enter system prompt..."
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Temperature: {temperature[0]}</Label>
              <Slider
                value={temperature}
                onValueChange={setTemperature}
                max={2}
                min={0}
                step={0.1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Controls randomness. Lower = more focused, Higher = more
                creative
              </p>
            </div>

            <div className="space-y-2">
              <Label>Max Tokens: {maxTokens[0]}</Label>
              <Slider
                value={maxTokens}
                onValueChange={setMaxTokens}
                max={4000}
                min={100}
                step={100}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Maximum length of the response
              </p>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Active Models</Label>
              <div className="space-y-2">
                {models.map((model) => (
                  <div
                    key={model.id}
                    className="flex items-center justify-between p-2 rounded border"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${model.color}`} />
                      <span className="text-sm">{model.name}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {
                        model.messages.filter((m) => m.role === "assistant")
                          .length
                      }{" "}
                      responses
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  );
}
