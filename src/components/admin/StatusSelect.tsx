"use client";

interface StatusSelectProps {
  value: string;
  options: { value: string; label: string }[];
  onChange: (status: string) => void;
  disabled?: boolean;
}

export function StatusSelect({ value, options, onChange, disabled }: StatusSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="text-xs px-2 py-1 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}
