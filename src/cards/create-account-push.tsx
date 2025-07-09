import { toast } from "react-toastify";
import CreateAccountToast from "./create-account-toast";

const LOCAL_STORAGE_KEY = "createAccountToastShown";

export const createAccountPush = (delayMs = 3000) => {
  const wasShown = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (wasShown) return;

  setTimeout(() => {
    toast(<CreateAccountToast />, {
      autoClose: 5000,
      closeButton: true,
      className:
        "bg-orange-300 text-amber-950 rounded-xl shadow-lg relative overflow-hidden p-0",
      progressClassName:
        "bg-gradient-to-r from-amber-400 via-rose-300 to-pink-400 rounded-full shadow-md shadow-amber-500 animate-[shimmer_2s_linear_infinite] bg-[length:200%_100%] bg-[position:200%_0]",
    });

    localStorage.setItem(LOCAL_STORAGE_KEY, "true");
  }, delayMs);
};
