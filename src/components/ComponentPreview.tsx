'use client';

import * as React from 'react';

const demos: Record<string, React.LazyExoticComponent<React.FC>> = {
  button: React.lazy(() => import('@/demos/button')),
  badge: React.lazy(() => import('@/demos/badge')),
  card: React.lazy(() => import('@/demos/card')),
  input: React.lazy(() => import('@/demos/input')),
  checkbox: React.lazy(() => import('@/demos/checkbox')),
  switch: React.lazy(() => import('@/demos/switch')),
  avatar: React.lazy(() => import('@/demos/avatar')),
  alert: React.lazy(() => import('@/demos/alert')),
  skeleton: React.lazy(() => import('@/demos/skeleton')),
  spinner: React.lazy(() => import('@/demos/spinner')),
  separator: React.lazy(() => import('@/demos/separator')),
  progress: React.lazy(() => import('@/demos/progress')),
  toggle: React.lazy(() => import('@/demos/toggle')),
  label: React.lazy(() => import('@/demos/label')),
  textarea: React.lazy(() => import('@/demos/textarea')),
  slider: React.lazy(() => import('@/demos/slider')),
  tabs: React.lazy(() => import('@/demos/tabs')),
};

interface ComponentPreviewProps {
  name: string;
  title?: string;
}

export function ComponentPreview({ name, title }: ComponentPreviewProps) {
  const Demo = demos[name];

  return (
    <div className="border border-fd-border rounded-lg overflow-hidden not-prose my-6">
      {title && (
        <div className="px-4 py-2 border-b border-fd-border bg-fd-muted/50">
          <span className="text-sm text-fd-muted-foreground">{title}</span>
        </div>
      )}
      <div className="p-8 bg-fd-background flex items-center justify-center min-h-[200px]">
        {Demo ? (
          <React.Suspense fallback={<div className="text-fd-muted-foreground">Loading...</div>}>
            <Demo />
          </React.Suspense>
        ) : (
          <p className="text-fd-muted-foreground">Demo coming soon for: {name}</p>
        )}
      </div>
    </div>
  );
}
