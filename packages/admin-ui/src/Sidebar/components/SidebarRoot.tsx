import * as React from "react";
import { cn } from "~/utils";
import { useSidebar } from "./SidebarProvider";

const SidebarRoot = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div"> & {
        side?: "left" | "right";
        variant?: "sidebar" | "floating" | "inset";
        collapsible?: "offcanvas" | "icon" | "none";
    }
>(
    (
        {
            side = "left",
            variant = "sidebar",
            collapsible = "offcanvas",
            className,
            children,
            ...props
        },
        ref
    ) => {
        const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

        if (collapsible === "none") {
            return (
                <div
                    className={cn(
                        "wby-flex wby-h-full wby-w-[--sidebar-width] wby-flex-col wby-bg-sidebar wby-text-sidebar-foreground",
                        className
                    )}
                    ref={ref}
                    {...props}
                >
                    {children}
                </div>
            );
        }

        return (
            <div
                ref={ref}
                className="wby-group wby-peer wby-hidden md:wby-block wby-text-sidebar-foreground"
                data-state={state}
                data-collapsible={state === "collapsed" ? collapsible : ""}
                data-variant={variant}
                data-side={side}
            >
                <div
                    className={cn(
                        "wby-duration-200 wby-relative wby-h-svh wby-w-[--sidebar-width] wby-bg-transparent wby-transition-[width] wby-ease-linear",
                        "group-data-[collapsible=offcanvas]:wby-w-0",
                        "group-data-[side=right]:wby-rotate-180",
                        variant === "floating" || variant === "inset"
                            ? "group-data-[collapsible=icon]:wby-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
                            : "group-data-[collapsible=icon]:wby-w-[--sidebar-width-icon]"
                    )}
                />
                <div
                    className={cn(
                        "wby-duration-200 wby-fixed wby-inset-y-0 wby-z-10 wby-hidden wby-h-svh wby-w-[--sidebar-width] wby-transition-[left,right,width] wby-ease-linear md:wby-flex",
                        side === "left"
                            ? "wby-left-0 group-data-[collapsible=offcanvas]:wby-left-[calc(var(--sidebar-width)*-1)]"
                            : "wby-right-0 group-data-[collapsible=offcanvas]:wby-right-[calc(var(--sidebar-width)*-1)]",
                        variant === "floating" || variant === "inset"
                            ? "wby-p-2 group-data-[collapsible=icon]:wby-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"
                            : "group-data-[collapsible=icon]:wby-w-[--sidebar-width-icon] group-data-[side=left]:wby-border-r group-data-[side=right]:wby-border-l",
                        className
                    )}
                    {...props}
                >
                    <div
                        data-sidebar="sidebar"
                        className="wby-flex wby-h-full wby-w-full wby-flex-col wby-bg-sidebar group-data-[variant=floating]:wby-rounded-lg group-data-[variant=floating]:wby-border group-data-[variant=floating]:wby-border-sidebar-border group-data-[variant=floating]:wby-shadow"
                    >
                        {children}
                    </div>
                </div>
            </div>
        );
    }
);

export { SidebarRoot };