import { Copy, Download } from "lucide-react";
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
        className="inline-flex items-center gap-2 px-3 py-2 bg-orange-100 text-slate-900 rounded-sm shadow-md border border-slate-800 transition hover:scale-105 text-md w-fit">
        <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="pb-1 relative w-12.5 h-[1em] font-medium flex items-center justify-center">
          COPY
        </span>
      </button>
      <button
        className="inline-flex items-center px-2 bg-orange-100 text-slate-900 rounded-sm shadow-md border border-slate-800 transition hover:scale-105 text-md w-fit"
        disabled={toastOpen || isLoading}
        onClick={handleDownload}>
        <Download />
      </button>
    </div>
  );
};

export default ShareButton;
