import * as React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

// ── Snippet components — static, no hooks ──────────────────────

function SnippetBadges() {
  return (
    <div className="flex flex-wrap gap-1">
      <Badge>Release</Badge>
      <Badge variant="secondary">v2.0</Badge>
      <Badge variant="outline">Draft</Badge>
      <Badge variant="destructive">Bug</Badge>
    </div>
  );
}

function SnippetButtons() {
  return (
    <div className="flex flex-wrap gap-1.5">
      <Button size="sm">Deploy</Button>
      <Button size="sm" variant="outline">Cancel</Button>
      <Button size="sm" variant="ghost">View</Button>
    </div>
  );
}

function SnippetButtonVariants() {
  return (
    <div className="space-y-1">
      <div className="flex gap-1">
        <Button size="sm" className="h-6 text-[10px] px-2">Default</Button>
        <Button size="sm" variant="secondary" className="h-6 text-[10px] px-2">Secondary</Button>
      </div>
      <div className="flex gap-1">
        <Button size="sm" variant="destructive" className="h-6 text-[10px] px-2">Delete</Button>
        <Button size="sm" variant="outline" className="h-6 text-[10px] px-2">Outline</Button>
      </div>
    </div>
  );
}

function SnippetCard() {
  return (
    <div className="space-y-1">
      <p className="text-[11px] font-semibold">Create project</p>
      <p className="text-[10px] text-muted-foreground">Deploy your app in one click.</p>
      <div className="flex gap-1 pt-0.5">
        <Button size="sm" className="h-6 text-[10px] px-2">Deploy</Button>
        <Button size="sm" variant="outline" className="h-6 text-[10px] px-2">Cancel</Button>
      </div>
    </div>
  );
}

function SnippetInput() {
  return (
    <div className="space-y-1">
      <Label className="text-[10px]">Email address</Label>
      <Input
        placeholder="hello@example.com"
        className="h-7 text-xs"
        readOnly
        tabIndex={-1}
      />
    </div>
  );
}

function SnippetProgress() {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between">
        <span className="text-[10px] text-muted-foreground">Upload</span>
        <span className="text-[10px] text-muted-foreground">67%</span>
      </div>
      <Progress value={67} className="h-1.5" />
      <div className="flex justify-between">
        <span className="text-[10px] text-muted-foreground">Storage</span>
        <span className="text-[10px] text-muted-foreground">42%</span>
      </div>
      <Progress value={42} className="h-1.5" />
    </div>
  );
}

function SnippetSwitches() {
  return (
    <div className="space-y-1.5">
      {[
        { label: 'Notifications', on: true },
        { label: 'Dark mode', on: false },
        { label: 'Auto-sync', on: true },
      ].map(({ label, on }) => (
        <div key={label} className="flex items-center gap-2">
          <Switch
            checked={on}
            onCheckedChange={() => void 0}
            className="scale-75 origin-left"
            tabIndex={-1}
          />
          <span className={`text-[10px] ${on ? '' : 'text-muted-foreground'}`}>{label}</span>
        </div>
      ))}
    </div>
  );
}

function SnippetAvatars() {
  return (
    <div className="space-y-1.5">
      <div className="flex -space-x-2">
        {['OB', 'CN', 'DX', 'UI'].map((f) => (
          <Avatar key={f} className="w-7 h-7 border-2 border-card">
            <AvatarFallback className="text-[9px]">{f}</AvatarFallback>
          </Avatar>
        ))}
      </div>
      <span className="text-[10px] text-muted-foreground">4 contributors</span>
    </div>
  );
}

function SnippetSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-2.5 w-full" />
      <Skeleton className="h-2.5 w-4/5" />
      <Skeleton className="h-2.5 w-3/5" />
      <div className="flex gap-2 pt-1">
        <Skeleton className="h-5 w-14 rounded-md" />
        <Skeleton className="h-5 w-10 rounded-md" />
      </div>
    </div>
  );
}

function SnippetTabs() {
  return (
    <div className="space-y-2">
      <Tabs defaultValue="preview">
        <TabsList className="h-7">
          <TabsTrigger value="preview" className="text-[10px] h-5 px-2">Preview</TabsTrigger>
          <TabsTrigger value="code" className="text-[10px] h-5 px-2">Code</TabsTrigger>
          <TabsTrigger value="docs" className="text-[10px] h-5 px-2">Docs</TabsTrigger>
        </TabsList>
      </Tabs>
      <p className="text-[10px] text-muted-foreground">Interactive component preview</p>
    </div>
  );
}

function SnippetCheckboxes() {
  return (
    <div className="space-y-1.5">
      {[
        { label: 'TypeScript', checked: true },
        { label: 'Tailwind CSS', checked: true },
        { label: 'Radix UI', checked: true },
        { label: 'shadcn/ui', checked: false },
      ].map(({ label, checked }) => (
        <div key={label} className="flex items-center gap-1.5">
          <Checkbox
            checked={checked}
            onCheckedChange={() => void 0}
            className="w-3 h-3"
            tabIndex={-1}
          />
          <span className="text-[10px]">{label}</span>
        </div>
      ))}
    </div>
  );
}

function SnippetSeparator() {
  return (
    <div className="space-y-1.5">
      <p className="text-[10px] font-medium">Components</p>
      <Separator />
      <div className="flex flex-wrap gap-1">
        {['Button', 'Badge', 'Card', 'Input', 'Tabs'].map((c) => (
          <Badge key={c} variant="outline" className="text-[9px] px-1 py-0 h-4">{c}</Badge>
        ))}
      </div>
    </div>
  );
}

function SnippetAlert() {
  return (
    <Alert className="py-2 px-3">
      <AlertDescription className="text-[10px] leading-relaxed">
        50+ components ready to copy, paste, and customize.
      </AlertDescription>
    </Alert>
  );
}

// ── Grid builder ───────────────────────────────────────────────

const SNIPPETS: React.ReactNode[] = [
  <SnippetBadges key="badges" />,
  <SnippetButtons key="buttons" />,
  <SnippetCard key="card" />,
  <SnippetInput key="input" />,
  <SnippetProgress key="progress" />,
  <SnippetSwitches key="switches" />,
  <SnippetAvatars key="avatars" />,
  <SnippetSkeleton key="skeleton" />,
  <SnippetTabs key="tabs" />,
  <SnippetCheckboxes key="checkboxes" />,
  <SnippetSeparator key="separator" />,
  <SnippetAlert key="alert" />,
  <SnippetButtonVariants key="button-variants" />,
];

const COLS = 7;
const ROWS = 10;

function buildGrid(items: React.ReactNode[], rows: number, cols: number): React.ReactNode[][] {
  return Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => items[(r * cols + c) % items.length])
  );
}

// ── Component ─────────────────────────────────────────────────

export function IsometricCanvas() {
  const baseRows = React.useMemo(() => buildGrid(SNIPPETS, ROWS, COLS), []);

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      style={{
        maskImage:
          'radial-gradient(ellipse 80% 70% at 50% 50%, black 15%, transparent 75%)',
        WebkitMaskImage:
          'radial-gradient(ellipse 80% 70% at 50% 50%, black 15%, transparent 75%)',
      }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 flex items-center justify-center opacity-[0.18] dark:opacity-[0.12]"
        style={{ perspective: '700px', perspectiveOrigin: '50% 50%' }}
      >
        <div
          className="transform-gpu"
          style={{
            transform: 'scale(1.6) rotateX(55deg) rotateZ(-45deg)',
            transformOrigin: 'center center',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Doubled rows for seamless loop */}
          <div className="animate-iso-scroll will-change-transform">
            {[...baseRows, ...baseRows].map((row, rowIdx) => (
              <div key={rowIdx} className="flex gap-3 mb-3">
                {row.map((snippet, colIdx) => (
                  <div
                    key={colIdx}
                    className="bg-card border rounded-lg p-3 w-44 h-24 shrink-0 overflow-hidden"
                  >
                    {snippet}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
