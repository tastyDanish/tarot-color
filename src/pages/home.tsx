import { useNavigate } from "react-router-dom";
import SiteIntrouction from "./site-intro";
import PaperTexture from "@/components/paper-texture";
import LittleCard from "@/components/little-card";
import DailyButton from "@/components/daily-button";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col  h-full items-center pb-10 gap-8">
      <div className="max-w-120 flex flex-col gap-4">
        <SiteIntrouction />
        <div className="flex gap-4 w-full justify-between">
          <DailyButton />

          <div className="flex flex-col items-center">
            <button
              onClick={() => navigate("/daily-triple")}
              disabled={true}
              className="bg-orange-100 py-6 px-4 rounded-xl text-amber-950 flex flex-col h-70 items-center justify-around gap-2 shadow-xl opacity-60 cursor-not-allowed  relative overflow-hidden">
              {/* Three cards */}
              <div className="absolute text-2xl font-bold text-black z-50 mt-40">
                COMING SOON
              </div>
              <div className="flex -mx-4">
                <LittleCard rotation="-rotate-10 translate-x-8 translate-y-1" />
                <LittleCard rotation="z-10" />
                <LittleCard rotation="rotate-10 z-20 -translate-x-8 translate-y-1" />
              </div>
              <div className="h-[3px] w-8/10 rounded-xl bg-amber-950 ml-8 mt-4 opacity-0" />
              <div className="flex flex-col w-full items-start opacity-0">
                <span className="font-semibold text-xl">Triple Reading</span>
                <span className="font-thin text-sm">
                  larger problems require larger divinations
                </span>
              </div>
              <PaperTexture opacity={80} />
            </button>
            {/* Lock / Progress */}
            {/* <div className="w-8/10 bg-amber-200 rounded-full h-2 overflow-hidden mt-1">
            <div
              className="bg-amber-500 h-full"
              style={{ width: "80%" }} // Example: 8/10 progress
            />
          </div>
          <span className="text-xs ">8 / 10 Daily Readings</span> */}
          </div>
        </div>
        <button
          className="bg-orange-100 py-4 rounded-md text-amber-950 flex flex-col items-center gap-2 justify-around shadow-md hover:shadow-lg transition cursor-pointer relative w-full"
          onClick={() => navigate("/collection")}>
          <span className="font-semibold text-3xl">COLLECTION</span>
          <PaperTexture opacity={80} />
        </button>
      </div>
    </div>
  );
};

export default Home;
