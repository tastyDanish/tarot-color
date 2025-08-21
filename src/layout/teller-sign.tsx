import FortunesPaletteGraphic from "./fortunes-palette-graphic";
import { useUserStore } from "@/stores/user-user-store";
import { useEffect } from "react";
import PaperTexture from "@/components/paper-texture";
import { Link } from "react-router-dom";

const TellerSign = () => {
  const { loadUser } = useUserStore();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <div className="flex items-center flex-col relative">
      <Link
        to="/"
        aria-label="Go back to homepage"
        className="relative w-[300px] h-[130px] md:w-120 md:h-[200px] bg-orange-100 text-amber-950 px-3 pb-3 md:px-4 md:pb-4 rounded-b-xl md:rounded-b-2xl overflow-hidden z-20 shadow-md -mt-4">
        <div className="relative h-full overflow-hidden">
          {["-bottom-5 -left-5", "-bottom-5 -right-5"].map((pos, i) => (
            <div
              key={i}
              className={`absolute h-10 w-10 md:h-12 md:w-12 bg-orange-100 rounded-full ${pos} border-amber-950 border-4`}
            />
          ))}

          <div className="h-full w-full border-amber-950 border-4 border-t-0 pt-2 flex flex-col justify-center z-20 pb-2">
            <FortunesPaletteGraphic />
          </div>
        </div>

        <PaperTexture opacity={80} />
      </Link>
    </div>
  );
};

export default TellerSign;
