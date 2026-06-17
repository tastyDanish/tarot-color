import { CollectionList } from "@/collection/list/collection-list";
import TheFatesView from "@/collection/constellation-stars/the-fates-view";
import { getStarSet } from "@/collection/constellation-stars/utils";
import { hashStr } from "@/collection/constellation-stars/strategies";
import GetReadings from "@/collection/get-readings";
import { useCollectionStore, VALID_SUITS } from "@/stores/use-collection-store";
import { LucideArrowBigLeftDash } from "lucide-react";
import { useParams, Navigate, useNavigate } from "react-router-dom";

const Suit = () => {
  const { suit } = useParams<{ suit: string }>();
  const id = GetReadings();
  const { cards, allCards } = useCollectionStore();
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/collection");
  };

  if (!suit || !VALID_SUITS.includes(suit)) {
    return (
      <Navigate
        to="/collection"
        replace
      />
    );
  }

  if (!id || !allCards) return <div>loading...</div>;

  const collection = cards?.get(suit);

  if (!collection) return <div>No collection found for {suit}.</div>;

  const starSet = getStarSet(
    collection.cards.filter((c) => c.seen > 0),
    hashStr(id + suit)
  );

  return (
    <div className="flex flex-col items-center relative pb-10">
      <div className="flex flex-row w-full p-2 pt-4 text-slate-300">
        <button
          onClick={clickHandler}
          className="cursor-pointer absolute left-0">
          <LucideArrowBigLeftDash
            size={48}
            opacity={0.8}
          />
        </button>
        <h1 className="grow">{collection.name}</h1>
      </div>

      {id && starSet.length ? (
        <TheFatesView
          key={suit}
          cards={starSet}
          id={id}
        />
      ) : (
        <div className="h-8" />
      )}
      <CollectionList
        cards={collection.cards}
        starSet={starSet}
      />
    </div>
  );
};

export default Suit;
