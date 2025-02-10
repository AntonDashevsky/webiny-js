import React from "react";
import { Input } from "~/Input";
import { cn } from "~/utils";

const SidebarInput = ({ className, ...props }: React.ComponentProps<typeof Input>) => {
    return (
        <Input
            data-sidebar="input"
            className={cn(
                "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
                className
            )}
            {...props}
        />
    );
};

export { SidebarInput };
