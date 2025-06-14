import { useState } from "react";
import { Sparkles } from "lucide-react";
import { domToPng } from "modern-screenshot";

const ShareButton = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const element = document.getElementById("reading");
    if (!element) return;

    const item = new ClipboardItem({
      "image/png": (async () => {
        const dataUrl = await domToPng(element, {
          backgroundColor: "#1f2937",
          style: {
            opacity: "100%",
            padding: "10px",
            transform: "scale(1)",
          },
        });
        const blob = await (await fetch(dataUrl)).blob();
        return blob;
      })(),
    });

    try {
      await navigator.clipboard.write([item]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
      alert("Clipboard failed. Try saving the image instead.");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-200 to-indigo-200 text-slate-900 rounded-full shadow-md transition hover:scale-105 w-fit h-fit text-md">
      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
      <span className="relative w-[50px] h-[1em] flex items-center justify-center">
        <span
          className={`absolute transition-opacity duration-300 ${
            copied ? "opacity-0" : "opacity-100"
          }`}>
          Copy
        </span>
        <span
          className={`absolute transition-opacity duration-300 ${
            copied ? "opacity-100" : "opacity-0"
          }`}>
          Copied!
        </span>
      </span>
    </button>
  );
};

export default ShareButton;
