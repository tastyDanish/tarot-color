import { domToPng } from "modern-screenshot";

export const tryCopyToClipboardWithParticles = async (
  element: HTMLElement,
): Promise<boolean> => {
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

const BG_IMAGE_SRC = "/share-bg.png";

const CROP_WIDTH = 400;
const CROP_HEIGHT = 711;

let bgImageDimensions: { width: number; height: number } | null = null;

export const loadBgImageDimensions = (
  src: string,
): Promise<{ width: number; height: number }> => {
  if (bgImageDimensions) return Promise.resolve(bgImageDimensions);

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      bgImageDimensions = {
        width: img.naturalWidth,
        height: img.naturalHeight,
      };
      resolve(bgImageDimensions);
    };
    img.onerror = reject;
    img.src = src;
  });
};

export const getRandomBackgroundStyle = async (
  elementWidth: number,
): Promise<Partial<CSSStyleDeclaration>> => {
  const { width: naturalWidth, height: naturalHeight } =
    await loadBgImageDimensions(BG_IMAGE_SRC);

  const maxX = Math.max(naturalWidth - CROP_WIDTH, 0);
  const maxY = Math.max(naturalHeight - CROP_HEIGHT, 0);
  const originX = Math.random() * maxX;
  const originY = Math.random() * maxY;

  const scale = elementWidth / CROP_WIDTH;

  return {
    backgroundImage: `url(${BG_IMAGE_SRC})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: `${naturalWidth * scale}px ${naturalHeight * scale}px`,
    backgroundPosition: `${-originX * scale}px ${-originY * scale}px`,
  };
};

export const tryCopyToClipboardPlain = async (
  element: HTMLElement,
): Promise<boolean> => {
  try {
    const elementWidth = element.getBoundingClientRect().width;
    const bgStyle = await getRandomBackgroundStyle(elementWidth);

    const item = new ClipboardItem({
      "image/png": (async () => {
        const dataUrl = await domToPng(element, {
          style: {
            opacity: "100%",
            padding: "10px",
            transform: "scale(1)",
            ...bgStyle,
          },
        });
        const blob = await (await fetch(dataUrl)).blob();
        return blob;
      })(),
    });
    await navigator.clipboard.write([item]);
    return true;
  } catch (err) {
    console.warn("Tier 2 clipboard failed", err);

    return false;
  }
};
