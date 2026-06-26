import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { LucideArrowBigRightDash } from "lucide-react";

const CARD_WIDTH = 32; // matches w-8

const TinyCard = ({ collected }: { collected: boolean }) => {
  return (
    <div
      className={cn(
        collected ? "border-amber-950" : "border-amber-950/20",
        "w-8 h-12 rounded-sm border-2 shrink-0 p-0.5 bg-orange-100"
      )}>
      <div
        className={cn(
          collected ? "bg-amber-950 " : "bg-orange-100",
          "w-full h-full rounded-sm text-orange-100 overflow-hidden flex flex-row items-center justify-center"
        )}>
        <div className="pb-1">★</div>
      </div>
    </div>
  );
};

type CollectionBarProps = {
  title: string;
  seen: number;
  total: number;
  hideBar?: boolean;
  onClick?: () => void;
  classNames?: string;
};

export const CollectionBar = ({
  title,
  seen,
  total,
  onClick,
  hideBar,
  classNames,
}: CollectionBarProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // step = how far each card's left edge is from the previous one.
  // capped at CARD_WIDTH so cards never *spread out* past their natural size,
  // only overlap when there isn't enough room.
  const step =
    total > 1
      ? Math.min(CARD_WIDTH, (containerWidth - CARD_WIDTH) / (total - 1))
      : CARD_WIDTH;

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
          <div className="flex flex-row items-center gap-4">
            <span>
              {seen} / {total}
            </span>
            {onClick && (
              <LucideArrowBigRightDash
                size={20}
                opacity={0.7}
              />
            )}
          </div>
        </div>

        <div
          ref={containerRef}
          className={cn(hideBar ? "hidden" : "relative", "w-full h-12")}>
          {Array.from({ length: total }).map((_, i) => {
            const idx = total - 1 - i; // reverse render order for stacking
            return (
              <div
                key={idx}
                className="absolute top-0"
                style={{ left: idx * step }}>
                <TinyCard collected={idx < seen} />
              </div>
            );
          })}
        </div>
      </div>
    </button>
  );
};
