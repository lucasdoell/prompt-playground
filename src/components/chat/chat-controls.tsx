"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import type { ChatModel } from "@/types/chat";
import { Settings } from "lucide-react";

interface ChatControlsProps {
  systemPrompt: string;
  onSystemPromptChange: (value: string) => void;
  temperature: number[];
  onTemperatureChange: (value: number[]) => void;
  maxTokens: number[];
  onMaxTokensChange: (value: number[]) => void;
  models: ChatModel[];
}

export function ChatControls({
  systemPrompt,
  onSystemPromptChange,
  temperature,
  onTemperatureChange,
  maxTokens,
  onMaxTokensChange,
  models,
}: ChatControlsProps) {
  return (
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
            onChange={(e) => onSystemPromptChange(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label>Temperature: {temperature[0]}</Label>
          <Slider
            value={temperature}
            onValueChange={onTemperatureChange}
            max={2}
            min={0}
            step={0.1}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Controls randomness. Lower = more focused, Higher = more creative
          </p>
        </div>

        <div className="space-y-2">
          <Label>Max Tokens: {maxTokens[0]}</Label>
          <Slider
            value={maxTokens}
            onValueChange={onMaxTokensChange}
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
                  {model.messages.filter((m) => m.role === "assistant").length}{" "}
                  responses
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
