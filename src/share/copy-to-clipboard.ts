import { domToPng } from "modern-screenshot";

export const tryCopyToClipboard = async (element: HTMLElement) => {
  try {
    // 1. Grab the particles canvas directly
    const canvas = document.querySelector(
      "#tsparticles-starry-background canvas",
    ) as HTMLCanvasElement | null;

    let canvasImage: HTMLImageElement | null = null;
    if (canvas) {
      canvasImage = new Image();
      canvasImage.src = canvas.toDataURL("image/png");
      await new Promise((res) => (canvasImage!.onload = res));
    }

    // 2. Capture the content element
    if (canvas) canvas.style.display = "none";

    const domDataUrl = await domToPng(element, {
      backgroundColor: "transparent",
      style: {
        opacity: "100%",
        padding: "10px",
        transform: "scale(1)",
      },
    });

    if (canvas) canvas.style.display = "";

    const domImage = new Image();
    domImage.src = domDataUrl;
    await new Promise((res) => (domImage.onload = res));

    // 3. Create final canvas
    const finalCanvas = document.createElement("canvas");
    finalCanvas.width = element.offsetWidth;
    finalCanvas.height = element.offsetHeight;
    const ctx = finalCanvas.getContext("2d")!;

    // Gradient background
    const grad = ctx.createLinearGradient(0, 0, 0, finalCanvas.height);
    grad.addColorStop(0, "#1f2937");
    grad.addColorStop(1, "#121826");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);

    // Draw layers
    if (canvasImage) ctx.drawImage(canvasImage, 0, 0);
    ctx.drawImage(domImage, 0, 0);

    // 4. Final image data
    const finalDataUrl = finalCanvas.toDataURL("image/png");
    const blob = await (await fetch(finalDataUrl)).blob();

    // ---- Clipboard API (desktop Chrome/Edge) ----
    if ("clipboard" in navigator && "ClipboardItem" in window) {
      try {
        const item = new ClipboardItem({ "image/png": blob });
        await navigator.clipboard.write([item]);
        return "clipboard";
      } catch (err) {
        console.warn("Clipboard image write failed, falling back…", err);
      }
    }

    // ---- Web Share API (iOS Safari, Android Chrome) ----
    if (navigator.canShare && navigator.canShare({ files: [] })) {
      const file = new File([blob], "reading.png", { type: "image/png" });
      try {
        await navigator.share({ files: [file], title: "Reading Card" });
        return "share";
      } catch (err) {
        console.warn("Share failed, falling back…", err);
      }
    }

    // ---- Download fallback ----
    const link = document.createElement("a");
    link.download = "reading.png";
    link.href = finalDataUrl;
    link.click();
    return "download";
  } catch (err) {
    console.error("Export failed:", err);
    return "error";
  }
};

export const tryCopyToClipboardLegacy = async (element: HTMLElement) => {
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
