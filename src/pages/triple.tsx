import CardBorder from "@/cards/card-border";

const FakeCard = () => {
  return (
    <CardBorder size="large">
      <img
        src="goblin/the-hanged-man.png"
        draggable={false}
        className="z-20"
        alt="card"
      />
    </CardBorder>
  );
};

const Triple = () => {
  return (
    <div className="relative w-full overflow-hidden pt-8">
      <div className="max-w-screen flex justify-center gap-10">
        <div className="h-70 shrink-0 flex flex-col items-center translate-y-6">
          <span className="opacity-0 text-2xl font-medium">PRESENT</span>
          <span className="opacity-0 font-bold">The Fool</span>
          <div className="w-52 h-fit flex justify-center z-10 items-center mt-6 mb-8">
            <div className="absolute bg-red-500 h-94 w-40 -my-4" />
            <FakeCard />
          </div>
          <div className="flex flex-row gap-2 items-center opacity-0">
            <span>Adventure</span>
            <div>•</div>
            <span>Adventure</span>
          </div>
        </div>
        <div className="shrink-0 flex flex-col z-10 items-center">
          <span className="text-2xl font-medium">PRESENT</span>
          <span className="font-bold">The Hanged Man</span>
          <div className="w-52 h-fit flex justify-center z-10 items-center mt-6 mb-8">
            <div className="absolute bg-red-500 h-94 w-40 -my-4" />
            <FakeCard />
          </div>
          <div className="flex flex-row gap-2 items-center">
            <span>Adventure</span>
            <div>•</div>
            <span>Momentum</span>
          </div>
        </div>
        <div className="shrink-0 flex flex-col items-center translate-y-6">
          <span className="opacity-0 text-2xl font-medium">Future</span>
          <span className="opacity-0 font-bold">The Fool</span>
          <div className="w-52 h-fit flex justify-center z-10 items-center mt-6 mb-8">
            <div className="absolute bg-red-500 h-94 w-40 -my-4" />
            <FakeCard />
          </div>
          <div className="flex flex-row gap-2 items-center opacity-0">
            <span>Adventure</span>
            <div>•</div>
            <span>Adventure</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Triple;
