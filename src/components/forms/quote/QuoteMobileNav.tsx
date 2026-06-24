"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuoteSectionConfig, QuoteSectionId } from "./quote-sections";

interface QuoteMobileNavProps {
  sections: QuoteSectionConfig[];
  activeSection: QuoteSectionId;
  progress: number;
  labels: Record<string, string>;
  onNavigate: (id: QuoteSectionId) => void;
  isSectionComplete: (id: QuoteSectionId) => boolean;
  progressLabel: string;
}

export function QuoteMobileNav({
  sections,
  activeSection,
  progress,
  labels,
  onNavigate,
  isSectionComplete,
  progressLabel,
}: QuoteMobileNavProps) {
  return (
    <div className="lg:hidden sticky top-16 z-30 -mx-4 border-b border-border/80 bg-white/95 px-4 py-3 shadow-sm backdrop-blur-xl sm:-mx-6 sm:px-6">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {progressLabel}
        </span>
        <span className="text-sm font-bold text-primary">{progress}%</span>
      </div>
      <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full gradient-bg"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          const done = isSectionComplete(section.id);
          const label = labels[section.titleKey];

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => onNavigate(section.id)}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-left transition-all",
                isActive
                  ? "border-primary bg-primary/10 text-secondary shadow-sm"
                  : "border-border bg-white text-muted-foreground"
              )}
            >
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                  done
                    ? "bg-accent text-white"
                    : isActive
                      ? "bg-primary text-white"
                      : "bg-muted text-secondary/70"
                )}
              >
                {done ? <Check className="h-3 w-3" /> : section.number}
              </span>
              <span className="max-w-[9rem] truncate text-xs font-medium sm:max-w-[11rem]">
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
