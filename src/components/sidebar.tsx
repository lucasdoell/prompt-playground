"use client";

import { BookTextIcon } from "@/components/icons/book-text";
import { ChevronRightIcon } from "@/components/icons/chevron-right";
import { ChevronsLeftRightIcon } from "@/components/icons/chevrons-left-right";
import { FlaskIcon } from "@/components/icons/flask";
import { HomeIcon } from "@/components/icons/home";
import { PlusIcon, PlusIconHandle } from "@/components/icons/plus";
import type { SettingsGearIconHandle } from "@/components/icons/settings-gear";
import { SettingsGearIcon } from "@/components/icons/settings-gear";
import { WorkflowIcon } from "@/components/icons/workflow";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Zap } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: HomeIcon,
    },
    {
      title: "Model Comparison",
      url: "/models",
      icon: ChevronsLeftRightIcon,
    },
    {
      title: "Prompt Testing",
      url: "/prompts",
      icon: FlaskIcon,
    },
    {
      title: "Prompt Library",
      url: "/library",
      icon: BookTextIcon,
      items: [
        {
          title: "My Prompts",
          url: "/library/my-prompts",
        },
        {
          title: "Templates",
          url: "/library/templates",
        },
        {
          title: "Version History",
          url: "/library/history",
        },
      ],
    },
    {
      title: "Experiments",
      url: "/experiments",
      icon: WorkflowIcon,
      items: [
        {
          title: "A/B Tests",
          url: "/experiments/ab-tests",
        },
        {
          title: "Batch Processing",
          url: "/experiments/batch",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: SettingsGearIcon,
    },
  ],
};

interface IconProps {
  ref?: React.Ref<{
    startAnimation: () => void;
    stopAnimation: () => void;
  }>;
  size?: number;
}

interface AnimatedMenuItemProps {
  item: {
    title: string;
    url: string;
    icon: React.ComponentType<IconProps>;
    items?: Array<{ title: string; url: string }>;
  };
}

function AnimatedMenuItem({ item }: AnimatedMenuItemProps) {
  const iconRef = useRef<{
    startAnimation: () => void;
    stopAnimation: () => void;
  } | null>(null);

  const [isOpen, setIsOpen] = useState(true);

  const handleMouseEnter = () => {
    iconRef.current?.startAnimation();
  };

  const handleMouseLeave = () => {
    iconRef.current?.stopAnimation();
  };

  const hasSubItems = item.items && item.items.length > 0;

  if (hasSubItems) {
    return (
      <SidebarMenuItem>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              tooltip={item.title}
              className="group"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <item.icon ref={iconRef} size={16} />
              <span>{item.title}</span>
              <ChevronRightIcon
                className={`ml-auto size-4 transition-transform duration-200 ${
                  isOpen ? "rotate-90" : ""
                }`}
                size={16}
              />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.items?.map((subItem) => (
                <SidebarMenuSubItem key={subItem.title}>
                  <SidebarMenuSubButton asChild>
                    <Link href={subItem.url}>
                      <span>{subItem.title}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        tooltip={item.title}
        className="group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link href={item.url}>
          <item.icon ref={iconRef} size={16} />
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

interface AnimatedSecondaryMenuItemProps {
  item: {
    title: string;
    url: string;
    icon: React.ComponentType<IconProps>;
  };
}

function AnimatedSecondaryMenuItem({ item }: AnimatedSecondaryMenuItemProps) {
  const iconRef = useRef<SettingsGearIconHandle | null>(null);

  const handleMouseEnter = () => {
    iconRef.current?.startAnimation();
  };

  const handleMouseLeave = () => {
    iconRef.current?.stopAnimation();
  };

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        size="sm"
        tooltip={item.title}
        className="group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link href={item.url}>
          <item.icon ref={iconRef} size={16} />
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function AppSidebar() {
  const plusIconRef = useRef<PlusIconHandle | null>(null);

  const handleButtonMouseEnter = () => {
    plusIconRef.current?.startAnimation();
  };

  const handleButtonMouseLeave = () => {
    plusIconRef.current?.stopAnimation();
  };

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild tooltip="Prompt Playground">
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-sidebar-primary-foreground">
                  <Zap className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    Prompt Playground
                  </span>
                  <span className="truncate text-xs text-sidebar-foreground/70">
                    AI Engineering Suite
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <AnimatedMenuItem key={item.title} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navSecondary.map((item) => (
                <AnimatedSecondaryMenuItem key={item.title} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button
          className="w-full group"
          size="sm"
          onMouseEnter={handleButtonMouseEnter}
          onMouseLeave={handleButtonMouseLeave}
        >
          <PlusIcon ref={plusIconRef} className="size-4 mr-2" />
          New Experiment
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
