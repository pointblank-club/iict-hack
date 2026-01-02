"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ConfirmLogoutProps {
  open: boolean;
  title?: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmLogout({
  open,
  title = "Log out?",
  description = "You will be signed out of your account.",
  onConfirm,
  onCancel,
}: ConfirmLogoutProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="min-h-screen min-w-screen fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
          <motion.div
            className="relative bg-gray-900 border border-gray-700 rounded-xl p-6 w-[90%] max-w-md text-white"
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-gray-300 mb-6">{description}</p>
            <div className="flex items-center justify-end gap-3">
              <Button variant="ghost" onClick={onCancel}>Cancel</Button>
              <Button variant="destructive" onClick={onConfirm}>Logout</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


