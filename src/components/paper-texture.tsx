import { cn } from "@/lib/utils";

type PaperTextureProps = {
  opacity: number;
};
const PaperTexture = ({ opacity }: PaperTextureProps) => {
  if (opacity < 0 || opacity > 100) {
    return <div></div>;
  }
  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none z-50 mix-blend-multiply",
        `opacity-${opacity}`
      )}
      style={{
        backgroundImage: "url('/paper-texture.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "0% 0%",
      }}
    />
  );
};

export default PaperTexture;
