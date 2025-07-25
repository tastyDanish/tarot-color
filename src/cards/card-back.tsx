import type { ReactNode } from "react";

const textureStyle = {
  backgroundImage: "url('/paper-texture.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "30% 0%",
};

type CardBackProps = {
  children: ReactNode;
};

const CardBack = ({ children }: CardBackProps) => {
  return (
    <div
      className="absolute backface-hidden bg-stone-200 p-4 justify-center items-center rounded-xl overflow-hidden shadow-md"
      style={{
        transform: "rotateY(180deg)",
        WebkitBackfaceVisibility: "hidden",
        WebkitPerspective: 0,
      }}>
      <div className="bg-stone-800 p-1 rounded-xl">
        <div className="relative overflow-hidden  flex justify-center items-center rounded-xl bg-stone-800">
          <div className="absolute bg-amber-400 h-full w-1" />
          <div className="absolute bg-amber-400 h-30 w-30 rounded-full transform-x-30" />
          <div className="absolute border-amber-400 border-4 h-40 w-40 rounded-full" />
          <div className="absolute border-amber-400 border-4 h-50 w-50 rounded-full" />

          {children}
        </div>
      </div>

      <div
        className="absolute inset-0 opacity-80 pointer-events-none mix-blend-multiply"
        style={textureStyle}
      />
    </div>
  );
};

export default CardBack;
