// import { CollectionStatus } from "@/collection/collection-status";
import { CollectionStatus } from "@/collection/collection-status";
import StarSpinner from "@/collection/constellation-stars/star-spinner";
import GetReadings from "@/collection/get-readings";
import { useUserStore } from "@/stores/user-user-store";
import { useNavigate } from "react-router-dom";

const Collection = () => {
  const { signOut, email } = useUserStore();
  const navigate = useNavigate();

  GetReadings();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="flex flex-col px-4 pt-2 pb-12 w-80 md:w-120 items-center text-slate-300">
      {/* <Aura /> */}
      {/* Header */}
      <header className="mb-2 mt-4">
        <p className="text-sm text-slate-400 text-center">
          Your unique set of divinations cast upon the stars.
        </p>
      </header>

      <StarSpinner />
      <CollectionStatus />

      {/* Sign Out Button */}
      <footer className="mt-10 text-center">
        <h1 className="text-2xl font-bold text-center">Your Account</h1>
        <div className="w-full flex md:justify-center pt-4 md:gap-4 md:flex-row flex-col">
          <div className="flex flex-col items-center">
            <div className="mb-4 w-75 flex flex-col items-start">
              <div className="p-2 border rounded bg-gray-900 w-75">{email}</div>
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
