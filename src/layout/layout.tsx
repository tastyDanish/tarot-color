import { Outlet } from "react-router-dom";
import TellerSign from "./teller-sign";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useUserStore } from "@/stores/user-user-store";

export default function Layout() {
  const { loadUser } = useUserStore();

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="bg-gray-800 h-dvh overflow-y-scroll flex flex-col">
      <TellerSign />

      <main className="text-amber-100 flex-grow">
        <Outlet />
        <ToastContainer
          limit={1}
          position="top-center"
        />
      </main>
    </div>
  );
}
