import PaperTexture from "@/components/paper-texture";
import { useNavigate } from "react-router-dom";

const GoToCollection = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/collection")}
      className="relative inline-flex items-center mt-4 gap-2 p-2 pb-0 bg-orange-100 text-slate-900 rounded-t-md shadow-md transition hover:scale-105 text-md w-75 md:w-100 overflow-hidden">
      <div className="relative w-full h-full overflow-hidden">
        {["-top-5 -left-5", "-top-5 -right-5"].map((pos, i) => (
          <div
            key={i}
            className={`absolute z-20 h-10 w-10 bg-orange-100 rounded-full ${pos} border-amber-950 border-4`}
          />
        ))}
        <div className="border-4 border-b-0 border-amber-950/80 w-full h-full py-2">
          <span className="text-lg font-bold">VIEW YOUR COLLECTION</span>
        </div>
      </div>

      <PaperTexture opacity={80} />
    </button>
  );
};
export default GoToCollection;
