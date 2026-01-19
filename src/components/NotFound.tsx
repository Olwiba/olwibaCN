import { Link } from "@tanstack/react-router";

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-neutral-400 mb-8">Page not found</p>
        <Link to="/" className="text-blue-400 hover:underline">
          Go home
        </Link>
      </div>
    </div>
  );
}
