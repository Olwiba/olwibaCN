import { MoreHorizontal } from "lucide-react";
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemMedia,
  ItemActions,
  ItemGroup,
} from "@/components/ui/item";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function ItemDemo() {
  return (
    <ItemGroup className="w-full max-w-md border rounded-lg">
      <Item>
        <ItemMedia variant="image">
          <Avatar>
            <AvatarImage src="/android-chrome-512x512.png" />
            <AvatarFallback>OC</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>John Doe</ItemTitle>
          <ItemDescription>Software Engineer at Acme Inc.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </ItemActions>
      </Item>
      <Item>
        <ItemMedia variant="image">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Jane Smith</ItemTitle>
          <ItemDescription>Product Designer at Vercel</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </ItemActions>
      </Item>
    </ItemGroup>
  );
}
