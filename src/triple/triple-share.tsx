import CardBorder from "@/cards/card-border";
import type { ReadingPhase } from "@/cards/readings";
import { type CardSize, SIZE_CLASSES } from "@/cards/types";
import PaperTexture from "@/components/paper-texture";
import { capitalize, getArt } from "@/lib/string-utils";
import { cn } from "@/lib/utils";

type TripleShareProps = {
  phases: ReadingPhase[];
};

const SPLAY = [{ top: "2%" }, { top: "34%" }, { top: "66%" }];

// opacity-0 fixed top-0 left-0 pointer-events-none
const TripleShare = ({ phases }: TripleShareProps) => {
  const size: CardSize = "small";

  return (
    <div
      id="instagram-reading"
      className="overflow-hidden px-4 py-4 flex flex-col justify-between opacity-0 fixed top-0 left-0 pointer-events-none"
      style={{
        aspectRatio: "9 / 16",
        width: "400px",
        minWidth: "400px",
      }}>
      <div className="w-full flex flex-col gap-4 flex-1 justify-around">
        <div className="w-full flex justify-around items-center">
          <div className="h-1 w-12 bg-amber-100/80" />
          <span className="text-lg font-medium">A GLIMPSE OF YOUR FATE</span>
          <div className="h-1 w-12 bg-amber-100/80" />
        </div>
        {phases.map((phase, i) => {
          const art = getArt({ card: phase.drawn.card.image, art: "goblin" });
          const { top } = SPLAY[i] ?? SPLAY[SPLAY.length - 1];
          const hasModifier =
            phase.drawn.foil || phase.drawn.reversed || phase.drawn.deprived;

          return (
            <div
              key={phase.drawn.card.name}
              className="flex w-88 pl-10 items-center"
              style={{
                top,
                zIndex: i + 1,
                transformOrigin: "center center",
              }}>
              <div className="relative h-fit w-fit">
                <div
                  className="absolute h-44 inset-y-2 -left-6 right-3 -z-10 ring-1 ring-inset ring-white/25 rounded-sm"
                  style={{ backgroundColor: phase.color }}
                />
                <CardBorder
                  isReversed={phase.drawn.reversed}
                  isFoil={phase.drawn.foil}
                  staticGradient
                  size={size}>
                  <img
                    src={art}
                    style={{
                      transform: "translateZ(0)",
                      WebkitTransform: "translateZ(0)",
                    }}
                    draggable={false}
                    className={cn(
                      SIZE_CLASSES[size],
                      "z-50",
                      phase.drawn.reversed ? "rotate-180" : "",
                      phase.drawn.deprived ? "grayscale" : ""
                    )}
                    alt={phase.drawn.card.name}
                  />
                </CardBorder>
              </div>
              <div className="relative flex flex-col flex-1 items-center pb-2 bg-orange-100 text-amber-950 rounded-r-sm overflow-hidden h-44">
                <div className="flex justify-between w-9/10 gap-4">
                  <div className="bg-amber-950/50 w-12 h-0.5 mt-2 rounded-md self-center" />
                  <span className="text-lg">{phase.title.toUpperCase()}</span>
                  <div className="bg-amber-950/50 w-12 h-0.5 mt-2 rounded-md self-center" />
                </div>
                <div className="flex flex-col w-full">
                  <span className="text-xl font-bold">
                    {phase.drawn.card.name}
                  </span>
                  <div
                    className={cn(
                      "flex gap-x-2 gap-y-0 justify-center flex-wrap items-center w-full"
                    )}>
                    {!hasModifier && <div className="w-2 h-2" />}
                    {phase.drawn.foil && <div className="">FOIL</div>}
                    {phase.drawn.reversed && <div className="">REVERSED</div>}
                    {phase.drawn.deprived && <div className="">DEPRIVED</div>}
                  </div>
                  <div className="bg-amber-950/50 w-45 h-0.5 my-1 rounded-md self-center" />
                </div>

                <div className="flex flex-1 justify-center items-center flex-row flex-wrap gap-y-0 gap-x-3 w-full px-2 text-md leading-tight text-center">
                  {phase.words.map((word, wi) => (
                    <span
                      key={wi}
                      className="whitespace-nowrap h-6">
                      {capitalize(word)}
                    </span>
                  ))}
                </div>
                <PaperTexture opacity={60} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-sm text-white opacity-70 text-center pt-2 whitespace-nowrap pb-1">
        Divined at fortunespalette.com
      </div>
      <div className="w-full flex justify-center"></div>
    </div>
  );
};

export default TripleShare;
