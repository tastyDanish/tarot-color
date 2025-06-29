import { useCollectionStore } from "@/stores/use-collection-store";
import CardGroup from "./card-group";
import { useEffect } from "react";
import { useUserStore } from "@/stores/user-user-store";
import CardLoader from "./card-loader";

const CardCollection = () => {
  const { id } = useUserStore();
  const { major, cups, pentacles, swords, wands, loadReadings } =
    useCollectionStore();

  useEffect(() => {
    if (id) loadReadings(id);
  }, [id]);

  return (
    <section className="flex flex-col gap-6 w-full items-center">
      {major ? <CardGroup suit={major} /> : <CardLoader />}
      {cups ? <CardGroup suit={cups} /> : <CardLoader />}
      {pentacles ? <CardGroup suit={pentacles} /> : <CardLoader />}
      {swords ? <CardGroup suit={swords} /> : <CardLoader />}
      {wands ? <CardGroup suit={wands} /> : <CardLoader />}
    </section>
  );
};

export default CardCollection;
