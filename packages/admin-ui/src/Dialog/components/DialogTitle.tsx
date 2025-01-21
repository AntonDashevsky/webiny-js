import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "~/utils";

export type DialogTitleProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>;

export const DialogTitle = ({ className, ...props }: DialogTitleProps) => (
    <DialogPrimitive.Title
        {...props}
        className={cn("wby-text-h4 wby-flex wby-gap-sm", className)}
    />
);
