import { useCollectionStore } from "@/stores/use-collection-store";
import CardGroup from "./card-group";
import CardLoader from "./card-loader";

const CardCollection = () => {
  const { major, cups, pentacles, swords, wands } = useCollectionStore();

  return (
    <section className="flex flex-col gap-6 w-full items-center max-w-80 ">
      {major ? <CardGroup suit={major} /> : <CardLoader />}
      {cups ? <CardGroup suit={cups} /> : <CardLoader />}
      {pentacles ? <CardGroup suit={pentacles} /> : <CardLoader />}
      {swords ? <CardGroup suit={swords} /> : <CardLoader />}
      {wands ? <CardGroup suit={wands} /> : <CardLoader />}
    </section>
  );
};

export default CardCollection;
