import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="p-4 border rounded-b-md border-t-0">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password" className="p-4 border rounded-b-md border-t-0">
        Change your password here.
      </TabsContent>
    </Tabs>
  );
}
