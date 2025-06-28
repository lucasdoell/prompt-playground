"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AvailableModelNames } from "@/lib/models";
import type { AvailableModel } from "@/types/chat";
import { Filter, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<string>("all");
  const [isOpen, setIsOpen] = useState(false);

  const providers = useMemo(() => {
    const providerSet = new Set(availableModels.map((model) => model.provider));
    return Array.from(providerSet).sort();
  }, [availableModels]);

  const filteredModels = useMemo(() => {
    const availableToAdd = availableModels.filter(
      (model) => !activeModelIds.includes(model.id)
    );

    return availableToAdd.filter((model) => {
      const matchesSearch =
        model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.capabilities.some((cap) =>
          cap.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesProvider =
        selectedProvider === "all" || model.provider === selectedProvider;

      return matchesSearch && matchesProvider;
    });
  }, [availableModels, activeModelIds, searchTerm, selectedProvider]);

  function handleModelSelect(modelId: string) {
    onAddModel(modelId as AvailableModelNames);
    setIsOpen(false);
    setSearchTerm("");
    setSelectedProvider("all");
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="w-9 h-9 p-0 bg-transparent"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-[420px] p-0"
              align="start"
              sideOffset={4}
              alignOffset={-20}
            >
              <div className="p-4 border-b space-y-3">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-sm">Add Model</h4>
                  <Badge variant="secondary" className="text-xs">
                    {filteredModels.length} available
                  </Badge>
                </div>

                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search models..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 h-8"
                    />
                  </div>

                  <Select
                    value={selectedProvider}
                    onValueChange={setSelectedProvider}
                  >
                    <SelectTrigger className="w-36 h-8">
                      <div className="flex items-center gap-1.5">
                        <Filter className="w-3.5 h-3.5" />
                        <SelectValue />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Providers</SelectItem>
                      {providers.map((provider) => (
                        <SelectItem key={provider} value={provider}>
                          {provider}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="max-h-80 overflow-y-auto">
                {filteredModels.length === 0 ? (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No models found matching your filters
                  </div>
                ) : (
                  <div className="p-2">
                    {filteredModels.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => handleModelSelect(model.id)}
                        className="w-full p-3 rounded-md hover:bg-accent text-left transition-colors"
                      >
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-3 h-3 rounded-full ${model.color}`}
                            />
                            <span className="font-medium text-sm">
                              {model.name}
                            </span>
                            <Badge
                              variant="outline"
                              className="text-xs ml-auto"
                            >
                              {model.provider}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground text-left line-clamp-2">
                            {model.description}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {model.capabilities
                              .slice(0, 4)
                              .map((capability) => (
                                <Badge
                                  key={capability}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {capability}
                                </Badge>
                              ))}
                            {model.capabilities.length > 4 && (
                              <Badge variant="secondary" className="text-xs">
                                +{model.capabilities.length - 4} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add Model</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
