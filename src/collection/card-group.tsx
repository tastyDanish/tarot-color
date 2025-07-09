import CardBorder from "@/cards/card-border";
import { cn } from "@/lib/utils";
import type { TarotSuit } from "@/stores/use-collection-store";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type CardGroupProps = {
  suit: TarotSuit;
};
const CardGroup = ({ suit }: CardGroupProps) => {
  const [expanded, setExpanded] = useState(false);
  const percent = (suit.count / suit.total) * 100;
  return (
    <div
      className="bg-gray-700 px-4 pt-4 rounded-md shadow-md w-full max-w-[600px] cursor-pointer"
      onClick={() => setExpanded(!expanded)}>
      <div className="flex justify-between items-baseline mb-2">
        <h2 className="text-lg font-semibold text-white">{suit.name}</h2>
        <span className="text-sm text-muted-foreground text-gray-300">
          {suit.count} / {suit.total}
        </span>
      </div>
      <div className="w-full bg-gray-600 rounded-full h-3 relative overflow-hidden mb-4">
        <div
          className="h-full rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-amber-600 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex gap-3 overflow-x-auto scrollbar-hide overflow-y-hidden">
            {suit.cards.map((card) => (
              <div
                key={card.name}
                className="min-w-[80px] h-[140px] overflow-hidden flex-shrink-0 relative">
                <CardBorder size="small">
                  <img
                    src={card.image}
                    alt={card.name}
                    draggable={false}
                    height={80}
                    width={120}
                    loading="lazy"
                    className={cn("z-20", card.collected ? "" : "opacity-0")}
                  />
                </CardBorder>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="w-full flex justify-center">
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}>
          <ChevronDown />
        </motion.div>
      </div>
    </div>
  );
};

export default CardGroup;
