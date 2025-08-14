import SignButton from "./sign-button";
import FortunesPaletteGraphic from "./fortunes-palette-graphic";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/stores/user-user-store";
import { useEffect } from "react";
import PaperTexture from "@/components/paper-texture";

const TellerSign = () => {
  const { id, loading, loadUser } = useUserStore();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const navigate = useNavigate();

  return (
    <div className="flex items-center flex-col relative">
      <div className="bg-gray-800 w-full h-4 z-20" />
      <div className="relative w-[300px] h-[180px] md:w-[480px] md:h-[240px] bg-orange-100 text-amber-950 p-3 md:p-4 rounded-xl md:rounded-2xl overflow-hidden z-20 shadow-md">
        <div className="relative h-full overflow-hidden">
          {[
            "-top-5 -left-5",
            "-top-5 -right-5",
            "-bottom-5 -left-5",
            "-bottom-5 -right-5",
          ].map((pos, i) => (
            <div
              key={i}
              className={`absolute h-10 w-10 md:h-12 md:w-12 bg-orange-100 rounded-full ${pos} border-amber-950 border-4`}
            />
          ))}

          <div className="h-full w-full border-amber-950 border-4 flex flex-col justify-center z-20">
            <FortunesPaletteGraphic />
            <div className="h-1 w-full bg-amber-950 mt-1" />
            <div className="flex justify-around md:justify-center md:gap-4 font-bold md:text-xl w-full items-center h-20">
              {loading ? (
                <div />
              ) : (
                <>
                  <div className="flex md:hidden justify-around w-full items-center px-2">
                    <div className="text-xl -mt-2 rotate-45 opacity-70">★</div>
                    <SignButton onClick={() => navigate("/")}>HOME</SignButton>
                    {id == null ? (
                      <SignButton onClick={() => navigate("/sign-in")}>
                        SIGN IN
                      </SignButton>
                    ) : (
                      <SignButton onClick={() => navigate("/collection")}>
                        COLLECTION
                      </SignButton>
                    )}

                    <div className="text-xl -mt-2 -rotate-45 opacity-70">★</div>
                  </div>

                  <div className="hidden md:flex px-2 gap-2 w-full justify-center">
                    <div className="rotate-90 opacity-70">★</div>
                    <div className="text-3xl rotate-45 -mt-2 opacity-70">★</div>
                    <SignButton onClick={() => navigate("/")}>HOME</SignButton>
                    {id == null ? (
                      <>
                        <SignButton onClick={() => navigate("/sign-in")}>
                          SIGN IN
                        </SignButton>
                      </>
                    ) : (
                      <>
                        <SignButton onClick={() => navigate("/collection")}>
                          COLLECTION
                        </SignButton>
                      </>
                    )}
                    <div className="text-3xl -rotate-45 -mt-2 opacity-70">
                      ★
                    </div>
                    <div className="-rotate-90 opacity-70">★</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <PaperTexture opacity={80} />
      </div>
    </div>
  );
};

export default TellerSign;
