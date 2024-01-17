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
      <div className="flex items-center justify-center bg-white w-10/12 h-5/6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
        <XCircle
          className="absolute top-5 right-5 cursor-pointer hover:opacity-80 hover:stroke-white"
          size={48}
          onClick={onClose}
        />
        {children}
      </div>
    </Fragment>
  );
};
