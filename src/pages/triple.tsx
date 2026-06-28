import { generateMulti } from "@/cards/readings";
import { ConditionalSwipe } from "@/components/conditional-swipe";
import { TripleReading } from "@/triple/triple-reading";
import { useMemo } from "react";

const Triple = () => {
  const tripleReading = useMemo(
    () => generateMulti(["Past", "Present", "Future"]),
    []
  );
  // const middleIndex = Math.floor(readingPhases.length / 2);

  return (
    <div className="relative w-full pt-4">
      <div
        id="triple-reading"
        className="max-w-screen pb-10 flex justify-center gap-10">
        <ConditionalSwipe classnames="h-138">
          {tripleReading.readingPhases.map((phase) => (
            <TripleReading
              key={phase.title}
              phase={phase}
            />
          ))}
        </ConditionalSwipe>
      </div>
    </div>
  );
};

export default Triple;
