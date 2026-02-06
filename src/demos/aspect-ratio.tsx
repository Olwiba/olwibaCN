import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function AspectRatioDemo() {
  return (
    <div className="w-[300px]">
      <AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden">
        <img
          src="/og-image.png"
          alt="olwiba"
          className="h-full w-full object-cover"
        />
      </AspectRatio>
    </div>
  );
}
