"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AvailableModelNames } from "@/lib/models";
import type { AvailableModel } from "@/types/chat";
import { Plus } from "lucide-react";

interface ModelSelectorProps {
  availableModels: readonly AvailableModel[];
  activeModelIds: string[];
  onAddModel: (modelId: AvailableModelNames) => void;
}

export function ModelSelector({
  availableModels,
  activeModelIds,
  onAddModel,
}: ModelSelectorProps) {
  const availableToAdd = availableModels.filter(
    (model) => !activeModelIds.includes(model.id)
  );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Select onValueChange={onAddModel}>
            <SelectTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="w-9 h-9 p-0 bg-transparent"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </SelectTrigger>
            <SelectContent className="w-80">
              {availableToAdd.map((model) => (
                <SelectItem key={model.id} value={model.id} className="p-3">
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${model.color}`} />
                      <span className="font-medium">{model.name}</span>
                      <Badge variant="outline" className="text-xs ml-auto">
                        {model.provider}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground text-left">
                      {model.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {model.capabilities.map((capability) => (
                        <Badge
                          key={capability}
                          variant="secondary"
                          className="text-xs"
                        >
                          {capability}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add Model</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
