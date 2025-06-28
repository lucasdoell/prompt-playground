"use client";

import { MoonIcon } from "@/components/icons/moon";
import { SunIcon } from "@/components/icons/sun";
import { SunMoonIcon } from "@/components/icons/sun-moon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { useRef } from "react";

type Theme = "light" | "dark" | "system";

interface IconRef {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface AnimatedMenuItemProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  children: (ref: React.RefObject<IconRef | null>) => React.ReactNode;
}

function AnimatedMenuItem({
  theme,
  onThemeChange,
  children,
}: AnimatedMenuItemProps) {
  const iconRef = useRef<IconRef | null>(null);

  function handleMouseEnter() {
    iconRef.current?.startAnimation();
  }

  function handleMouseLeave() {
    iconRef.current?.stopAnimation();
  }

  function handleClick() {
    onThemeChange(theme);
  }

  return (
    <DropdownMenuItem
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children(iconRef)}
    </DropdownMenuItem>
  );
}

export function ModeToggle() {
  const { setTheme, theme: currentTheme } = useTheme();

  const sunIconRef = useRef<IconRef | null>(null);
  const moonIconRef = useRef<IconRef | null>(null);

  function handleMouseEnter() {
    sunIconRef.current?.startAnimation();
    moonIconRef.current?.startAnimation();
  }

  function handleMouseLeave() {
    sunIconRef.current?.stopAnimation();
    moonIconRef.current?.stopAnimation();
  }

  function handleChangeTheme(theme: Theme) {
    if (theme === currentTheme) return;

    if (!document.startViewTransition) return setTheme(theme);
    document.startViewTransition(() => setTheme(theme));
  }

  const themeOptions = [
    {
      theme: "light" as const,
      icon: (ref: React.RefObject<IconRef | null>) => (
        <SunIcon ref={ref} className="h-4 w-4" />
      ),
      label: "Light",
    },
    {
      theme: "dark" as const,
      icon: (ref: React.RefObject<IconRef | null>) => (
        <MoonIcon ref={ref} className="h-4 w-4" />
      ),
      label: "Dark",
    },
    {
      theme: "system" as const,
      icon: (ref: React.RefObject<IconRef | null>) => (
        <SunMoonIcon ref={ref} className="h-4 w-4" />
      ),
      label: "System",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <SunIcon
            ref={sunIconRef}
            className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
          />
          <MoonIcon
            ref={moonIconRef}
            className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themeOptions.map(({ theme, icon, label }) => (
          <AnimatedMenuItem
            key={theme}
            theme={theme}
            onThemeChange={handleChangeTheme}
          >
            {(ref) => (
              <>
                {icon(ref)} {label}
              </>
            )}
          </AnimatedMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
