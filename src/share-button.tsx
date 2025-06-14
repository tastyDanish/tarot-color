import { Sparkles } from "lucide-react";

const ShareButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-orange-200 to-indigo-200 text-slate-900 rounded-full shadow-md transition hover:scale-105 w-fit h-fit
        text-sm sm:text-md sm:gap-2 sm:px-3 sm:py-2">
      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
      <span className="font-semibold tracking-wide">Share</span>
    </button>
  );
};

export default ShareButton;
