import { useEffect } from "react";
import { useAppDispatch } from "@/hooks";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import { authenticate, revokeAuthentication } from "@/store/slices/authSlice";

const RootLayout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const sellerToken = localStorage.getItem("sellerToken");
    if (sellerToken) dispatch(authenticate());
    else dispatch(revokeAuthentication());
  }, []);

  return (
    <main>
      <ThemeToggle />
      <Outlet />
      <Toaster />
    </main>
  );
};

export default RootLayout;
