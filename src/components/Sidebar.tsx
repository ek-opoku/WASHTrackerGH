"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Droplets,
  Toilet,
  Sparkles,
  BarChart3,
  Database,
  Info,
  X,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/water", label: "Water", icon: Droplets },
  { href: "/sanitation", label: "Sanitation", icon: Toilet },
  { href: "/hygiene", label: "Hygiene", icon: Sparkles },
  { href: "/sdg6-progress", label: "SDG6 Progress", icon: BarChart3 },
  { href: "/data-center", label: "Data Center", icon: Database },
  { href: "/about", label: "About", icon: Info },
] as const;

type SidebarProps = {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
};

function useIsMd() {
  const [isMd, setIsMd] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const handler = () => setIsMd(mql.matches);
    handler();
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  return isMd;
}

export function Sidebar({ mobileOpen = false, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const isMd = useIsMd();
  const isVisible = mobileOpen || isMd;

  return (
    <>
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 shrink-0 border-r border-[#1A365D] bg-[#0B192C] backdrop-blur transition-transform duration-200 md:w-72 md:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        aria-label="Main navigation"
        aria-hidden={!isVisible}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-[#1A365D] p-4 md:hidden">
            <span className="font-semibold text-cyan-400">Menu</span>
            <button
              type="button"
              onClick={onMobileClose}
              className="rounded-lg p-2 text-slate-400 hover:bg-[#1A365D] hover:text-cyan-400"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col gap-1 p-4">
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive =
                pathname === href ||
                (href !== "/" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={onMobileClose}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive
                    ? "bg-orange-500/20 text-orange-400 ring-1 ring-orange-500/40"
                    : "text-slate-300 hover:bg-[#1A365D] hover:text-orange-300"
                    }`}
                >
                  <Icon className="h-5 w-5 shrink-0" aria-hidden />
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
