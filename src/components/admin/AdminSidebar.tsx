"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigateWithToast } from "@/lib/navigation";
import { toast } from "@/lib/toast";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  FolderOpen,
  FileText,
  MessageSquare,
  ClipboardList,
  Users,
  LogOut,
  Images,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/projets", label: "Réalisations", icon: FolderOpen },
  { href: "/admin/articles", label: "Articles", icon: FileText },
  { href: "/admin/slides", label: "Slides Hero", icon: Images },
  { href: "/admin/devis", label: "Devis", icon: ClipboardList, badgeKey: "quotesNew" as const },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare, badgeKey: "messagesNew" as const },
  { href: "/admin/utilisateurs", label: "Utilisateurs", icon: Users },
];

interface NavStats {
  quotesNew: number;
  messagesNew: number;
}

export function AdminSidebar() {
  const pathname = usePathname();
  const [stats, setStats] = useState<NavStats>({ quotesNew: 0, messagesNew: 0 });

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setStats({ quotesNew: data.quotesNew, messagesNew: data.messagesNew });
        }
      })
      .catch(() => {});
  }, [pathname]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    navigateWithToast("/admin/login", () => toast.info("Déconnexion réussie"));
  };

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <aside className="w-64 bg-secondary text-white flex flex-col shrink-0">
      <div className="p-6 border-b border-white/10">
        <Link href="/admin" className="flex items-center">
          <Logo variant="admin" href="/admin" />
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const active = isActive(item.href, item.exact);
          const badge =
            item.badgeKey === "quotesNew"
              ? stats.quotesNew
              : item.badgeKey === "messagesNew"
                ? stats.messagesNew
                : 0;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                active ? "bg-primary text-white" : "text-white/60 hover:text-white hover:bg-white/10"
              )}
            >
              <span className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                {item.label}
              </span>
              {badge > 0 && (
                <span
                  className={cn(
                    "min-w-5 h-5 px-1.5 rounded-full text-xs font-bold flex items-center justify-center",
                    active ? "bg-white text-primary" : "bg-primary text-white"
                  )}
                >
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 w-full transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
