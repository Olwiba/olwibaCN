import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <div className="overflow-hidden rounded-lg border">
        <TabsList className="grid h-12 w-full grid-cols-2 rounded-none border-b border-border bg-muted/50 p-0 [&>button]:h-full [&>button]:rounded-none [&>button]:py-3 [&>button]:px-4  [&>button[data-state=active]]:border-b-2 [&>button[data-state=active]]:border-primary [&>button[data-state=active]]:-mb-px [&>button[data-state=active]]:bg-background [&>button[data-state=active]]:shadow-none">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="mt-0 rounded-none border-0 p-4 focus-visible:ring-0 focus-visible:ring-offset-0">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password" className="mt-0 rounded-none border-0 p-4 focus-visible:ring-0 focus-visible:ring-offset-0">
          Change your password here.
        </TabsContent>
      </div>
    </Tabs>
  );
}
