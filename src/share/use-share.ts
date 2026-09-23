import { useState } from "react";
import { toast } from "react-toastify";
import CopyToast from "./copy-toast";
import { downloadImage } from "./download-image";
import { tryCopyToClipboardPlain } from "./copy-to-clipboard";
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
    const element = document.getElementById("instagram-reading");
    if (!element) return;

    const toastId = toast(CopyToast, toastSettings);

    const copied = await tryCopyToClipboardPlain(element);
    if (copied) return;

    const result = await downloadImage(element);
    if (result === "download") {
      toast.update(toastId, { render: SaveToast, ...toastSettings });
    } else {
      toast.dismiss(toastId);
    }
  };

  const handleDownload = async () => {
    setToastOpen(true);
    const element = document.getElementById("instagram-reading");
    if (!element) return;

    const result = await downloadImage(element);
    if (result == "download") {
      toast(SaveToast, toastSettings);
    }
  };

  return {
    toastOpen,
    handleShare,
    handleDownload,
  };
};
