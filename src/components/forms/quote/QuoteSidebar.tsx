"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { QuoteSectionConfig, QuoteSectionId } from "./quote-sections";
import { Check } from "lucide-react";

interface QuoteSidebarProps {
  sections: QuoteSectionConfig[];
  activeSection: QuoteSectionId;
  progress: number;
  labels: Record<string, string>;
  onNavigate: (id: QuoteSectionId) => void;
  isSectionComplete: (id: QuoteSectionId) => boolean;
  trustItems: string[];
  sidebarTitle: string;
  sidebarNote: string;
  progressLabel: string;
}

export function QuoteSidebar({
  sections,
  activeSection,
  progress,
  labels,
  onNavigate,
  isSectionComplete,
  trustItems,
  sidebarTitle,
  sidebarNote,
  progressLabel,
}: QuoteSidebarProps) {
  return (
    <aside className="hidden space-y-5 lg:block lg:sticky lg:top-24 lg:self-start">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-secondary p-6 text-white shadow-2xl shadow-secondary/20">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-10 -left-6 h-28 w-28 rounded-full bg-accent/20 blur-3xl" />

        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
            {progressLabel}
          </p>
          <div className="mt-4 flex items-end gap-3">
            <span className="text-5xl font-bold leading-none">{progress}</span>
            <span className="pb-1 text-lg font-medium text-white/60">%</span>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary via-primary-light to-accent"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <h3 className="mt-6 text-lg font-bold">{sidebarTitle}</h3>
          <ul className="mt-4 space-y-2">
            {trustItems.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-white/80">
                <Check className="h-4 w-4 shrink-0 text-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <nav className="hidden lg:block rounded-3xl border border-border/80 bg-white/80 p-4 shadow-lg shadow-secondary/5 backdrop-blur-xl">
        <p className="px-3 pb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {labels.navigation}
        </p>
        <ul className="space-y-1">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            const done = isSectionComplete(section.id);

            return (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={() => onNavigate(section.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm transition-all duration-300",
                    isActive
                      ? "bg-primary/10 text-secondary shadow-sm"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-secondary"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold",
                      done
                        ? "bg-accent text-white"
                        : isActive
                          ? "bg-primary text-white"
                          : "bg-muted text-secondary/70"
                    )}
                  >
                    {done ? <Check className="h-4 w-4" /> : section.number}
                  </span>
                  <span className="flex-1 truncate font-medium">{labels[section.titleKey]}</span>
                  <section.icon
                    className={cn("h-4 w-4 shrink-0", isActive ? "text-primary" : "text-muted-foreground/60")}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <p className="hidden px-1 text-sm leading-relaxed text-muted-foreground lg:block">{sidebarNote}</p>
    </aside>
  );
}
