import { cn } from "@/lib/utils";
import { LucideArrowBigRightDash } from "lucide-react";

type CollectionBarProps = {
  title: string;
  seen: number;
  total: number;
  onClick?: () => void;
  classNames?: string;
};
export const CollectionBar = ({
  title,
  seen,
  total,
  onClick,
  classNames,
}: CollectionBarProps) => {
  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      className={cn(
        "flex flex-row items-end w-full",
        onClick ? "cursor-pointer" : "",
        classNames
      )}>
      <div className="flex flex-col w-full items-center gap-1 pb-2">
        <div className="flex w-full justify-between pr-2">
          <span className="font-medium text-lg">{title.toUpperCase()}</span>
          <span>
            {seen} / {total}
          </span>
        </div>

        <div className="w-full bg-gray-600 rounded-r-full h-3 relative overflow-hidden">
          <div
            className={
              "h-full rounded-r-full bg-linear-to-r from-amber-600 via-yellow-500 to-orange-500 transition-all duration-300"
            }
            style={{ width: `${(seen / total) * 100}%` }}
          />
        </div>
      </div>
      {onClick && (
        <LucideArrowBigRightDash
          size={32}
          opacity={0.7}
        />
      )}
    </button>
  );
};
