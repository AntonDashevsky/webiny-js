import * as React from "react";
import * as SliderPrimitives from "@radix-ui/react-slider";
import { cn } from "~/utils";

const SliderRoot = ({ className, ...props }: SliderPrimitives.SliderProps) => (
    <SliderPrimitives.Root
        className={cn(
            [
                "wby-relative wby-flex wby-w-full wby-touch-none wby-select-none wby-items-center wby-cursor-pointer",
                "data-[disabled]:wby-cursor-not-allowed"
            ],
            className
        )}
        {...props}
    />
);

export { SliderRoot };
