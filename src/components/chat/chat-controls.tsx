"use client";

import { SettingsGearIcon } from "@/components/icons/settings-gear";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import type { ChatModel } from "@/types/chat";

interface ChatControlsProps {
  systemPrompt: string;
  onSystemPromptChange: (value: string) => void;
  temperature: number;
  onTemperatureChange: (value: number) => void;
  topP?: number;
  onTopPChange?: (value: number) => void;
  topK?: number;
  onTopKChange?: (value: number) => void;
  maxOutputTokens?: number;
  onMaxOutputTokensChange?: (value: number) => void;
  models: ChatModel[];
}

export function ChatControls({
  systemPrompt,
  onSystemPromptChange,
  temperature,
  onTemperatureChange,
  topP,
  onTopPChange,
  topK,
  onTopKChange,
  maxOutputTokens,
  onMaxOutputTokensChange,
  models,
}: ChatControlsProps) {
  return (
    <Card className="w-80 h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center gap-2">
          <SettingsGearIcon size={20} />
          Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 overflow-auto flex-1">
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
          <Label>Temperature: {temperature}</Label>
          <Slider
            value={[temperature]}
            onValueChange={([value]) => onTemperatureChange(value)}
            max={1}
            min={0}
            step={0.1}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Controls randomness. Lower = more focused, Higher = more creative
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="top-p">Top P</Label>
          <Input
            id="top-p"
            type="number"
            min={0}
            max={1}
            step={0.01}
            value={topP || ""}
            onChange={(e) => onTopPChange?.(parseFloat(e.target.value) || 0)}
            placeholder="0.9"
          />
          <p className="text-xs text-muted-foreground">
            Controls the diversity of the response (higher = more diverse)
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="top-k">Top K</Label>
          <Input
            id="top-k"
            type="number"
            min={0}
            max={1}
            step={0.01}
            value={topK || ""}
            onChange={(e) => onTopKChange?.(parseFloat(e.target.value) || 0)}
            placeholder="0.95"
          />
          <p className="text-xs text-muted-foreground">
            Controls the token selection threshold (higher = more diverse)
          </p>
        </div>

        <div className="space-y-2">
          <Label>Max Output Tokens: {maxOutputTokens}</Label>
          <Slider
            value={maxOutputTokens ? [maxOutputTokens] : undefined}
            onValueChange={([value]) => onMaxOutputTokensChange?.(value)}
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
                  response
                  {model.messages.filter((m) => m.role === "assistant")
                    .length === 1
                    ? ""
                    : "s"}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
