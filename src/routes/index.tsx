import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">olwibaCN</h1>
        <p className="text-neutral-500 dark:text-neutral-400 mb-8">Custom shadcn/ui registry</p>
        
        <div className="space-y-4">
          <code className="block bg-neutral-100 dark:bg-neutral-800 px-4 py-2 rounded text-sm">
            shadcn add @olwibacn/button
          </code>
          
          <Link
            to="/components"
            className="inline-block px-6 py-2 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-md font-medium hover:bg-neutral-800 dark:hover:bg-white/90 transition-colors"
          >
            Browse Components
          </Link>
        </div>
      </div>
    </div>
  );
}
