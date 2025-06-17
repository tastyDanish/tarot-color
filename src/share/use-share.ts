import { useState } from "react";
import { toast } from "react-toastify";
import CopyToast from "./copy-toast";
import { downloadImage } from "./download-image";
import { tryCopyToClipboard } from "./copy-to-clipboard";
import SaveToast from "./save-toast";

export const UseShare = () => {
  const [toastOpen, setToastOpen] = useState(false);

  const toastSettings = {
    autoClose: 4000,
    closeButton: true,
    onClose: () => setToastOpen(false),
    progressClassName:
      "bg-gradient-to-r from-amber-400 via-rose-300 to-pink-400 rounded-full shadow-md shadow-amber-500 animate-[shimmer_2s_linear_infinite] bg-[length:200%_100%] bg-[position:200%_0]",
    className:
      "bg-orange-300 text-amber-950 rounded-xl shadow-lg relative overflow-hidden p-0",
  };

  const handleShare = async () => {
    const element = document.getElementById("reading");
    if (!element) return;

    const method = await tryCopyToClipboard(element);

    if (method == "clipboard") {
      setToastOpen(true);
      toast(CopyToast, toastSettings);
    } else {
      const result = await downloadImage(element);
      if (result == "download") {
        toast(SaveToast, toastSettings);
      }
    }
  };

  return {
    toastOpen,
    handleShare,
  };
};
