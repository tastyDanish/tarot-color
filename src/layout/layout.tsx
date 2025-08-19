import { Outlet } from "react-router-dom";
import TellerSign from "./teller-sign";
import { ToastContainer } from "react-toastify";
import StarryNight from "@/components/starry-night";
import { useReadingStore } from "@/stores/use-reading-store";
import { useUserStore } from "@/stores/user-user-store";
import { useEffect } from "react";

export default function Layout() {
  const { id: userId, loading: userLoading } = useUserStore();
  const { loadReading } = useReadingStore();

  useEffect(() => {
    if (!userLoading) {
      loadReading(userId ?? undefined);
    }
  }, [userLoading, userId, loadReading]);

  return (
    <div className="h-dvh overflow-y-scroll flex flex-col ">
      <StarryNight />
      <TellerSign />

      <main className="text-amber-100 flex-grow flex flex-col items-center w-full">
        <Outlet />
        <ToastContainer
          limit={1}
          position="top-center"
        />
      </main>
    </div>
  );
}
