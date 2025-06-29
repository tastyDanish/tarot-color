import type { ReactNode } from "react";

type SignButtonProps = {
  onClick?: () => void;
  children: ReactNode;
};

const SignButton = ({ onClick, children }: SignButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="text-orange-100 bg-amber-950 font-bold py-1 px-2 rounded shadow hover:bg-amber-900 active:scale-95 transition">
      {children}
    </button>
  );
};
export default SignButton;
