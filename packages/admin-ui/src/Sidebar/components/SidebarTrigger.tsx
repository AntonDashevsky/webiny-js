import React from "react";
import { IconButton } from "~/Button";
import { useSidebar } from "./SidebarProvider";
import { ReactComponent as PanelLeft } from "@material-design-icons/svg/outlined/view_sidebar.svg";
import {Icon} from "~/Icon";

const SidebarTrigger = React.forwardRef<
    React.ElementRef<typeof IconButton>,
    React.ComponentProps<typeof IconButton>
>(({ className, onClick, ...props }) => {
    const { toggleSidebar } = useSidebar();

    return (
        <Icon
            icon={<PanelLeft />}
            data-sidebar="trigger"
            color="neutral-strong"
            label={"Toggle Sidebar"}
            size="md"
            onClick={toggleSidebar}
            // onClick={event => {
            //     onClick?.(event);
            //     console.log("woot?");
            //     toggleSidebar();
            // }}
            // {...props}
        ></Icon>
    );
});
SidebarTrigger.displayName = "SidebarTrigger";

export { SidebarTrigger };
