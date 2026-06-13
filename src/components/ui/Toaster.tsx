"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  Loader2,
  X,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { dismiss, subscribe, type ToastItem, type ToastType } from "@/lib/toast";

const icons: Record<ToastType, React.ElementType> = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
  warning: AlertTriangle,
  loading: Loader2,
};

const styles: Record<ToastType, string> = {
  success: "border-green-200 bg-green-50 text-green-900",
  error: "border-red-200 bg-red-50 text-red-900",
  info: "border-blue-200 bg-blue-50 text-blue-900",
  warning: "border-amber-200 bg-amber-50 text-amber-900",
  loading: "border-orange-200 bg-orange-50 text-secondary",
};

const iconStyles: Record<ToastType, string> = {
  success: "text-green-600",
  error: "text-red-600",
  info: "text-blue-600",
  warning: "text-amber-600",
  loading: "text-primary animate-spin",
};

function ToastCard({ toast }: { toast: ToastItem }) {
  const Icon = icons[toast.type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 420, damping: 32 }}
      className={cn(
        "pointer-events-auto w-full rounded-2xl border shadow-lg backdrop-blur-sm p-4",
        styles[toast.type]
      )}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <Icon className={cn("w-5 h-5 shrink-0 mt-0.5", iconStyles[toast.type])} />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm leading-snug">{toast.title}</p>
          {toast.description && (
            <p className="text-xs mt-1 opacity-80 leading-relaxed">{toast.description}</p>
          )}
          {toast.confirm && (
            <div className="flex items-center gap-2 mt-3">
              <button
                type="button"
                onClick={() => {
                  dismiss(toast.id);
                  toast.confirm?.onConfirm();
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary text-white hover:bg-primary-dark transition-colors"
              >
                {toast.confirm.confirmLabel ?? "Confirmer"}
              </button>
              <button
                type="button"
                onClick={() => {
                  dismiss(toast.id);
                  toast.confirm?.onCancel?.();
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/70 hover:bg-white transition-colors"
              >
                {toast.confirm.cancelLabel ?? "Annuler"}
              </button>
            </div>
          )}
          {toast.action && !toast.confirm && (
            <button
              type="button"
              onClick={() => {
                toast.action?.onClick();
                dismiss(toast.id);
              }}
              className="mt-2 text-xs font-semibold underline underline-offset-2 hover:opacity-80"
            >
              {toast.action.label}
            </button>
          )}
        </div>
        {!toast.confirm && (
          <button
            type="button"
            onClick={() => dismiss(toast.id)}
            className="shrink-0 p-1 rounded-lg opacity-60 hover:opacity-100 hover:bg-black/5 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
}

export function Toaster() {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => subscribe(setItems), []);

  return (
    <div
      aria-label="Notifications"
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] flex flex-col items-center gap-3 w-full max-w-md px-4 pointer-events-none"
    >
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <ToastCard key={item.id} toast={item} />
        ))}
      </AnimatePresence>
    </div>
  );
}
