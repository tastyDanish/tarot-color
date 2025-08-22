import { Download, Sparkles } from "lucide-react";
import { UseShare } from "./use-share";
import { useReadingStore } from "@/stores/use-reading-store";

const ShareButton = () => {
  const { toastOpen, handleShare, handleDownload } = UseShare();
  const { isLoading } = useReadingStore();

  return (
    <div className="flex gap-4">
      <button
        disabled={toastOpen || isLoading}
        onClick={handleShare}
        className="inline-flex items-center gap-2 px-3 py-2 bg-orange-200 bg-gradient-to-r from-orange-200 to-indigo-200 text-slate-900 rounded-full shadow-md border border-indigo-300 transition hover:scale-105 text-md w-fit">
        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="relative w-[50px] h-[1em] flex items-center justify-center">
          Share
        </span>
      </button>
      <button
        className="inline-flex items-center px-2 bg-orange-200 bg-gradient-to-r from-orange-200 to-indigo-200 text-slate-900 rounded-full shadow-md border border-indigo-300 transition hover:scale-105 text-md w-fit"
        disabled={toastOpen || isLoading}
        onClick={handleDownload}>
        <Download />
      </button>
    </div>
  );
};

export default ShareButton;
