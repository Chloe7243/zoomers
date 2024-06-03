import { IoMdSettings } from "react-icons/io";
import ThemeToggle from "@/components/ui/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { logoutUser } from "@/store/slices/authSlice";
import { Button } from "./ui/button";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "@/hooks";

const Header = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const currentLocation = location.pathname.split("/")[1];

  return (
    <header className="flex justify-between items-center p-3 py-4">
      <h2 className="text-lg font-semibold capitalize">{currentLocation}</h2>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full bg-pc2">
              <IoMdSettings />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                dispatch(logoutUser());
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
