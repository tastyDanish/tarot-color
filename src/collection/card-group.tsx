import type { TarotSuit } from "@/stores/use-collection-store";

type CardGroupProps = {
  suit: TarotSuit;
};
const CardGroup = ({ suit }: CardGroupProps) => {
  const percent = (suit.count / suit.total) * 100;

  return (
    <div className="bg-gray-700 px-4 pt-4 rounded-md shadow-md w-full max-w-[600px] flex-shrink-0">
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
    </div>
  );
};

export default CardGroup;
