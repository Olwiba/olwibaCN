import { createFileRoute, Link } from "@tanstack/react-router";
import * as React from "react";
import { CopyButton } from "~/components/CopyButton";
import { InstallationTabs } from "~/components/InstallationTabs";
import { ComponentPreview } from "~/components/ComponentPreview";
import { CodeBlock } from "~/components/CodeBlock";

// Component metadata
const componentData: Record<string, {
  title: string;
  description: string;
  usage: string;
  import: string;
}> = {
  button: {
    title: "Button",
    description: "Displays a button or a component that looks like a button.",
    import: `import { Button } from "@/components/ui/button"`,
    usage: `<Button variant="outline">Button</Button>`,
  },
  badge: {
    title: "Badge",
    description: "Displays a badge or a component that looks like a badge.",
    import: `import { Badge } from "@/components/ui/badge"`,
    usage: `<Badge variant="secondary">Badge</Badge>`,
  },
  card: {
    title: "Card",
    description: "Displays a card with header, content, and footer.",
    import: `import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"`,
    usage: `<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>`,
  },
  input: {
    title: "Input",
    description: "Displays a form input field or a component that looks like an input.",
    import: `import { Input } from "@/components/ui/input"`,
    usage: `<Input type="email" placeholder="Email" />`,
  },
  checkbox: {
    title: "Checkbox",
    description: "A control that allows the user to toggle between checked and not checked.",
    import: `import { Checkbox } from "@/components/ui/checkbox"`,
    usage: `<Checkbox id="terms" />`,
  },
  switch: {
    title: "Switch",
    description: "A control that allows the user to toggle between two states.",
    import: `import { Switch } from "@/components/ui/switch"`,
    usage: `<Switch id="airplane-mode" />`,
  },
  avatar: {
    title: "Avatar",
    description: "An image element with a fallback for representing the user.",
    import: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"`,
    usage: `<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`,
  },
  alert: {
    title: "Alert",
    description: "Displays a callout for user attention.",
    import: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"`,
    usage: `<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>You can add components to your app.</AlertDescription>
</Alert>`,
  },
  skeleton: {
    title: "Skeleton",
    description: "Use to show a placeholder while content is loading.",
    import: `import { Skeleton } from "@/components/ui/skeleton"`,
    usage: `<Skeleton className="w-[100px] h-[20px] rounded-full" />`,
  },
  spinner: {
    title: "Spinner",
    description: "A loading spinner indicator.",
    import: `import { Spinner } from "@/components/ui/spinner"`,
    usage: `<Spinner />`,
  },
  separator: {
    title: "Separator",
    description: "Visually or semantically separates content.",
    import: `import { Separator } from "@/components/ui/separator"`,
    usage: `<Separator />`,
  },
  progress: {
    title: "Progress",
    description: "Displays an indicator showing the completion progress of a task.",
    import: `import { Progress } from "@/components/ui/progress"`,
    usage: `<Progress value={33} />`,
  },
  toggle: {
    title: "Toggle",
    description: "A two-state button that can be either on or off.",
    import: `import { Toggle } from "@/components/ui/toggle"`,
    usage: `<Toggle>Toggle</Toggle>`,
  },
  label: {
    title: "Label",
    description: "Renders an accessible label associated with controls.",
    import: `import { Label } from "@/components/ui/label"`,
    usage: `<Label htmlFor="email">Your email address</Label>`,
  },
  textarea: {
    title: "Textarea",
    description: "Displays a form textarea or a component that looks like a textarea.",
    import: `import { Textarea } from "@/components/ui/textarea"`,
    usage: `<Textarea placeholder="Type your message here." />`,
  },
  slider: {
    title: "Slider",
    description: "An input where the user selects a value from within a given range.",
    import: `import { Slider } from "@/components/ui/slider"`,
    usage: `<Slider defaultValue={[50]} max={100} step={1} />`,
  },
  tabs: {
    title: "Tabs",
    description: "A set of layered sections of content that are displayed one at a time.",
    import: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"`,
    usage: `<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account content</TabsContent>
  <TabsContent value="password">Password content</TabsContent>
</Tabs>`,
  },
};

// Lazy load component demos
const demos: Record<string, React.LazyExoticComponent<React.FC>> = {
  button: React.lazy(() => import("~/demos/button")),
  badge: React.lazy(() => import("~/demos/badge")),
  card: React.lazy(() => import("~/demos/card")),
  input: React.lazy(() => import("~/demos/input")),
  checkbox: React.lazy(() => import("~/demos/checkbox")),
  switch: React.lazy(() => import("~/demos/switch")),
  avatar: React.lazy(() => import("~/demos/avatar")),
  alert: React.lazy(() => import("~/demos/alert")),
  skeleton: React.lazy(() => import("~/demos/skeleton")),
  spinner: React.lazy(() => import("~/demos/spinner")),
  separator: React.lazy(() => import("~/demos/separator")),
  progress: React.lazy(() => import("~/demos/progress")),
  toggle: React.lazy(() => import("~/demos/toggle")),
  label: React.lazy(() => import("~/demos/label")),
  textarea: React.lazy(() => import("~/demos/textarea")),
  slider: React.lazy(() => import("~/demos/slider")),
  tabs: React.lazy(() => import("~/demos/tabs")),
};

// Get all component slugs for prev/next navigation
const allComponents = Object.keys(componentData).sort();

export const Route = createFileRoute("/components/$slug")({
  component: ComponentPage,
});

function ComponentPage() {
  const { slug } = Route.useParams();
  const data = componentData[slug];
  const Demo = demos[slug];
  
  const currentIndex = allComponents.indexOf(slug);
  const prevSlug = currentIndex > 0 ? allComponents[currentIndex - 1] : null;
  const nextSlug = currentIndex < allComponents.length - 1 ? allComponents[currentIndex + 1] : null;

  const quickCommand = `bunx shadcn@latest add @olwibacn/${slug}`;

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      {/* Top nav */}
      <div className="flex items-center justify-between mb-8">
        <Link
          to="/components"
          className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
        >
          ← Components
        </Link>
        <div className="flex items-center gap-2">
          {prevSlug && (
            <Link
              to="/components/$slug"
              params={{ slug: prevSlug }}
              className="px-3 py-1 text-sm rounded-md border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              ← {componentData[prevSlug]?.title || prevSlug}
            </Link>
          )}
          {nextSlug && (
            <Link
              to="/components/$slug"
              params={{ slug: nextSlug }}
              className="px-3 py-1 text-sm rounded-md border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              {componentData[nextSlug]?.title || nextSlug} →
            </Link>
          )}
        </div>
      </div>

      {/* Quick install */}
      <div className="flex items-center justify-end mb-4">
        <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-3 py-2">
          <code className="text-sm font-mono">{quickCommand}</code>
          <CopyButton text={quickCommand} />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-2">{data?.title || slug}</h1>
      <p className="text-neutral-500 dark:text-neutral-400 mb-8">
        {data?.description || `A customizable ${slug} component.`}
      </p>

      {/* Preview */}
      <div className="mb-12">
        <ComponentPreview title={`${data?.title || slug} preview`}>
          {Demo ? (
            <React.Suspense fallback={<div className="text-neutral-500">Loading...</div>}>
              <Demo />
            </React.Suspense>
          ) : (
            <p className="text-neutral-500">Demo coming soon</p>
          )}
        </ComponentPreview>
      </div>

      {/* Installation */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Installation</h2>
        <hr className="border-neutral-200 dark:border-neutral-800 mb-6" />
        <InstallationTabs packageName={slug} />
      </section>

      {/* Usage */}
      {data && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Usage</h2>
          <hr className="border-neutral-200 dark:border-neutral-800 mb-6" />
          <div className="space-y-4">
            <CodeBlock code={data.import} />
            <CodeBlock code={data.usage} />
          </div>
        </section>
      )}

      {/* Bottom nav */}
      <div className="flex items-center justify-between pt-8 border-t border-neutral-200 dark:border-neutral-800">
        {prevSlug ? (
          <Link
            to="/components/$slug"
            params={{ slug: prevSlug }}
            className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
          >
            ← {componentData[prevSlug]?.title || prevSlug}
          </Link>
        ) : <div />}
        {nextSlug && (
          <Link
            to="/components/$slug"
            params={{ slug: nextSlug }}
            className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
          >
            {componentData[nextSlug]?.title || nextSlug} →
          </Link>
        )}
      </div>
    </div>
  );
}
