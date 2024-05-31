import { CSSProperties, useState } from "react";
import { Input, InputProps } from "./input";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { cn } from "@/lib/utils";

interface PInputProps extends InputProps {
  inputClassName?: string;
  toggleVisibility?: boolean;
  inputStyle?: CSSProperties;
  containerClassName?: string;
  containerStyle?: CSSProperties;
}

const PasswordInput = ({
  //   containerClassName,
  toggleVisibility,
  inputClassName,
  //   containerStyle,
  inputStyle,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type,
  ...props
}: PInputProps) => {
  const [passwordIsVisibile, setPasswordIsVisible] = useState(false);
    const togglePasswordVisibility = () => setPasswordIsVisible((prev) => !prev);
  return (
    <div className="relative">
      <Input
        className={cn("pr-12", inputClassName)}
        style={inputStyle}
        type={passwordIsVisibile ? "text" : "password"}
        {...props}
      />
      {toggleVisibility && (
        <span
          onClick={togglePasswordVisibility}
          className="absolute opacity-50 right-4 top-[50%] translate-y-[-50%] cursor-pointer"
        >
          {passwordIsVisibile ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </span>
      )}
    </div>
  );
};

export default PasswordInput;
