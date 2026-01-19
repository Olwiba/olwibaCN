import * as React from "react";

interface ComponentPreviewProps {
  children: React.ReactNode;
  title?: string;
}

export function ComponentPreview({ children, title }: ComponentPreviewProps) {
  return (
    <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
      {title && (
        <div className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
          <span className="text-sm text-neutral-500 dark:text-neutral-400">{title}</span>
        </div>
      )}
      <div className="p-8 bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center min-h-[200px]">
        {children}
      </div>
    </div>
  );
}
