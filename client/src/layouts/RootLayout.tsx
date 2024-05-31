import { useEffect } from "react";
import { useAppSelector } from "@/hooks";
import { Toaster } from "react-hot-toast";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";

const RootLayout = () => {
  const navigate = useNavigate();
  const path = location.pathname.split("/");
  const isAuth = useAppSelector((state) => state.isAuth);

  useEffect(() => {
    if (!isAuth && ["login", "signup"].every((str) => !path.includes(str))) {
      navigate("/login");
    } else {
      if (
        path[path.length - 1] === "" ||
        ["login", "signup"].some((str) => path.includes(str))
      ) {
        navigate("/explore");
      }
    }
  }, [isAuth]);

  return (
    <main className="h-[100dvh] w-[100dvw] overflow-hidden flex flex-col">
      {isAuth && <Header />}
      <div className="flex-1 bg-pc1 overflow-hidden">
        <Outlet />
      </div>
      {isAuth && <Navbar />}
      <Toaster />
    </main>
  );
};

export default RootLayout;
