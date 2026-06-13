export type ToastType = "success" | "error" | "info" | "warning" | "loading";

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastConfirm {
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
  action?: ToastAction;
  confirm?: ToastConfirm;
}

type ToastListener = (toasts: ToastItem[]) => void;

let toasts: ToastItem[] = [];
const listeners = new Set<ToastListener>();
const timers = new Map<string, ReturnType<typeof setTimeout>>();

function notify() {
  listeners.forEach((listener) => listener([...toasts]));
}

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function subscribe(listener: ToastListener) {
  listeners.add(listener);
  listener([...toasts]);
  return () => {
    listeners.delete(listener);
  };
}

export function dismiss(id: string) {
  const timer = timers.get(id);
  if (timer) {
    clearTimeout(timer);
    timers.delete(id);
  }
  toasts = toasts.filter((t) => t.id !== id);
  notify();
}

function addToast(item: Omit<ToastItem, "id">) {
  const id = createId();
  const toast: ToastItem = { ...item, id };
  toasts = [...toasts, toast].slice(-5);
  notify();

  if (item.type !== "loading" && !item.confirm) {
    const duration = item.duration ?? (item.type === "error" ? 5000 : 4000);
    const timer = setTimeout(() => dismiss(id), duration);
    timers.set(id, timer);
  }

  return id;
}

export const toast = {
  success(title: string, options?: { description?: string; duration?: number }) {
    return addToast({ type: "success", title, ...options });
  },

  error(title: string, options?: { description?: string; duration?: number }) {
    return addToast({ type: "error", title, duration: 5000, ...options });
  },

  info(title: string, options?: { description?: string }) {
    return addToast({ type: "info", title, ...options });
  },

  warning(title: string, options?: { description?: string }) {
    return addToast({ type: "warning", title, ...options });
  },

  loading(title: string, options?: { description?: string }) {
    return addToast({ type: "loading", title, duration: 0, ...options });
  },

  confirm(
    title: string,
    onConfirm: () => void | Promise<void>,
    options?: { description?: string; onCancel?: () => void }
  ) {
    return confirmToast(title, onConfirm, options);
  },

  async promise<T>(
    promise: Promise<T>,
    messages: { loading: string; success: string; error: string }
  ) {
    const id = toast.loading(messages.loading);
    try {
      await promise;
      dismiss(id);
      toast.success(messages.success);
      return true;
    } catch {
      dismiss(id);
      toast.error(messages.error);
      return false;
    }
  },

  dismiss,
};

export function confirmToast(
  title: string,
  onConfirm: () => void | Promise<void>,
  options?: { description?: string; onCancel?: () => void }
) {
  const id = addToast({
    type: "warning",
    title,
    description: options?.description,
    duration: 0,
    confirm: {
      confirmLabel: "Confirmer",
      cancelLabel: "Annuler",
      onConfirm: async () => {
        dismiss(id);
        await onConfirm();
      },
      onCancel: () => {
        dismiss(id);
        options?.onCancel?.();
      },
    },
  });
  return id;
}
