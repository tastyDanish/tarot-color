import type { ReadingPhase } from "@/cards/readings";
import PaperTexture from "@/components/paper-texture";
import { getRandomItem } from "@/lib/random-utils";
import { generateFacts } from "./facts-generator";
import { cn } from "@/lib/utils";

type DivinationReportProps = {
  phases: ReadingPhase[];
};

export const DivinationReport = ({ phases }: DivinationReportProps) => {
  const facts = generateFacts(new Date());
  const fact = getRandomItem(facts);

  return (
    <div className="relative bg-amber-100 w-80 p-2 shadow-2xl rounded flex items-center flex-col  text-amber-950/80">
      <div className="flex flex-col items-center bg-amber-950/80 w-full h-full rounded-sm p-1">
        <div className="w-full h-full rounded-2xl flex flex-col items-center bg-amber-100">
          <span className="text-xl font-medium">DIVINATION REPORT</span>
          <div className="flex gap-4 items-center">
            <div className="h-0.5 w-8 bg-amber-950/40" />
            <span className="">6 / 28 / 2026</span>
            <div className="h-0.5 w-8 bg-amber-950/40" />
          </div>

          <div className="h-0.5 w-full bg-amber-950/80" />

          {phases.map((phase) => (
            <div
              key={phase.title}
              className="flex flex-col w-full pt-2 relative">
              {/* <div
                className="absolute h-8 w-12 ml-4 mt-8"
                style={{
                  backgroundColor: phase.color,
                  maskImage: "url(/stamp.jpg)",
                  WebkitMaskImage: "url(/stamp.jpg)",
                  maskMode: "luminance",
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                }}
              /> */}
              <div className="flex w-full justify-center">
                <span className="self-start font-medium text-xl">
                  {phase.title.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between pl-4">
                <span>{phase.drawn.card.name}</span>
                <div
                  className={cn("flex gap-2 justify-end h-6 opacity-60 pr-4")}>
                  {phase.drawn.foil && (
                    <div className="font-thin text-md">FOIL</div>
                  )}
                  {phase.drawn.reversed && (
                    <div className="font-thin text-md">REVERSED</div>
                  )}
                  {phase.drawn.deprived && (
                    <div className="font-thin text-md">DEPRIVED</div>
                  )}
                </div>
              </div>

              <div className="flex gap-4 self-center pr-2">
                {phase.words.map((word) => (
                  <span key={word}>{word}</span>
                ))}
              </div>

              <div className="w-full h-0.5 bg-amber-950/80 mt-1" />
            </div>
          ))}
          <div className="flex justify-around items-center w-full pt-3">
            <div className="h-10 w-10 rounded-full bg-amber-950/80" />
            <span>FULL MOON</span>
          </div>
          <div className="flex flex-col justify-center w-full pt-3 px-2 gap-2 pb-4">
            <span>{fact.headline}</span>
          </div>
        </div>
      </div>

      <PaperTexture
        opacity={80}
        zLevel="z-10"
      />
    </div>
  );
};
