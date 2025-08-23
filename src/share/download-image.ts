import { domToPng } from "modern-screenshot";

export const downloadImage = async (element: HTMLElement) => {
  try {
    // 1. Grab tsparticles canvas
    const particlesCanvas = document.querySelector(
      "#tsparticles-starry-background canvas",
    ) as HTMLCanvasElement | null;

    let particlesImage: HTMLImageElement | null = null;
    if (particlesCanvas) {
      particlesImage = new Image();
      particlesImage.src = particlesCanvas.toDataURL("image/png");
      await new Promise((res) => (particlesImage!.onload = res));
    }

    // 2. Hide tsparticles before capturing the element to avoid duplication
    if (particlesCanvas) particlesCanvas.style.display = "none";

    const domDataUrl = await domToPng(element, {
      backgroundColor: "transparent",
      style: {
        opacity: "100%",
        padding: "10px",
        transform: "scale(1)",
      },
    });

    if (particlesCanvas) particlesCanvas.style.display = "";

    const domImage = new Image();
    domImage.src = domDataUrl;
    await new Promise((res) => (domImage.onload = res));

    // 3. Composite final image
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

    // Particles background
    if (particlesImage) ctx.drawImage(particlesImage, 0, 0);

    // Reading card on top
    ctx.drawImage(domImage, 0, 0);

    // 4. Download
    const finalDataUrl = finalCanvas.toDataURL("image/png");
    const today = new Date();
    const filename = `reading-${today.toISOString().slice(0, 10)}.png`;

    const link = document.createElement("a");
    link.href = finalDataUrl;
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

export const downloadImageBackup = async (element: HTMLElement) => {
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
