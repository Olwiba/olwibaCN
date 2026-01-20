import * as React from "react";
import { CopyButton } from "./CopyButton";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "tsx" }: CodeBlockProps) {
  return (
    <div className="relative">
      <pre className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 pr-12 text-sm font-mono overflow-x-auto">
        <code>{code.trim()}</code>
      </pre>
      <CopyButton text={code.trim()} className="absolute top-3 right-3" />
    </div>
  );
}
