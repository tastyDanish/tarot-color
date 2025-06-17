import { domToPng } from "modern-screenshot";

export const tryCopyToClipboard = async (element: HTMLElement) => {
  try {
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
    await navigator.clipboard.write([item]);
    return "clipboard";
  } catch {
    return "fallback";
  }
};
