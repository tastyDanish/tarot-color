import { domToPng } from "modern-screenshot";

export const downloadImage = async (element: HTMLElement) => {
  try {
    const dataUrl = await domToPng(element, {
      backgroundColor: "#1f2937",
      style: {
        opacity: "100%",
        padding: "10px",
        transform: "scale(1)",
      },
    });

    const today = new Date();
    const filename = `reading-${today.toISOString().slice(0, 10)}.png`;

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return "download";
  } catch (err) {
    console.error("Failed to download image:", err);
    alert("Failed to save image.");
    return "error";
  }
};
