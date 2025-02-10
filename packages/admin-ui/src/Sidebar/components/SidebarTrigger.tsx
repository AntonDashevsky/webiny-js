import React from "react";
import { Button } from "~/Button";
import { cn } from "~/utils";
import { useSidebar } from "./SidebarProvider";
import { ReactComponent as PanelLeft } from "@material-design-icons/svg/outlined/support.svg";

const SidebarTrigger = React.forwardRef<
    React.ElementRef<typeof Button>,
    React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();

    return (
        <Button
            ref={ref}
            data-sidebar="trigger"
            variant="ghost"
            size="md"
            className={cn("h-7 w-7", className)}
            onClick={event => {
                onClick?.(event);
                toggleSidebar();
            }}
            {...props}
            text={
                <>
                    <PanelLeft />
                    <span className="sr-only">Toggle Sidebar</span>
                </>
            }
        ></Button>
    );
});
SidebarTrigger.displayName = "SidebarTrigger";

export { SidebarTrigger };
