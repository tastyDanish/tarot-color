import { generateMulti } from "@/cards/readings";
import { ConditionalSwipe } from "@/components/conditional-swipe";
import { TripleReading } from "@/triple/triple-reading";
import { useMemo } from "react";

import TripleShare from "@/triple/triple-share";
import ShareButton from "@/share";
import GoToCollection from "@/collection/go-to-collection";

const Triple = () => {
  const tripleReading = useMemo(
    () => generateMulti(["Past", "Present", "Future"]),
    []
  );
  // const middleIndex = Math.floor(readingPhases.length / 2);

  return (
    <div className="relative w-full pt-4 h-fit pb-10 flex flex-col items-center">
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
      <div className="w-100 flex flex-col items-center">
        <ShareButton />
        <GoToCollection />
      </div>
      <TripleShare phases={tripleReading.readingPhases} />
    </div>
  );
};

export default Triple;
