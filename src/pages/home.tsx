import { useNavigate } from "react-router-dom";
import SiteIntrouction from "./site-intro";
import PaperTexture from "@/components/paper-texture";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col w-full overflow-y-hidden h-full overflow-x-hidden items-center  bg-gray-800 pb-10">
      <SiteIntrouction />
      <div className="flex gap-4">
        <button
          className=" bg-orange-100 p-4 rounded-md text-amber-950 flex flex-col items-center gap-2 justify-around shadow-md hover:shadow-lg transition mb-10 cursor-pointer relative overflow-hidden max-w-48"
          onClick={() => navigate("/daily-single")}>
          {/* single card */}
          <div className="w-16 h-24 border-4 border-orange-300 rounded-sm shadow-2xl bg-amber-950 relative overflow-hidden "></div>
          <div className="flex flex-col w-full items-start">
            <span className="font-semibold">Daily Reading</span>
            <span className="font-thin text-sm">
              See what the fates have in store for you today
            </span>
          </div>

          <PaperTexture opacity={60} />
        </button>

        <div className="flex flex-col items-center">
          <button
            onClick={() => navigate("/daily-triple")}
            disabled={true}
            className="bg-amber-100 p-4 rounded-xl text-amber-950 flex flex-col items-center justify-around gap-2 shadow-md opacity-60 cursor-not-allowed max-w-48">
            {/* Three cards */}
            <div className="flex -mx-4">
              <div className="w-16 h-24 bg-amber-950 border-4 border-orange-300 rounded-sm shadow-2xl -rotate-10 translate-x-8 " />
              <div className="w-16 h-24 bg-amber-950 border-4 border-orange-300 rounded-sm shadow-2xl z-10" />
              <div className="w-16 h-24 bg-amber-950 border-4 border-orange-300 rounded-sm shadow-2xl rotate-10 z-20 -translate-x-8 translate-y-1" />
            </div>
            <div className="flex flex-col w-full items-start">
              <span className="font-semibold">Triple Reading</span>
              <span className="font-thin text-sm">
                larger problems require larger divinations
              </span>
            </div>
          </button>
          {/* Lock / Progress */}
          <div className="w-8/10 bg-amber-200 rounded-full h-2 overflow-hidden mt-1">
            <div
              className="bg-amber-500 h-full"
              style={{ width: "80%" }} // Example: 8/10 progress
            />
          </div>
          <span className="text-xs">8 / 10 Daily Readings</span>
        </div>
      </div>
      <div className="">
        <button
          className="bg-amber-100 py-5 rounded-xl text-amber-950 flex flex-col items-center gap-2 justify-around shadow-md hover:shadow-lg transition cursor-pointer relative w-96"
          onClick={() => navigate("/collection")}>
          <span className="font-semibold text-2xl">COLLECTION</span>
          <PaperTexture opacity={80} />
        </button>
      </div>
    </div>
  );
};

export default Home;
