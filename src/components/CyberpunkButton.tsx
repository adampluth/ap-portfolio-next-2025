"use client";
import React from "react";

interface CyberpunkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export default function CyberpunkButton({ label, className, ...props }: CyberpunkButtonProps) {
  return (
    <button
      {...props}
      className={`cyberpunk-btn btn ${className ? className : ""}`}
    >
      {label}
    </button>
  );
}
