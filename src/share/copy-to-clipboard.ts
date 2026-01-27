import { domToPng } from "modern-screenshot";

const canWriteImagesToClipboard = () => {
  return (
    typeof ClipboardItem !== "undefined" &&
    !!navigator.clipboard?.write
  );
};

export const tryCopyToClipboardWithParticles = async (
  element: HTMLElement,
): Promise<boolean> => {
  if (!canWriteImagesToClipboard()) return false;

  let canvas: HTMLCanvasElement | null = null;

  try {
    canvas = document.querySelector(
      "#tsparticles-starry-background canvas",
    );

    let canvasImage: HTMLImageElement | null = null;

    if (canvas) {
      canvasImage = new Image();
      canvasImage.src = canvas.toDataURL("image/png");
      await new Promise((res) => (canvasImage!.onload = res));
    }

    const domDataUrl = await domToPng(element, {
      backgroundColor: "transparent",
      style: {
        opacity: "100%",
        padding: "10px",
        transform: "scale(1)",
      },
    });

    const domImage = new Image();
    domImage.src = domDataUrl;
    await new Promise((res) => (domImage.onload = res));

    const finalCanvas = document.createElement("canvas");
    finalCanvas.width = element.offsetWidth;
    finalCanvas.height = element.offsetHeight;

    const ctx = finalCanvas.getContext("2d")!;

    const grad = ctx.createLinearGradient(0, 0, 0, finalCanvas.height);
    grad.addColorStop(0, "#1f2937");
    grad.addColorStop(1, "#121826");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);

    if (canvasImage) ctx.drawImage(canvasImage, 0, 0);
    ctx.drawImage(domImage, 0, 0);

    const blob = await new Promise<Blob>((res) =>
      finalCanvas.toBlob((b) => res(b!), "image/png")
    );

    await navigator.clipboard.write([
      new ClipboardItem({ "image/png": blob }),
    ]);

    return true;
  } catch (err) {
    console.warn("Tier 1 clipboard failed", err);
    return false;
  }
};

export const tryCopyToClipboardPlain = async (
  element: HTMLElement,
): Promise<boolean> => {
  if (!canWriteImagesToClipboard()) return false;

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
    return true;
  } catch {
    return false;
  }
};
