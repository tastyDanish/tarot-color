import { cn } from "@/lib/utils";
import { Flame } from "lucide-react";

type StreakCounterProps = {
  count: number;
  smallText?: boolean;
};

const StreakCounter = ({ count, smallText }: StreakCounterProps) => {
  return (
    <div
      className={cn(
        "flex gap-1 text-amber-500 items-center whitespace-nowrap",
        smallText ? "text-md" : "text-xl"
      )}>
      <Flame />

      <span>{count} day streak!</span>
    </div>
  );
};

export default StreakCounter;
