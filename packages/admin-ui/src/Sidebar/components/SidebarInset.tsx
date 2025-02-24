import React from "react";
import { cn } from "~/utils";

const SidebarInset = ({ className, ...props }: React.ComponentProps<"main">) => {
    return (
        <main
            className={cn(
                "wby-relative wby-flex wby-min-h-svh wby-flex-1 wby-flex-col wby-bg-background",
                "peer-data-[variant=inset]:wby-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:wby-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:wby-ml-2 md:peer-data-[variant=inset]:wby-ml-0 md:peer-data-[variant=inset]:wby-rounded-xl md:peer-data-[variant=inset]:wby-shadow",
                className
            )}
            {...props}
        />
    );
};

export { SidebarInset };
