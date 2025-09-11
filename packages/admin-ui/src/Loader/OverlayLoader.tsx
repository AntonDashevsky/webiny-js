import React from "react";
import type { LoaderProps } from "./Loader.js";
import { Loader } from "./Loader.js";
import { cn, makeDecoratable } from "~/utils.js";

type OverlayLoaderProps = LoaderProps;

const DecoratableOverlayLoader = ({ className, size = "lg", ...props }: OverlayLoaderProps) => {
    return (
        <div
            className={cn(
                "wby-w-full wby-h-full wby-absolute wby-inset-0 wby-bg-neutral-base/80 wby-flex wby-items-center wby-justify-center wby-z-30",
                className
            )}
        >
            <Loader {...props} size={size} />
        </div>
    );
};

const OverlayLoader = makeDecoratable("OverlayLoader", DecoratableOverlayLoader);

export { OverlayLoader, type OverlayLoaderProps };
