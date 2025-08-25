import { useNavigate } from "react-router-dom";
import SiteIntrouction from "./site-intro";
import PaperTexture from "@/components/paper-texture";
import DailyButton from "@/components/daily-button";
import { useUserStore } from "@/stores/user-user-store";
import TripleButton from "@/components/triple-button";
import { ConditionalSwipe } from "@/components/conditional-swipe";

const Home = () => {
  const { id, loading } = useUserStore();
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col  h-full items-center pb-10 gap-8">
      <div className="max-w-120 flex flex-col gap-4 pt-0 md:pt-2">
        <SiteIntrouction />
        <div className="flex w-full justify-between md:flex-row flex-col gap-4 items-center">
          <ConditionalSwipe>
            <DailyButton />
            <TripleButton />
          </ConditionalSwipe>
        </div>
        <div className="w-full px-4 md:px-0">
          {loading ? (
            <div></div>
          ) : id === null ? (
            <button
              className="bg-orange-100 py-4 rounded-md text-amber-950 flex flex-col items-center gap-2 justify-around shadow-md hover:shadow-lg transition cursor-pointer relative w-full overflow-hidden"
              onClick={() => navigate("/sign-in")}>
              <span className="font-semibold text-2xl">
                SIGN IN / CREATE ACCOUNT
              </span>
              <PaperTexture opacity={80} />
            </button>
          ) : (
            <button
              className="bg-orange-100 py-4 rounded-md text-amber-950 flex flex-col items-center gap-2 justify-around shadow-md hover:shadow-lg transition cursor-pointer relative w-full overflow-hidden"
              onClick={() => navigate("/collection")}>
              <span className="font-semibold text-2xl">COLLECTION</span>
              <PaperTexture opacity={80} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
