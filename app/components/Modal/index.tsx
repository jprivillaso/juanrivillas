"use client";

import { XCircle } from "lucide-react";
import { Fragment, ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  children: ReactNode | ReactNode[];
  onClose: () => void;
};

export const Modal = ({ isOpen, children, onClose }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <Fragment>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90] animate-quick-fade-in"
        onClick={onClose}
        onKeyUp={(e) => e.key === "Escape" && onClose()}
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="animate-quick-fade-in flex items-center justify-center w-full max-w-md max-h-[90vh] sm:max-h-[80vh] rounded-xl overflow-hidden bg-zinc-900/95 backdrop-blur-md border border-zinc-800/50 shadow-2xl relative">
          {/* Subtle glow effect matching your site's aesthetic */}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/20 via-transparent to-zinc-700/20" />
          {/* Particles-like subtle pattern */}
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.1)_1px,transparent_1px),radial-gradient(circle_at_75%_75%,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:40px_40px,60px_60px]" />
          <XCircle
            className="absolute top-3 right-3 sm:top-5 sm:right-5 cursor-pointer text-zinc-400 hover:text-red-400 hover:bg-zinc-800/20 rounded-full p-1 transition-all duration-200 z-20"
            size={28}
            onClick={onClose}
          />
          {/* Content container with glass effect */}
          <div className="relative z-10 w-full h-full flex items-center justify-center overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
