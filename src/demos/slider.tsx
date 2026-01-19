import { Slider } from "~/components/ui/slider";

export default function SliderDemo() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <Slider defaultValue={[50]} max={100} step={1} />
      <Slider defaultValue={[25, 75]} max={100} step={1} />
    </div>
  );
}
