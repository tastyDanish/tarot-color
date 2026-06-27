import CardBorder from "@/cards/card-border";
import { generateMulti, type ReadingCard } from "@/cards/readings";
import { ConditionalSwipe } from "@/components/conditional-swipe";
import { capitalize, getArt } from "@/lib/string-utils";
import { cn } from "@/lib/utils";

const Card = ({ card }: { card: ReadingCard }) => {
  return (
    <CardBorder
      size="large"
      isFoil={card.foil}>
      <img
        src={getArt({ card: card.card.image, art: "goblin" })}
        draggable={false}
        className={cn(
          "z-20 h-80 w-45",
          card.reversed ? "rotate-180" : "",
          card.deprived ? "grayscale" : ""
        )}
        alt="card"
      />
    </CardBorder>
  );
};

const Triple = () => {
  const { readingPhases } = generateMulti(3);
  // const middleIndex = Math.floor(readingPhases.length / 2);
  const TASSEL_COUNT = 8;

  return (
    <div className="relative w-full pt-4">
      <div className="max-w-screen pb-10 flex justify-center gap-10">
        <ConditionalSwipe classnames="h-138">
          {readingPhases.map((phase) => {
            return (
              <div
                key={phase.title}
                className={`h-fit shrink-0 flex flex-col items-center`}>
                <span className={`text-2xl font-bold`}>
                  {phase.title.toUpperCase()}
                </span>
                <div className="bg-amber-100/50 w-45 h-0.5 my-2 rounded-md" />
                <div className="flex flex-col">
                  <div className={cn("text-2xl font-thin whitespace-nowrap")}>
                    {phase.card.card.name}
                  </div>
                  <div className={cn("flex gap-2 justify-center h-6")}>
                    {phase.card.foil && (
                      <div className="font-thin text-md">FOIL</div>
                    )}
                    {phase.card.reversed && (
                      <div className="font-thin text-md">REVERSED</div>
                    )}
                    {phase.card.deprived && (
                      <div className="font-thin text-md">DEPRIVED</div>
                    )}
                  </div>
                </div>
                <div className="h-fit flex justify-center z-10 items-center mt-6 mb-10">
                  {/* <div
                  className="absolute h-98 w-40"
                  style={{ backgroundColor: phase.color }}
                /> */}

                  <div
                    className="absolute flex flex-col items-center translate-y-2"
                    style={{ width: "10rem" }}>
                    {/* cloth body */}
                    <div
                      className="h-98 w-40"
                      style={{ backgroundColor: phase.color }}
                    />

                    {/* bottom tassels */}
                    <div className="flex justify-between w-full">
                      {Array.from({ length: TASSEL_COUNT }).map((_, i) => (
                        <div
                          key={`bottom-${i}`}
                          className="w-3 h-2"
                          style={{ backgroundColor: phase.color }}
                        />
                      ))}
                    </div>
                  </div>
                  <Card card={phase.card} />
                </div>
                <div className={`flex flex-row gap-2 items-center`}>
                  {phase.words.map((word, wi) => (
                    <span
                      key={wi}
                      className="contents">
                      {wi > 0 && <div>•</div>}
                      <span>{capitalize(word)}</span>
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </ConditionalSwipe>
      </div>
    </div>
  );
};

export default Triple;
