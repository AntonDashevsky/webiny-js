import React from "react";
import { cn, withStaticProps } from "~/utils";
import { SidebarMenuButton } from "./SidebarMenuButton";
import { SidebarMenuItemIcon } from "./SidebarMenuItemIcon";
import { Collapsible } from "~/Collapsible";

interface SidebarMenuItemProps extends React.ComponentProps<"li"> {
    icon?: React.ReactNode;
}

const SidebarMenuItemBase = ({ className, icon, ...props }: SidebarMenuItemProps) => {
    return (
        <Collapsible defaultOpen className="wby-group/collapsible">
            <li
                data-sidebar="menu-item"
                className={cn("wby-group/menu-item wby-relative wby-px-sm", className)}
                {...props}
            >
                <SidebarMenuButton icon={icon}>{props.content}</SidebarMenuButton>
            </li>
        </Collapsible>
    );
};

const SidebarMenuItem = withStaticProps(SidebarMenuItemBase, {
    Icon: SidebarMenuItemIcon
});

export { SidebarMenuItem, type SidebarMenuItemProps };
