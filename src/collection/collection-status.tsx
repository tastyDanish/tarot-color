import { useCollectionStore, VALID_SUITS } from "@/stores/use-collection-store";
import { CollectionBar } from "./collection-bar";
import { useNavigate } from "react-router-dom";
import GetReadings from "./get-readings";
import PaperTexture from "@/components/paper-texture";

export const CollectionStatus = () => {
  const navigate = useNavigate();
  const id = GetReadings();
  const { cards, allCards } = useCollectionStore();

  if (!id || !allCards) return null;

  const seenCards = allCards.filter((c) => c.seen > 0);

  const clickHandler = (suit: string) => () => {
    navigate(`/collection/${suit.split(" ")[0]}`);
  };
  return (
    <div className="flex flex-col w-80 md:w-100 bg-orange-100 relative text-amber-950 rounded mt-4 overflow-hidden py-4">
      <div className="w-full flex justify-around items-center px-4 pb-2">
        <div className="bg-amber-950/80 h-4 w-10 [clip-path:polygon(80%_20%,0%_50%,80%_80%,100%_50%)]" />
        <span>The records of your Fate</span>
        <div className="bg-amber-950/80 h-4 w-10 rounded-3xl [clip-path:polygon(20%_20%,100%_50%,20%_80%,0%_50%)]" />
      </div>

      <div className="border-b-2 border-amber-950/50 px-3 pb-2 mx-1">
        <CollectionBar
          title={"Total Collection"}
          hideBar
          seen={seenCards.length}
          total={allCards.length}
        />
      </div>
      <span className="text-sm pt-2 flex flex-col items-center">
        Select a suit for details
      </span>
      {VALID_SUITS.map((suit) => {
        const collection = cards?.get(suit);
        return collection ? (
          <CollectionBar
            key={suit}
            onClick={clickHandler(suit)}
            title={suit}
            seen={collection.count}
            total={collection.total}
            classNames="px-6 py-2"
          />
        ) : null;
      })}

      <PaperTexture opacity={80} />
    </div>
  );
};
