import { cn } from "@/lib/utils";

type CardTitleProps = {
  title: string;
  isShare?: boolean;
  isReversed?: boolean;
  isFoil?: boolean;
  isDeprived?: boolean;
};
const CardTitle = ({
  title,
  isShare,
  isReversed,
  isFoil,
  isDeprived,
}: CardTitleProps) => {
  return (
    <div
      className={cn(
        "text-amber-100 flex items-center",
        isShare ? "gap-8" : "md:gap-8"
      )}>
      <div
        className={cn(
          "h-3 w-0 bg-amber-200 [clip-path:polygon(80%_20%,0%_50%,80%_80%,100%_50%)]",
          isShare ? "w-0" : "md:w-20"
        )}
      />
      <div className="flex flex-col">
        <div
          className={cn(
            "text-3xl font-bold",
            isShare ? "whitespace-nowrap" : ""
          )}>
          {title}
        </div>
        <div className="flex gap-2 justify-center">
          {isFoil && <div className="text-md">FOIL</div>}
          {isReversed && <div className="text-md">REVERSED</div>}
          {isDeprived && <div className="text-md">DEPRIVED</div>}
        </div>
      </div>

      <div
        className={cn(
          "h-3 w-0 bg-amber-200 [clip-path:polygon(20%_20%,100%_50%,20%_80%,0%_50%)]",
          isShare ? "w-0" : "md:w-20"
        )}
      />
    </div>
  );
};

export default CardTitle;
