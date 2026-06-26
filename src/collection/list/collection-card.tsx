import CardBorder from "@/cards/card-border";
import { getArt } from "@/lib/string-utils";
import { cn } from "@/lib/utils";

type CollectionCardProps = {
  image: string | undefined;
  name: string | undefined;
  seen: boolean;
};
const CollectionCard = ({ image, name, seen }: CollectionCardProps) => {
  return (
    <CardBorder size="medium">
      <img
        src={getArt({ card: image ?? null, art: "goblin" })}
        draggable={false}
        className={cn("z-20", !seen ? "grayscale" : "")}
        alt={name}
      />
    </CardBorder>
  );
};
export default CollectionCard;
