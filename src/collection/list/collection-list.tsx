import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { TarotCardStats } from "@/stores/use-collection-store";
import { useMemo, useState } from "react";
import CardCounter from "./card-counter";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowDown01, ArrowDown10 } from "lucide-react";
import PaperTexture from "@/components/paper-texture";

type CollectionListProps = {
  cards: TarotCardStats[];
  starSet: TarotCardStats[];
};

type SortBy = "order" | "seen" | "foil" | "reversed" | "deprived";
type Filter = "seen" | "unseen" | "star" | null;

export const CollectionList = ({ cards, starSet }: CollectionListProps) => {
  const [filter, setFilter] = useState<Filter>(null);
  const [sort, setSort] = useState<SortBy>("order");
  const [direction, setDirection] = useState<"asc" | "desc">("asc");
  const isSeen = (card: TarotCardStats) => {
    return (
      filter === null ||
      (filter === "seen" && card.seen) ||
      (filter === "unseen" && !card.seen) ||
      (filter === "star" && starSet.some((s) => s.name === card.name))
    );
  };
  const filteredCards = useMemo(
    () =>
      cards.sort((a, b) =>
        direction === "asc" ? a[sort] - b[sort] : b[sort] - a[sort]
      ),
    [cards, direction, sort]
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-orange-100 text-amber-950 p-3 relative rounded-t-xl w-80 md:w-120 flex flex-col gap-4">
        {/* Filter row */}
        <div className="flex flex-row items-center gap-3">
          <span className="shrink-0 text-sm">FILTER</span>
          <ToggleGroup
            type="single"
            value={filter ?? ""}
            variant={"outline"}
            onValueChange={(val) =>
              setFilter(val === "" ? null : (val as "seen" | "unseen" | "star"))
            }>
            <ToggleGroupItem
              value="seen"
              className={
                "border-amber-950 data-[state=on]:bg-amber-950/80 data-[state=on]:text-amber-50"
              }>
              Seen
            </ToggleGroupItem>
            <ToggleGroupItem
              value="unseen"
              className={
                "border-amber-950 data-[state=on]:bg-amber-950/80 data-[state=on]:text-amber-50"
              }>
              Not seen
            </ToggleGroupItem>
            <ToggleGroupItem
              value="star"
              className={
                "border-amber-950 data-[state=on]:bg-amber-950/80 data-[state=on]:text-amber-50"
              }>
              Star
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Sort row — stacks label+direction above the radio grid on mobile */}
        <div className="flex flex-row gap-6">
          <div className="flex flex-row items-center gap-3">
            <span className="shrink-0 text-sm">SORT</span>
            <button
              className="rounded border p-1 border-amber-950"
              onClick={() =>
                direction === "asc" ? setDirection("desc") : setDirection("asc")
              }>
              {direction === "desc" ? <ArrowDown10 /> : <ArrowDown01 />}
            </button>
          </div>

          <RadioGroup
            className="grid grid-cols-2 gap-x-4 gap-y-2 sm:flex sm:flex-row sm:flex-wrap"
            value={sort}
            onValueChange={(val) => setSort(val as SortBy)}>
            {(
              [
                ["order", "Order"],
                ["seen", "Seen"],
                ["foil", "Foil"],
                ["reversed", "Reversed"],
                ["deprived", "Deprived"],
              ] as const
            ).map(([value, label]) => (
              <div
                key={value}
                className="flex items-center gap-2">
                <RadioGroupItem
                  className="border-amber-950"
                  value={value}
                />
                <Label>{label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <PaperTexture
          opacity={80}
          zLevel="z-0"
        />
      </div>

      <div className="flex flex-col gap-6">
        {filteredCards.map((card) => (
          <div
            key={card.name}
            className={cn(isSeen(card) ? "" : "hidden")}>
            <CardCounter
              card={card}
              isStar={starSet.some((s) => s.name === card.name)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
