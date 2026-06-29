import { generateMulti } from "@/cards/readings";
import { ConditionalSwipe } from "@/components/conditional-swipe";
import { DivinationReport } from "@/triple/divination-report";
import { TripleReading } from "@/triple/triple-reading";
import { useMemo } from "react";

import PaperTexture from "@/components/paper-texture";

const Triple = () => {
  const tripleReading = useMemo(
    () => generateMulti(["Past", "Present", "Future"]),
    []
  );
  // const middleIndex = Math.floor(readingPhases.length / 2);

  return (
    <div className="relative w-full pt-4 h-fit pb-10">
      <div
        id="triple-reading"
        className="max-w-screen pb-6 flex justify-center gap-10">
        <ConditionalSwipe classnames="h-138">
          {tripleReading.readingPhases.map((phase) => (
            <TripleReading
              key={phase.title}
              phase={phase}
            />
          ))}
        </ConditionalSwipe>
      </div>
      <div className="w-full flex justify-center">
        <DivinationReport phases={tripleReading.readingPhases} />
      </div>

      <div className="w-full flex justify-center pt-4">
        <div className="flex flex-col items-center w-100 gap-4 bg-amber-100 text-amber-950/80 relative">
          <PaperTexture
            opacity={80}
            zLevel="z-10"
          />
        </div>
      </div>
    </div>
  );
};

export default Triple;
