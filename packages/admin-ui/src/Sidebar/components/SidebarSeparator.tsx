import React from "react";
import { Separator } from "~/Separator";
import { cn } from "~/utils";

const SidebarSeparator = ({ className, ...props }: React.ComponentProps<typeof Separator>) => {
    return (
        <Separator
            data-sidebar="separator"
            className={cn("mx-2 w-auto bg-sidebar-border", className)}
            {...props}
        />
    );
};

export { SidebarSeparator };
