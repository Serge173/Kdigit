export const QUOTE_STATUS_OPTIONS = [
  { value: "NEW", label: "Nouveau" },
  { value: "IN_PROGRESS", label: "En cours" },
  { value: "QUOTED", label: "Devis envoyé" },
  { value: "ACCEPTED", label: "Accepté" },
  { value: "REJECTED", label: "Refusé" },
  { value: "CLOSED", label: "Clôturé" },
] as const;

export const QUOTE_STATUS_LABELS = Object.fromEntries(
  QUOTE_STATUS_OPTIONS.map((option) => [option.value, option.label])
);

export function quoteStatusBadgeClass(status: string) {
  switch (status) {
    case "NEW":
      return "bg-primary/10 text-primary";
    case "IN_PROGRESS":
      return "bg-amber-100 text-amber-800";
    case "QUOTED":
      return "bg-blue-100 text-blue-800";
    case "ACCEPTED":
      return "bg-emerald-100 text-emerald-800";
    case "REJECTED":
      return "bg-red-100 text-red-800";
    case "CLOSED":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
}
