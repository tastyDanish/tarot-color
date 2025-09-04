import CardBorder from "@/cards/card-border";
import { cn } from "@/lib/utils";

const FakeCard = () => {
  return (
    <CardBorder
      isFoil={false}
      size="large">
      <img
        src="cards/the-hanged-man.jpg"
        draggable={false}
        className={cn("[clip-path:inset(2px)] z-10 w-50 shrink-0")}
        alt="card"
      />
    </CardBorder>
  );
};

const Triple = () => {
  return (
    <div className="w-full overflow-hidden">
      <div className="max-w-screen flex justify-center">
        <div className=" -translate-x-10 shrink-0 flex flex-col">
          <span className="opacity-0">Past</span>
          <span className="opacity-0">The Fool</span>
          <FakeCard />
        </div>
        <div className="shrink-0 flex flex-col z-10 items-center">
          <span>Present</span>
          <span>The Fool</span>
          <FakeCard />
          <div className="flex flex-row gap-1 items-center">
            <div className="h-4 w-4 rounded-full bg-red-500" /> Adventure
          </div>
        </div>
        <div className="translate-x-10 shrink-0 flex flex-col">
          <span className="opacity-0">Future</span>
          <span className="opacity-0">The Fool</span>
          <FakeCard />
        </div>
      </div>
    </div>
  );
};

export default Triple;
