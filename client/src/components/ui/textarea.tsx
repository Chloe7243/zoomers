import * as React from "react";

import { cn } from "@/lib/utils";
import { mergeRefs } from "react-merge-refs";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    const texteAreaRef = React.useRef<HTMLTextAreaElement>(null);

    React.useEffect(() => {
      const ref = texteAreaRef?.current;

      const updateTextareaHeight = () => {
        if (ref) {
          ref.style.height = "auto";
          ref.style.height = ref?.scrollHeight + "px";
        }
      };

      updateTextareaHeight();
      ref?.addEventListener("input", updateTextareaHeight);

      return () => ref?.removeEventListener("input", updateTextareaHeight);
    }, []);

    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-2 ",
          className
        )}
        ref={mergeRefs([texteAreaRef, ref])}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
