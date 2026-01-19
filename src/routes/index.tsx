import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">olwibaCN</h1>
        <p className="text-neutral-400 mb-8">Custom shadcn/ui registry</p>
        <code className="bg-neutral-800 px-4 py-2 rounded text-sm">
          shadcn add @olwibacn/button
        </code>
      </div>
    </div>
  );
}
