"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, LogOut, LayoutDashboard } from "lucide-react";
import ConfirmLogout from "@/components/ui/confirm-logout";

interface AccountMenuProps {
  teamName: string;
  onGoToDashboard: () => void;
  onLogout: () => void;
}

export default function AccountMenu({ teamName, onGoToDashboard, onLogout }: AccountMenuProps) {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        className="flex items-center gap-2 font-semibold text-[#C83DAD] hover:text-[#A12A89] transition-colors"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="truncate max-w-[160px]">{teamName}</span>
        <ChevronDown size={18} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute left-0 mt-2 w-48 rounded-xl border border-gray-200 bg-white text-gray-900 shadow-xl"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            role="menu"
          >
            <button
              className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-100 rounded-t-xl"
              onClick={() => { setOpen(false); onGoToDashboard(); }}
              role="menuitem"
            >
              <LayoutDashboard size={18} className="text-[#C83DAD]" />
              <span>Dashboard</span>
            </button>
            <button
              className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-100 text-red-600 rounded-b-xl"
              onClick={() => { setOpen(false); setConfirm(true); }}
              role="menuitem"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <ConfirmLogout
        open={confirm}
        onCancel={() => setConfirm(false)}
        onConfirm={() => { setConfirm(false); onLogout(); }}
      />
    </div>
  );
}


