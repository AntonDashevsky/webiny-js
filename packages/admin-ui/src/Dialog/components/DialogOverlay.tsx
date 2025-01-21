import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "~/utils";

export const DialogOverlay = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
        ref={ref}
        className={cn(
            "wby-fixed wby-inset-0 wby-z-50 wby-bg-neutral-dark/50 wby-data-[state=open]:animate-in wby-data-[state=closed]:animate-out wby-data-[state=closed]:fade-out-0 wby-data-[state=open]:fade-in-0",
            className
        )}
        {...props}
    />
));

DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
