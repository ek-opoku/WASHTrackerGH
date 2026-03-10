"use client";

import { User, Menu } from "lucide-react";

type HeaderProps = {
  onMenuClick?: () => void;
};

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur shadow-sm sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-cyan-600 md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" aria-hidden />
        </button>
        <h1 className="text-lg font-bold tracking-tight sm:text-xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B192C] via-cyan-600 to-orange-500">WASHTrackerGH</span>
        </h1>
      </div>
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[#0B192C] transition-colors hover:bg-orange-50 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          aria-label="User profile"
        >
          <User className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </header>
  );
}
