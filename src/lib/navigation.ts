/** Navigation sûre — évite "Router action dispatched before initialization" */
export function hardNavigate(href: string) {
  window.location.href = href;
}

export function softRefresh() {
  window.location.reload();
}

/** Affiche un toast puis navigue après un court délai */
export function navigateWithToast(href: string, onNavigate?: () => void) {
  onNavigate?.();
  setTimeout(() => hardNavigate(href), 1200);
}
