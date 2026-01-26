"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CopyButton } from "./CopyButton";

interface CodeFenceProps {
  children?: React.ReactNode;
  code?: string;
  className?: string;
}

// Recursively extract text from React nodes (handles rehype-pretty-code nested spans)
function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (React.isValidElement(node) && node.props.children) {
    return extractText(node.props.children);
  }
  return "";
}

export function CodeFence({ children, code, className }: CodeFenceProps) {
  // If code prop is provided, use it directly; otherwise extract from children
  const textContent = code ?? extractText(children).trim();

  return (
    <div className={cn("group relative my-4", className)}>
      <pre className="no-scrollbar min-w-0 overflow-x-auto rounded-lg border bg-code text-code-foreground px-4 py-3.5 pr-12 text-sm font-mono">
        {children ?? <code>{code}</code>}
      </pre>
      <CopyButton
        text={textContent}
        className="absolute right-2.5 top-2.5 z-10"
      />
    </div>
  );
}
