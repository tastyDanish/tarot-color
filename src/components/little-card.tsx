import { cn } from "@/lib/utils";

const LittleCard = (props: { rotation: string }) => {
  return (
    <div
      className={cn(
        "border-2 border-amber-900 shadow-2xl rounded-sm",
        props.rotation
      )}>
      <div className="w-18 h-28 border-4 border-orange-100 bg-amber-950 relative overflow-hidden flex justify-center items-center">
        <div className="absolute bg-orange-100 h-full w-1" />
        <div className="absolute bg-orange-100 h-4 w-4 rounded-full transform-x-30" />
        <div className="absolute border-orange-100 border-2 h-8 w-8 rounded-full" />
      </div>
    </div>
  );
};

export default LittleCard;
