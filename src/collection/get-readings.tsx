import { useCollectionStore } from "@/stores/use-collection-store";
import { useUserStore } from "@/stores/user-user-store";
import { useEffect } from "react";

const GetReadings = () => {
  const { id } = useUserStore();
  const { loadReadings } = useCollectionStore();

  useEffect(() => {
    if (!id) return;

    const fetchReadings = async () => {
      try {
        await loadReadings(id);
      } catch (err) {
        console.error("Failed to load readings:", err);
      }
    };

    fetchReadings();
  }, [id, loadReadings]);

  return id;
};

export default GetReadings;
