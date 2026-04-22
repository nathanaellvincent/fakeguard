"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

/**
 * Light/dark toggle.
 *
 * Dark is the root default (no class on <html>). Adding `light` to the
 * <html> classList swaps every CSS variable in globals.css. The initial
 * state is set by a blocking inline script in layout.tsx BEFORE React
 * hydrates so there's no flash of the wrong theme.
 */
export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains("light"));
    setMounted(true);
  }, []);

  function toggle() {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.classList.toggle("light", next);
    try {
      localStorage.setItem("theme", next ? "light" : "dark");
    } catch {
      // localStorage can be blocked (private mode, strict CSP) — fail silent
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-ink-muted transition-colors hover:border-accent/50 hover:text-accent-soft"
    >
      {/* Render icon only after mount — server can't know theme. */}
      {mounted ? (
        isLight ? <Moon size={14} /> : <Sun size={14} />
      ) : (
        <span className="block h-[14px] w-[14px]" />
      )}
    </button>
  );
}
