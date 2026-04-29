'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { CodeFence } from './CodeFence';
import { setUsageCode, subscribeUsageCode, getUsageCode } from '@/lib/usage-code-store';

const demos: Record<string, React.LazyExoticComponent<React.FC>> = {
  // Existing demos
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
  // New demos
  accordion: React.lazy(() => import('@/demos/accordion')),
  'alert-dialog': React.lazy(() => import('@/demos/alert-dialog')),
  'aspect-ratio': React.lazy(() => import('@/demos/aspect-ratio')),
  breadcrumb: React.lazy(() => import('@/demos/breadcrumb')),
  'button-group': React.lazy(() => import('@/demos/button-group')),
  calendar: React.lazy(() => import('@/demos/calendar')),
  carousel: React.lazy(() => import('@/demos/carousel')),
  chart: React.lazy(() => import('@/demos/chart')),
  collapsible: React.lazy(() => import('@/demos/collapsible')),
  command: React.lazy(() => import('@/demos/command')),
  confetti: React.lazy(() => import('@/demos/confetti')),
  'context-menu': React.lazy(() => import('@/demos/context-menu')),
  dialog: React.lazy(() => import('@/demos/dialog')),
  drawer: React.lazy(() => import('@/demos/drawer')),
  'dropdown-menu': React.lazy(() => import('@/demos/dropdown-menu')),
  empty: React.lazy(() => import('@/demos/empty')),
  field: React.lazy(() => import('@/demos/field')),
  form: React.lazy(() => import('@/demos/form')),
  'hover-card': React.lazy(() => import('@/demos/hover-card')),
  hotkey: React.lazy(() => import('@/demos/hotkey')),
  'input-group': React.lazy(() => import('@/demos/input-group')),
  'input-otp': React.lazy(() => import('@/demos/input-otp')),
  item: React.lazy(() => import('@/demos/item')),
  kbd: React.lazy(() => import('@/demos/kbd')),
  menubar: React.lazy(() => import('@/demos/menubar')),
  'navigation-menu': React.lazy(() => import('@/demos/navigation-menu')),
  pagination: React.lazy(() => import('@/demos/pagination')),
  popover: React.lazy(() => import('@/demos/popover')),
  'radio-group': React.lazy(() => import('@/demos/radio-group')),
  resizable: React.lazy(() => import('@/demos/resizable')),
  'scroll-area': React.lazy(() => import('@/demos/scroll-area')),
  select: React.lazy(() => import('@/demos/select')),
  sheet: React.lazy(() => import('@/demos/sheet')),
  sidebar: React.lazy(() => import('@/demos/sidebar')),
  sonner: React.lazy(() => import('@/demos/sonner')),
  table: React.lazy(() => import('@/demos/table')),
  'status-indicator': React.lazy(() => import('@/demos/status-indicator')),
  'toggle-group': React.lazy(() => import('@/demos/toggle-group')),
  tooltip: React.lazy(() => import('@/demos/tooltip')),
};

// Portal context — demos render <DemoControls> in their tree,
// but the DOM gets portaled below the preview area.
const ControlsPortalContext = React.createContext<HTMLDivElement | null>(null);

// Component name context — lets useUsageCode know which store key to write to.
const ComponentNameContext = React.createContext<string>('');

export function useUsageCode(code: string) {
  const name = React.useContext(ComponentNameContext);
  React.useEffect(() => {
    if (!name) return;
    setUsageCode(name, code);
  }, [name, code]);
  React.useEffect(() => {
    if (!name) return;
    return () => setUsageCode(name, null);
  }, [name]);
}

export function LiveUsageCode({ name, defaultCode }: { name: string; defaultCode: string }) {
  const [code, setCode] = React.useState<string>(() => getUsageCode(name) ?? defaultCode);
  React.useEffect(() => {
    setCode(getUsageCode(name) ?? defaultCode);
    return subscribeUsageCode(name, (c) => setCode(c ?? defaultCode));
  }, [name, defaultCode]);
  return <CodeFence code={code} language="tsx" />;
}

export function DemoControls({ children }: { children: React.ReactNode }) {
  const target = React.useContext(ControlsPortalContext);
  if (!target) return null;
  return createPortal(
    <div className="border-t border-fd-border px-6 py-4">
      {children}
    </div>,
    target,
  );
}

interface ComponentPreviewProps {
  name: string;
  title?: string;
}

export function ComponentPreview({ name, title }: ComponentPreviewProps) {
  const Demo = demos[name];
  const [portalTarget, setPortalTarget] = React.useState<HTMLDivElement | null>(null);

  return (
    <ControlsPortalContext.Provider value={portalTarget}>
      <ComponentNameContext.Provider value={name}>
      <div className="border border-dashed border-fd-border rounded-lg overflow-visible not-prose my-6">
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
        <div ref={setPortalTarget} />
      </div>
      </ComponentNameContext.Provider>
    </ControlsPortalContext.Provider>
  );
}
