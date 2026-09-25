import { type Spread, SPREADS } from "./types";
import { useState } from "react";

type SpreadPickerProps = {
  onPick: (spread: Spread) => void;
};

export const SpreadPicker = ({ onPick }: SpreadPickerProps) => {
  const [picking, setPicking] = useState(false);

  return (
    <div className="w-full pt-8 flex flex-col items-center gap-6">
      <span className="text-2xl font-bold">CHOOSE YOUR SPREAD</span>
      <div className="bg-amber-100/50 w-45 h-0.5 rounded-md" />
      <div className="text-center px-4 flex flex-col gap-2 w-60 md:w-100">
        <p className="text-lg">
          This is your spread for the week. Choose carefully, because it will
          take a week to gather the energy for another one.
        </p>
      </div>
      <div className="flex flex-col gap-3 w-full max-w-xs px-4">
        {SPREADS.map((spread) => (
          <button
            key={spread.name}
            disabled={picking}
            onClick={() => {
              setPicking(true);
              onPick(spread);
            }}
            className="border flex justify-center border-amber-200/40 rounded-md px-4 py-3 text-lg active:scale-95 transition-transform disabled:opacity-50">
            <span className="pb-1">{spread.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
