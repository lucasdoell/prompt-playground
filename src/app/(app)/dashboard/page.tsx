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
import { AvailableModelNames, availableModels } from "@/lib/models";
import { Link, Unlink } from "lucide-react";
import { useState } from "react";

export default function ChatPlayground() {
  const [linkedInputs, setLinkedInputs] = useState(true);
  const [activeModelIds, setActiveModelIds] = useState<AvailableModelNames[]>([
    "gpt-4.1",
  ]);

  const handleAddModel = (modelId: AvailableModelNames) => {
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
