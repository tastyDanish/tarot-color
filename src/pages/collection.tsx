import Aura from "@/collection/aura";
import CardCollection from "@/collection/card-collection";
import { useCollectionStore } from "@/stores/use-collection-store";
import { useUserStore } from "@/stores/user-user-store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Collection = () => {
  const { signOut, email } = useUserStore();
  const navigate = useNavigate();

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

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="flex flex-col px-4 pt-6 pb-12 bg-background text-foreground w-120">
      <Aura />
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-center">Your Collection</h1>
        <p className="text-sm text-muted-foreground text-center">
          A glimpse into the arcana you've gathered
        </p>
      </header>

      {/* Collection Grid */}
      <CardCollection />

      {/* Sign Out Button */}
      <footer className="mt-10 text-center">
        <h1 className="text-2xl font-bold text-center">Your Account</h1>
        <div className="w-full flex md:justify-center pt-4 md:gap-4 md:flex-row flex-col">
          <div className="flex flex-col items-center">
            <div className="mb-4 w-[300px] flex flex-col items-start">
              <label className="block text-sm text-amber-100 mb-1">Email</label>
              <div className="p-2 border rounded bg-gray-900 w-[300px]">
                {email}
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="block text-red-600 border-red-600 border-2 px-4 py-1 rounded-md hover:underline text-sm w-fit">
              Sign Out
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Collection;
