import { createFileRoute, Link } from "@tanstack/react-router";

const components = [
  // Data Display
  { name: "accordion", title: "Accordion", description: "Vertically stacked interactive headings", category: "Data Display" },
  { name: "avatar", title: "Avatar", description: "Image element with a fallback", category: "Data Display" },
  { name: "badge", title: "Badge", description: "Displays a badge or status descriptor", category: "Data Display" },
  { name: "card", title: "Card", description: "Displays a card with header, content, and footer", category: "Data Display" },
  { name: "carousel", title: "Carousel", description: "A carousel with motion and swipe gestures", category: "Data Display" },
  { name: "chart", title: "Chart", description: "Chart components", category: "Data Display" },
  { name: "collapsible", title: "Collapsible", description: "Interactive component that expands/collapses", category: "Data Display" },
  { name: "empty", title: "Empty", description: "Empty state component", category: "Data Display" },
  { name: "table", title: "Table", description: "Data table component", category: "Data Display" },
  
  // Feedback
  { name: "alert", title: "Alert", description: "Displays a callout for user attention", category: "Feedback" },
  { name: "progress", title: "Progress", description: "Progress indicator bar", category: "Feedback" },
  { name: "skeleton", title: "Skeleton", description: "Loading placeholder animation", category: "Feedback" },
  { name: "sonner", title: "Sonner", description: "Toast notification system", category: "Feedback" },
  { name: "spinner", title: "Spinner", description: "Loading spinner", category: "Feedback" },
  
  // Inputs
  { name: "button", title: "Button", description: "Displays a button or link styled as a button", category: "Inputs" },
  { name: "button-group", title: "Button Group", description: "Group of buttons", category: "Inputs" },
  { name: "calendar", title: "Calendar", description: "Date field component for picking dates", category: "Inputs" },
  { name: "checkbox", title: "Checkbox", description: "Control that allows multiple selections", category: "Inputs" },
  { name: "command", title: "Command", description: "Command menu for quick actions", category: "Inputs" },
  { name: "field", title: "Field", description: "Form field wrapper", category: "Inputs" },
  { name: "form", title: "Form", description: "Form components with validation", category: "Inputs" },
  { name: "input", title: "Input", description: "Text input field", category: "Inputs" },
  { name: "input-group", title: "Input Group", description: "Group of input elements", category: "Inputs" },
  { name: "input-otp", title: "Input OTP", description: "One-time password input", category: "Inputs" },
  { name: "label", title: "Label", description: "Accessible label for form controls", category: "Inputs" },
  { name: "radio-group", title: "Radio Group", description: "Set of selectable radio buttons", category: "Inputs" },
  { name: "select", title: "Select", description: "Dropdown selection control", category: "Inputs" },
  { name: "slider", title: "Slider", description: "Input for selecting numeric values", category: "Inputs" },
  { name: "switch", title: "Switch", description: "Toggle switch control", category: "Inputs" },
  { name: "textarea", title: "Textarea", description: "Multi-line text input", category: "Inputs" },
  { name: "toggle", title: "Toggle", description: "Two-state button control", category: "Inputs" },
  { name: "toggle-group", title: "Toggle Group", description: "Group of toggle buttons", category: "Inputs" },
  
  // Layout
  { name: "aspect-ratio", title: "Aspect Ratio", description: "Displays content within a desired ratio", category: "Layout" },
  { name: "resizable", title: "Resizable", description: "Resizable panel groups", category: "Layout" },
  { name: "scroll-area", title: "Scroll Area", description: "Custom scrollbar component", category: "Layout" },
  { name: "separator", title: "Separator", description: "Visual divider between content", category: "Layout" },
  
  // Navigation
  { name: "breadcrumb", title: "Breadcrumb", description: "Displays the path to the current page", category: "Navigation" },
  { name: "menubar", title: "Menubar", description: "Horizontal menu bar", category: "Navigation" },
  { name: "navigation-menu", title: "Navigation Menu", description: "Navigation links with submenus", category: "Navigation" },
  { name: "pagination", title: "Pagination", description: "Navigation for paginated content", category: "Navigation" },
  { name: "sidebar", title: "Sidebar", description: "Application sidebar navigation", category: "Navigation" },
  { name: "tabs", title: "Tabs", description: "Tabbed interface component", category: "Navigation" },
  
  // Overlay
  { name: "alert-dialog", title: "Alert Dialog", description: "Modal dialog that interrupts the user", category: "Overlay" },
  { name: "context-menu", title: "Context Menu", description: "Menu shown on right-click", category: "Overlay" },
  { name: "dialog", title: "Dialog", description: "Modal dialog window", category: "Overlay" },
  { name: "drawer", title: "Drawer", description: "Slide-in panel from edge of screen", category: "Overlay" },
  { name: "dropdown-menu", title: "Dropdown Menu", description: "Menu for navigation or commands", category: "Overlay" },
  { name: "hover-card", title: "Hover Card", description: "Card shown on hover", category: "Overlay" },
  { name: "popover", title: "Popover", description: "Floating content panel", category: "Overlay" },
  { name: "sheet", title: "Sheet", description: "Slide-out panel component", category: "Overlay" },
  { name: "tooltip", title: "Tooltip", description: "Popup with helpful text", category: "Overlay" },
  
  // Utilities
  { name: "item", title: "Item", description: "List item component", category: "Utilities" },
  { name: "kbd", title: "Kbd", description: "Keyboard key indicator", category: "Utilities" },
  { name: "utils", title: "Utils", description: "cn() utility function", category: "Utilities" },
  { name: "use-mobile", title: "useMobile", description: "Hook to detect mobile viewport", category: "Utilities" },
];

export const Route = createFileRoute("/components/")({
  component: ComponentsIndex,
});

function ComponentsIndex() {
  const categories = ["Data Display", "Feedback", "Inputs", "Layout", "Navigation", "Overlay", "Utilities"];

  return (
    <div className="min-h-screen p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Components</h1>
      <p className="text-neutral-500 dark:text-neutral-400 mb-8">
        {components.length} components available in the olwibaCN registry.
      </p>

      {categories.map((category) => (
        <div key={category} className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-neutral-700 dark:text-neutral-300">
            {category}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {components
              .filter((c) => c.category === category)
              .map((component) => (
                <Link
                  key={component.name}
                  to="/components/$slug"
                  params={{ slug: component.name }}
                  className="block p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
                >
                  <h3 className="font-medium mb-1">{component.title}</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                    {component.description}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
