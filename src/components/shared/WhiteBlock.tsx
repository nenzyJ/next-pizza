import { cn } from "@/lib/utils";
import React from "react";
import { Title } from "./Title";

interface Props {
  title?: string;
  className?: string;
  endAdornment?: React.ReactNode;
  contentClassName?: string;
}

export const WhiteBlock: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  title,
  className,
  endAdornment,
  contentClassName,
}) => {
  return (
    <div className={cn("bg-white rounded-3xl", className)}>
      {title && (
        <div className="flex items-center justify-between p-5 px-7 border-b border-gray-100">
          <Title text={title} size="sm" className="font-bold" />
          {endAdornment}
        </div>
      )}

      <div className={cn("px-5 py-4", contentClassName)}>{children}</div>
    </div>
  );
};
