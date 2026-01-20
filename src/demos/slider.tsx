import { Slider } from "@/components/ui/slider";

export default function SliderDemo() {
  return (
    <div className="w-[300px]">
      <Slider defaultValue={[50]} max={100} step={1} />
    </div>
  );
}
