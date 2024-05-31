import { cn } from "@/lib/utils";

const ErrorMsg = ({
  //   style,
  message,
  className,
}: {
  //   style?: CSSProperties;
  message?: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "w-full h-[100%] items-center justify-center flex font-bold text-lg",
        className
      )}
    >
      <p>{message || "No Data Available"}</p>
    </div>
  );
};

export default ErrorMsg;
