import { MoonLoader } from "react-spinners";

const Loader = ({ size }: { size?: number }) => {
  return (
    <div className="w-full h-full items-center justify-center flex flex-1 text-black">
      <MoonLoader size={size || 30} color="i" />
    </div>
  );
};

export default Loader;
