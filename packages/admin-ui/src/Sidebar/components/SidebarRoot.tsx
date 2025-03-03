import * as React from "react";
import { cn } from "~/utils";
import { useSidebar } from "./SidebarProvider";

const SidebarRoot = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div"> & {
        side?: "left" | "right";
    }
>(({ side = "left", className, children, ...props }, ref) => {
    const { state } = useSidebar();

    return (
        <div
            ref={ref}
            className="wby-group wby-peer wby-hidden md:wby-block wby-border-r-sm wby-border-neutral-dimmed"
            data-state={state}
            data-side={side}
        >
            <div
                className={cn(
                    "wby-duration-200 wby-relative wby-h-svh wby-w-[--sidebar-width] wby-bg-transparent wby-transition-[width] wby-ease-linear",
                    "group-data-[side=right]:wby-rotate-180",
                    "group-data-[state=collapsed]:wby-w-[--sidebar-width-icon]"
                )}
            />
            <div
                className={cn(
                    "wby-duration-200 wby-fixed wby-inset-y-0 wby-z-10 wby-hidden wby-h-svh wby-w-[--sidebar-width] wby-transition-[left,right,width] wby-ease-linear md:wby-flex",
                    side === "left" ? "wby-left-0" : "wby-right-0",
                    "group-data-[state=collapsed]:wby-w-[--sidebar-width-icon] group-data-[side=left]:wby-border-r-px group-data-[side=right]:wby-border-l-px",
                    className
                )}
                {...props}
            >
                <div
                    data-sidebar="sidebar"
                    className="wby-flex wby-h-full wby-w-full wby-py-xs wby-flex-col wby-bg-sidebar group-data-[variant=floating]:wby-rounded-lg group-data-[variant=floating]:wby-border group-data-[variant=floating]:wby-border-sidebar-border group-data-[variant=floating]:wby-shadow"
                >
                    {children}
                </div>
            </div>
        </div>
    );
});

SidebarRoot.displayName = "SidebarRoot";

export { SidebarRoot };
