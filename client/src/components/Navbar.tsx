import { ReactNode } from "react";
// import { useAppDispatch } from "@/hooks";
import { Button } from "./ui/button";
import { FaFire } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { HiUser } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import { BsBellFill } from "react-icons/bs";
import { HiMiniHome } from "react-icons/hi2";
import { cn } from "@/lib/utils";
import { Drawer, DrawerTrigger } from "./ui/drawer";
import PostForm from "./PostForm";

const NavbarLink = ({ to, children }: { to: string; children: ReactNode }) => {
  //   const dispatch = useAppDispatch();
  return (
    <NavLink
      to={to}
      //   onClick={() => dispatch(modalsActions.closeMobileSidebar())}
      className={({ isActive }) => (isActive ? "underline" : "")}
    >
      {children}
    </NavLink>
  );
};


const Navbar = ({ bgColor = "background" }: { bgColor?: string }) => {
  return (
    <div className="flex items-center w-[100dvw] justify-around px-4 py-1 backdrop-blur-[70px] bg-pc2/30">
      <NavbarLink to="/explore">
        {" "}
        <HiMiniHome fontSize={"1.5rem"} />
      </NavbarLink>
      <NavbarLink to="/explore">
        {" "}
        <FaFire fontSize={"1.5rem"} />
      </NavbarLink>

      <Drawer>
        <DrawerTrigger>
          <Button className="border-3 rounded-full w-16 h-16 px-1 relative z-10 top-[-1.5rem]">
            <FaPlus size={"1.5rem"} />
          </Button>
        </DrawerTrigger>
        <PostForm />
      </Drawer>

      <NavbarLink to="/profile">
        {" "}
        <HiUser fontSize={"1.5rem"} />
      </NavbarLink>
      <NavbarLink to="/notifications">
        {" "}
        <BsBellFill fontSize={"1.5rem"} />
      </NavbarLink>

      <span
        className={cn(
          `before:shadow-white/0 w-[5rem] h-3/4 top-0 translate-x-[-50%] left-1/2 rounded-b-[14rem] absolute bg-white/0 after:content-[''] after:bg-pc2/0 after:shadow-[-8px_-8px_0_7px after:shadow-white/0 after:absolute after:p-3 after:right-[-1.45rem] after:rounded-tl-[15rem] before:content-[''] before:bg-pc2/0  before:absolute before:p-3 before:left-[-1.45rem] before:top-[0rem] before:rounded-tr-[4rem] before:shadow-[7px_-8px_0_7px] `
        )}
      ></span>
    </div>
  );
};

export default Navbar;
