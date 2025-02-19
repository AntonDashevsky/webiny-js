import React, { useMemo } from "react";
import { SidebarMenuSubButton } from "./SidebarMenuSubButton";

interface SidebarMenuSubItemProps extends Omit<React.ComponentProps<"li">, "content"> {
    content: React.ReactNode;
    icon?: React.ReactNode;
}

const SidebarMenuSubItem = ({ content, icon, children, ...props }: SidebarMenuSubItemProps) => {
    const sidebarMenuSubButton = useMemo(() => {
        return <SidebarMenuSubButton icon={icon}>{content}</SidebarMenuSubButton>;
    }, [children, icon, content]);

    return (
        <li {...props} data-sidebar="menu-sub-item" className={"wby-px-xs-plus"}>
            {sidebarMenuSubButton}
        </li>
    );
};
export { SidebarMenuSubItem };
