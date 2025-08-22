import { cn } from "@/lib/utils";

type CardTitleProps = {
  title: string;
  isShare?: boolean;
  isReversed?: boolean;
  isFoil?: boolean;
};
const CardTitle = ({ title, isShare, isReversed, isFoil }: CardTitleProps) => {
  return (
    <div
      className={cn(
        "text-amber-100 flex items-center",
        isShare ? "gap-8" : "md:gap-8"
      )}>
      <div
        className={cn(
          "h-3 w-0 bg-amber-200 [clip-path:polygon(80%_20%,_0%_50%,_80%_80%,_100%_50%)]",
          isShare ? "w-20" : "md:w-20"
        )}
      />
      <div className="flex flex-col">
        <div
          className={cn(
            "text-3xl font-thin",
            isShare ? "whitespace-nowrap" : ""
          )}>
          {title}
        </div>
        <div className="flex gap-2 justify-center">
          {isFoil && <div className="font-thin text-md">FOIL</div>}
          {isReversed && <div className="font-thin text-md">REVERSED</div>}
        </div>
      </div>

      <div
        className={cn(
          "h-3 w-0 bg-amber-200 [clip-path:polygon(20%_20%,_100%_50%,_20%_80%,_0%_50%)]",
          isShare ? "w-20" : "md:w-20"
        )}
      />
    </div>
  );
};

export default CardTitle;
