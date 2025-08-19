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

    // 2. Capture the content element (reading card)
    // Temporarily hide the particles canvas to avoid duplication
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

    // 3. Create final canvas and draw gradient + particles + content
    const finalCanvas = document.createElement("canvas");
    finalCanvas.width = element.offsetWidth;
    finalCanvas.height = element.offsetHeight;
    const ctx = finalCanvas.getContext("2d")!;

    // Draw gradient background
    const grad = ctx.createLinearGradient(0, 0, 0, finalCanvas.height);
    grad.addColorStop(0, "#1f2937");
    grad.addColorStop(1, "#121826");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);

    // Draw particles canvas on top
    if (canvasImage) ctx.drawImage(canvasImage, 0, 0);

    // Draw the reading card/content on top
    ctx.drawImage(domImage, 0, 0);

    // 4. Copy final image to clipboard
    const finalDataUrl = finalCanvas.toDataURL("image/png");
    const blob = await (await fetch(finalDataUrl)).blob();
    const item = new ClipboardItem({ "image/png": blob });
    await navigator.clipboard.write([item]);

    return "clipboard";
  } catch (err) {
    console.error("Clipboard copy failed:", err);
    return "fallback";
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
