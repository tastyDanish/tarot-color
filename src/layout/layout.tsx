import { Outlet } from "react-router-dom";
import TellerSign from "./teller-sign";
import { ToastContainer } from "react-toastify";
import StarryNight from "@/components/starry-night";
import { useReadingStore } from "@/stores/use-reading-store";
import { useUserStore } from "@/stores/user-user-store";
import { useEffect } from "react";
import { useTripleStore } from "@/stores/use-triple-store";

export default function Layout() {
  const { id: userId, loading: userLoading } = useUserStore();
  const loadReading = useReadingStore((s) => s.loadReading);
  const loadTriple = useTripleStore((s) => s.loadReading);

  useEffect(() => {
    if (!userLoading) {
      loadReading(userId ?? undefined);
      loadTriple(userId ?? undefined);
    }
  }, [userLoading, userId, loadReading, loadTriple]);
  return (
    <div
      className="h-dvh overflow-y-scroll flex flex-col overflow-x-hidden"
      id="scroll-container">
      <StarryNight />
      <TellerSign />

      <main className="text-amber-100 grow flex flex-col items-center w-full">
        <Outlet />
        <ToastContainer
          limit={1}
          position="top-center"
        />
      </main>
    </div>
  );
}
